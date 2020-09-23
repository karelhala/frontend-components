import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/files/RBACHook';
import { Spinner } from '@patternfly/react-core/dist/js/components/Spinner';

const RenderWrapper = ({ cmp: Component, hideLoader, inventoryRef, store, ...props }) => {
    const { hasAccess } = usePermissions('inventory', [ 'inventory:*:*', 'inventory:hosts:read' ]);
    return (
        hasAccess === undefined ?
            (hideLoader ?
                <Fragment /> :
                <Spinner />
            ) :
            <Component
                {...props}
                { ...inventoryRef && {
                    ref: inventoryRef
                }}
                hasAccess={hasAccess}
                store={ store }
            />
    );
};

RenderWrapper.propTypes = {
    cmp: PropTypes.any,
    inventoryRef: PropTypes.any,
    store: PropTypes.object,
    customRender: PropTypes.bool
};

export default RenderWrapper;
