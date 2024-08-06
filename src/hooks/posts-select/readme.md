# PostsSelect Component

A post select component that allows you to pick posts, pages, or custom post types.


## Usage

```js

import { PostsSelect } from '@trewknowledge/wordpress-components';

const Edit = () => {

	return (
		<div { ...useBlockProps() }>
			<PostsSelect />
		</div>
	);

}

export default Edit;

```


## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `multiSelect` | `boolean` | `false` | Determines if selecting multiple posts is allowed. |
| `onPickChange` | `function` | `() => { console.log( 'PostsSelect change' ) }` | Function that is passed to the React Select `onChange` prop. |
| `perPage` | `number` | `20` | Determines how many posts are initially available in the select dropdown. |
| `type` | `string` | `post` | Determines what post type will be queried. |
| `value` | `array` | `[]` | Array that is passed to the React Select `value` prop. |


## Dependencies

The `PostsSelect` component requires React Select to be installed in the blocks plugin. Navigate to the root folder of your plugin and run `npm i --save react-select` in your terminal.

To determine if React Select has been installed, open the plugin's `node_modules` folder, scroll down to the Rs, and look for the `react-select` folder. If React Select has already been installed in the plugin, the above step is not required.


## Notes
If the `multiSelect` prop is set to `false` (default value) and you are setting an attribute with the ID of a post, you must pass the ID as an array. This is because the `value` prop is expecting data in array format.

```js

const Edit = ( props ) => {

	const { attributes, setAttributes } = props;
	const { selectedPostIds } = attributes;

	return (
		<div {...useBlockProps()}>
			<PostsSelect
				onPickChange={ ( ids ) => setAttributes( { selectedPostIds: [ ids ] } ) }
				value={ selectedPostIds }
			/>
		</div>
	);

};

```

If the `multiSelect` prop is set to `true` and you are setting an attribute with the IDs of multiple posts, passing the IDs as an array is not required. React Select automatically creates an array if multiple items are selected.

```js

const Edit = ( props ) => {

	const { attributes, setAttributes } = props;
	const { selectedPostIds } = attributes;

	return (
		<div {...useBlockProps()}>
			<PostsSelect
				multiSelect={ true }
				onPickChange={ ( ids ) => setAttributes( { selectedPostIds: ids } ) }
				value={ selectedPostIds }
			/>
		</div>
	);

};

```
