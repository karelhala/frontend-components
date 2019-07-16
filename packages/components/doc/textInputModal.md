# Textual input modal

Helper component to show modal with single input and Cancel/Save buttons to trigger field update.

## Usage

Import TextInputModal from this package and pass required props.

```JSX
<TextInputModal
    isOpen={ isModalOpen }
    title='Edit this field'
    value={ defaultValue }
    onCancel={ this.onCancel }
    onSubmit={ this.onSubmit(newValue, event) }
    // additional props spread at end
/>
```

## PropTypes
```JS
{
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    saveTitle: PropTypes.string,
    cancelTitle: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    ariaLabel: PropTypes.string
}
```
