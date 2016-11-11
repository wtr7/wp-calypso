Async Load
==========

`<AsyncLoad />` is a React component intended for use in loading modules on-demand. Combined with the [`transform-wpcalypso-async` Babel plugin](https://github.com/Automattic/babel-plugin-transform-wpcalypso-async) and [Webpack code splitting](https://webpack.github.io/docs/code-splitting.html), it offers an easy mechanism for creating new bundles to be loaded asynchronously.

## Usage

Pass with a `require` string for the module path to be loaded:

```jsx
<AsyncLoad require="components/async-load" />
```

Depending on the environment configuration, this will be transformed automatically into either a `require` or `require.ensure` call.

See [`babel-plugin-transform-wpcalypso-async` documentation](https://github.com/Automattic/babel-plugin-transform-wpcalypso-async) for more information.

## Props

The following props can be passed to the AsyncLoad component:

### `require`

<table>
	<tr><td>Type</td><td>String (Function)</td></tr>
	<tr><td>Required</td><td>Yes</td></tr>
</table>

In general usage, this should be passed as a string of the module to be imported. Under the hood, it is transformed to a function which is called to require the specified module.

### `placeholder`

<table>
	<tr><td>Type</td><td>PropTypes.node</td></tr>
	<tr><td>Required</td><td>No</td></tr>
</table>

A placeholder to be shown while the module is being asynchronously required. If omitted, a default placeholder will be shown. If you do not want a placeholder to be shown, explicitly pass `null` as the prop value.
