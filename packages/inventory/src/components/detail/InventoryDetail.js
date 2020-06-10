import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, SkeletonSize } from '@redhat-cloud-services/frontend-components/components/esm/Skeleton';
import PropTypes from 'prop-types';
import { loadEntity, deleteEntity } from '../../redux/actions';
import './InventoryDetail.scss';
import SystemNotFound from './SystemNotFound';
import TopBar from './TopBar';
import FactsInfo from './FactsInfo';
import { TagsModal, TagWithDialog, reloadWrapper } from '../../shared';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications';
import ApplicationDetails from './ApplicationDetails';
import './InventoryDetail.scss';

const InventoryDetail = ({
    actions,
    showTags,
    hideInvLink,
    onTabSelect,
    onBackToListClick,
    showDelete
}) => {
    const dispatch = useDispatch();
    const loaded = useSelector(({ entityDetails: { loaded } }) => loaded);
    const entity = useSelector(({ entityDetails: { entity } }) => entity);
    useEffect(() => {
        const inventoryId = location.pathname.split('/')[location.pathname.split('/').length - 1];
        if (!entity || entity.id !== inventoryId || !loaded) {
            dispatch(loadEntity(inventoryId, { hasItems: true }, { showTags }));
        }
    }, []);
    return <div className="ins-entity-detail">
        { loaded && !entity ? (
            <SystemNotFound
                onBackToListClick={onBackToListClick}
                inventoryId={location.pathname.split('/')[location.pathname.split('/').length - 1]}
            />
        ) : <Fragment>
            <TopBar
                entity={ entity }
                loaded={ loaded }
                onBackToListClick={ onBackToListClick }
                actions={ actions }
                deleteEntity={ (systems, displayName, callback) => {
                    const action = deleteEntity(systems, displayName);
                    dispatch(reloadWrapper(action, callback));
                } }
                addNotification={ (payload) => dispatch(addNotification(payload))}
                hideInvLink={ hideInvLink }
                showDelete={ showDelete }
            />
            <FactsInfo loaded={ loaded } entity={ entity } />
            {
                showTags && (loaded ?
                    <TagWithDialog count={ entity && entity.tags && entity.tags.length } systemId={ entity && entity.id } /> :
                    <Skeleton size={ SkeletonSize.sm }>&nbsp;</Skeleton>)
            }
            {showTags &&  <TagsModal />}
        </Fragment>}
        <ApplicationDetails onTabSelect={ onTabSelect } />
    </div>;
};

InventoryDetail.propTypes = {
    hideInvLink: PropTypes.bool,
    hideBack: PropTypes.bool,
    showTags: PropTypes.bool,
    showDelete: PropTypes.bool,
    actions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.node,
        onClick: PropTypes.func,
        key: PropTypes.string
    })),
    onTabSelect: PropTypes.func,
    onBackToListClick: PropTypes.func
};
InventoryDetail.defaultProps = {
    actions: [],
    hideInvLink: false,
    showTags: false,
    onTabSelect: () => undefined,
    onBackToListClick: () => undefined
};

export default InventoryDetail;
