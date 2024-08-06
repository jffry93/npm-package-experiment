# TermSelect Component

A term select component that allows you to display posts based on a selected term.


## Usage

```js

import { TermSelect } from '@trewknowledge/wordpress-components';

const Edit = () => {

	return (
		<div { ...useBlockProps() }>
			<TermSelect />
		</div>
	);

}

export default Edit;

```


## Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `multiSelect` | `boolean` | `false` | Determines if selecting multiple terms is allowed. |
| `onPickChange` | `function` | `() => { console.log( 'TermSelect change' ) }` | Function that is passed to the React Select `onChange` prop. |
| `perPage` | `number` | `20` | Determines how many terms are initially available in the select dropdown. |
| `taxonomy` | `string` | `category` | Determines what taxonomy will be queried. |
| `value` | `array` | `[]` | Array that is passed to the React Select `value` prop. |


## Dependencies

The `TermSelect` component requires React Select to be installed in the blocks plugin. Navigate to the root folder of your plugin and run `npm i --save react-select` in your terminal.

To determine if React Select has been installed, open the plugin's `node_modules` folder, scroll down to the Rs, and look for the `react-select` folder. If React Select has already been installed in the plugin, the above step is not required.


## Notes

If the `multiSelect` prop is set to `false` (default value) and you are setting an attribute with the ID of a term, you must pass the ID as an array. This is because the `value` prop is expecting data in array format.

```js

const Edit = ( props ) => {

	const { attributes, setAttributes } = props;
	const { selectedTermIds } = attributes;

	return (
		<div {...useBlockProps()}>
			<TermSelect
				onPickChange={ ( ids ) => setAttributes( { selectedTermIds: [ ids ] } ) }
				value={ selectedTermIds }
			/>
		</div>
	);

};

```

If the `multiSelect` prop is set to `true` and you are setting an attribute with the IDs of multiple terms, passing the IDs as an array is not required. React Select automatically creates an array if multiple items are selected.

```js

const Edit = ( props ) => {

	const { attributes, setAttributes } = props;
	const { selectedTermIds } = attributes;

	return (
		<div {...useBlockProps()}>
			<TermSelect
				multiSelect={ true }
				onPickChange={ ( ids ) => setAttributes( { selectedTermIds: ids } ) }
				value={ selectedTermIds }
			/>
		</div>
	);

};

```
