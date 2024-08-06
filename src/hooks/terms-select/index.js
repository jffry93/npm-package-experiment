/**
 * External dependencies
 */
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import PropTypes from 'prop-types';
import { uniqBy } from 'lodash';
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * TermsSelect component that can be used to render posts by term.
 *
 * @param {object} props All properties passed to the component.
 * @param {boolean} props.multiSelect Should multiple terms be allowed to be selected?
 * @param {function} props.onPickChange Callback when React Select changes.
 * @param {number} props.perPage How many terms should initially appear in React Select?
 * @param {string} props.taxonomy What taxonomy should be queried?
 * @param {array} props.value What values should be passed to React Select?
 *
 * @returns {*} The rendered component.
 */

const TermsSelect = ( { multiSelect, onPickChange, perPage, taxonomy, value } ) => {

	// State constants.
	const [ termOptions, setTermOptions ] = useState( [] );
	const [ inputValue, setInputValue ] = useState( '' );

	// Get term objects.
	const terms = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', taxonomy, { per_page: perPage } );
	} );

	// Loop through the returned terms and set the
	// termOptions state with the required info.
	useEffect( () => {
		const termsArray = [];
		terms?.map( ( term ) => {
			termsArray.push( {
				value: term?.id,
				label: term?.name
			} );
			setTermOptions( termsArray );
		} );
	}, [ terms ] );

	// Lodash debounce sets inputValue state with 500ms delay.
	// Function runs if input greater than 3 characters.
	const selectInputChange = ( input ) => {
		const inputDebounce = debounce( function() {
			setInputValue( input );
		}, 500 );
		if ( input.length >= 3 ) {
			inputDebounce();
		}
	}

	// Get terms that have been searched for.
	const searchTerms = useSelect( ( select ) => {
		if ( inputValue !== '' ) {
			return select( 'core' ).getEntityRecords( 'taxonomy', taxonomy, { search: inputValue } );
		}
	}, [ inputValue ] );

	// Compare existing terms array to new terms array
	// (with terms that have been searched for) and combines them.
	// Excludes duplicate posts.
	useEffect( () => {
		if ( searchTerms ) {
			const newTermsArr = []
			searchTerms?.map( ( term )  => {
				newTermsArr.push( {
					value: term?.id,
					label: term?.name,
				} );
			} );
			setTermOptions( uniqBy( [ ...termOptions, ...newTermsArr ], 'value' ) );
		}
	}, [ searchTerms ] );

	return (

		<Select
			isMulti={ multiSelect }
			options={ termOptions }
			value={ value }
			onChange={ onPickChange }
			onInputChange={ selectInputChange }
			components={ makeAnimated() }
		/>

	);

}

/**
 * Default props values.
 */
TermsSelect.defaultProps = {
	multiSelect: false,
	onPickChange: () => {
		console.log( 'TermsSelect change.' ); // eslint-disable-line no-console
	},
	perPage: 20,
	taxonomy: 'category',
	value: [],
}

/**
 * PropTypes validators.
 */
TermsSelect.PropTypes = {
	multiSelect: PropTypes.bool,
	onPickChange: PropTypes.func,
	perPage: PropTypes.number,
	taxonomy: PropTypes.string,
	value: PropTypes.array,
}

export { TermsSelect };
