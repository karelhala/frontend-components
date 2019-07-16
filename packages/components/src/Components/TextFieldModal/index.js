import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, TextInput } from '@patternfly/react-core';

export default class TextInputModal extends Component {
    state = {};

    static getDerivedStateFromProps(props, state) {
        if (!props.isOpen) {
            return { value: undefined };
        }

        if (state.value !== undefined) {
            return;
        }

        return {
            value: props.value || ''
        };
    };

    render() {
        const {
            title,
            isOpen,
            onCancel,
            onSubmit,
            ariaLabel,
            children,
            saveTitle,
            cancelTitle,
            ...props
        } = this.props;
        const { value } = this.state;

        return (
            <Modal
                isSmall
                title={title}
                className={className}
                isOpen={isOpen}
                onClose={event => onCancel(event)}
                actions={[
                    <Button key="cancel" variant="secondary" onClick={onCancel}>
                        {cancelTitle}
                    </Button>,
                    <Button key="confirm" variant="primary" onClick={(e) => onSubmit(this.state.value, e)}>
                        {saveTitle}
                    </Button>
                ]}
                {...props}
            >
                <TextInput
                    value={value}
                    type="text"
                    onChange={value => this.setState({ value })}
                    aria-label={ariaLabel || 'input text'}
                />
                {children}
            </Modal>
        );
    }
}

TextInputModal.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    saveTitle: PropTypes.string,
    cancelTitle: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    ariaLabel: PropTypes.string
};

TextInputModal.defaultProps = {
    saveTitle: 'Save',
    cancelTitle: 'Cancel',
    onCancel: () => undefined,
    onSubmit: () => undefined
}

