import React from 'react';
import usePostsSelector, { type UsePostsSelectorArgsTypes } from '../hooks/posts-select';

/**
 * `DropdownSelector` is a primary UI component for user interaction in the WordPress editor.
 *
 * **Purpose:**
 * - This component serves as a user-friendly interface for selecting posts or pages.
 * - It is built on the `usePostsSelector` hook which handles the logic for fetching,
 *   displaying, and updating the selected posts/pages.
 *
 * **Features:**
 * - **Dropdown Selector:** Utilizes the React Select library to provide a dropdown list of options.
 * - **Multi-select Capabilities:** Allows multiple selections if needed.
 * - **Searchable Options:** Users can search through the options for quick filtering.
 * - **Customizable Appearance:** Supports customization of the React Select component's styles.
 * - **Attribute Binding:** Seamlessly binds the selected options to the block's attributes in WordPress.
 *
 * **Props:**
 * - `attributeConfig`: Configuration for how selected options are stored in the block’s attributes.
 *
 * **Usage:**
 * By integrating this component, users can select posts/pages from a dropdown menu,
 * which can then be stored as part of the block's attributes for further processing or display.
 *
 * **Wordpress Custom Block Example:**
 *
 *
 * 	import React from "react";
 * 	import { useBlockProps } from "@wordpress/block-editor";
 * 	import { usePostsSelector } from "tk-wp-toolkit";
 *
 * 	export default function Edit(props) {
 * 		const { attributes, setAttributes } = props;
 *
 * 		const { selectedOption, currentOptions, ReactSelectUI } = usePostsSelector({
 * 			type: "pages",
 *	 		attributeConfig: {
 * 				key: "selectedOption", // define the key in the attributes object as an array
 * 				attributes: attributes, // pass the attributes object
 * 				callback: setAttributes, // pass the setAttributes function
 * 			},
 * 		});
 *
 * 		console.log({ selectedOption, currentOptions });
 *
 *	 	return (
 * 			<div {...useBlockProps()}>
 * 				<ReactSelectUI />
 * 			</div>
 * 		);
 * 	}
 *
 *
 */
export default function DropdownSelector(props: UsePostsSelectorArgsTypes) {
	const { selectedOption, currentOptions, ReactSelectUI } = usePostsSelector(props);

	console.log({ selectedOption, currentOptions });

	return (
			<ReactSelectUI />
	);
}
