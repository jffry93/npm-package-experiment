import React, { useState, useRef, useEffect, type RefObject } from 'react';
import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';
import { StyleProvider } from '../../providers/emotion';
import type { MultiValue, StylesConfig } from 'react-select';

// Custom styles for react-select
const customStyles: StylesConfig<Option, true> = {
  singleValue: (provided) => ({
    ...provided,
    color: '#333', // Darker text color for selected value
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333', // Darker text color for multi-select labels
  }),
  option: (provided, state) => {
		return {
    ...provided,
    backgroundColor: state.isSelected
      ? 'rgb(56, 88, 233)' // Background color when selected
      : state.isFocused
        ? 'rgb(56, 88, 233)' // Slightly transparent when focused
        : 'white', // Default background
    color: state.isFocused || state.isSelected ? 'white' : 'black', // White text when selected
    ':active': {
      backgroundColor: 'rgb(56, 88, 233)', // Keep selected color when active
      color: 'white',
    },
  }},
};

// Define the types for your posts and options
interface Post {
  id: number;
  title: {
    rendered: string;
  };
}

interface Option {
  label: string;
  value: Post;
}
// Define the possible types in an array
const typesArray = ['posts', 'pages'];

// Define a type for the key-value pair object
// type KeyValueObject = Record<string, MultiValue<Option> | Option[] | null>;
type KeyValueObject = Record<
  string,
  MultiValue<Option> | Option[] | (MultiValue<Option> | Option[])[] | null
>;

// Define the types for the component's arguments
export interface UsePostsSelectorArgsTypes {
  /**
   * Is this the principal call to action on the page?
   */
  type?: 'posts' | 'pages';
  /**
   * How many posts to render as options.
   */
  perPage?: number;
  /**
   * Provide a boolean to disable the select component.
   */
  isDisabled?: boolean;
  /**
   * Can the user select multiple options?
   */
  isMulti?: boolean;
  /**
   * Are the options searchable?
   */
  isSearchable?: boolean;
  /**
   * Placeholder text for the select component.
   */
  placeholder?: string;
  /**
   * Configuration for the block's attributes.
   *
   * This is used to store the selected option in the block's attributes.
   * The key is the attribute key, attributes is the block's attributes object,
   * and callback accepts the setAttributes function to store the block's attributes.
   *
   * Important to define the key and type as an array in the block.json file.
   *
   * This is optional.
   * */
  attributeConfig?: {
    key: string;
    attributes: {
      [key: string]: any;
    };
    callback: (data: KeyValueObject) => void;
  };
  /**
   * Custom styles for the react-select component.
   * This is optional.
   * https://react-select.com/styles#examples
   * */
  customStyles?: StylesConfig<Option, true>; // Define the type of customStyles if available
}

type UsePostsSelectorReturn = {
  selectedOption: MultiValue<Option> | Option[] | null;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<MultiValue<Option> | Option[] | null>
  >;
  currentOptions: Option[];
  ReactSelectUI: () => JSX.Element;
  isMounted: boolean;
};

export default function usePostsSelector(
  args: UsePostsSelectorArgsTypes
): UsePostsSelectorReturn {
  const type =
    args?.type && typesArray.includes(args?.type) ? args?.type : 'posts';
  const perPage = args?.perPage ? args?.perPage : 20;

  const [selectedOption, setSelectedOption] = useState<
    MultiValue<Option> | Option[] | null
  >(null);
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const [documentReady, setDocumentReady] = useState<Document | null>(null);
  const currentOptionsRef = useRef<Option[]>([]);

  // handle state on component mount
  useEffect(() => {
    if (ref.current) {
      // component is mounted
      setDocumentReady(ref.current.ownerDocument);
      // if attribute exists in block display the selected option
      if (
        args?.attributeConfig &&
        args?.attributeConfig.key &&
        args?.attributeConfig.attributes
      ) {
        // check to see if the key is defined in the attributes
        if (args?.attributeConfig.attributes[args?.attributeConfig.key]) {
          const storedValue =
            args?.attributeConfig.attributes[args?.attributeConfig.key];

          const value = storedValue?.length > 0 ? storedValue : null;
          // set the selected option to the value in the attributes
          setSelectedOption(value);
        }
      }
    }
  }, [ref]);

  // executes whenever the selected value in the dropdown changes
  useEffect(() => {
    // update blocks attribute storing the selected option
    if (args?.attributeConfig) {
      // check to see if the key and callback are defined
      if (args.attributeConfig.key && args.attributeConfig.callback) {
        if (!selectedOption) {
          args.attributeConfig.callback({
            [args.attributeConfig.key]: [],
          });
          return;
        }
        const selectedOptionAttribute = args?.isMulti
          ? selectedOption
          : [selectedOption];
        args.attributeConfig.callback({
          [args.attributeConfig.key]: selectedOptionAttribute,
        });
      }
    }
  }, [selectedOption]);

  // Function to asynchronously load options based on input value
  const loadOptions = (
    inputValue: string,
    callback: (options: Option[]) => void
  ) => {
    const url = `/wp-json/wp/v2/${type}?search=${encodeURIComponent(
      inputValue
    )}&per_page=${perPage}`;
    fetch(url)
      .then((response) => response.json())
      .then((posts: Post[]) => {
        const currentPostOptions = posts.map((post) => ({
          label: post.title.rendered, // Modify based on your actual API response
          value: post,
        }));
        currentOptionsRef.current = currentPostOptions;
        return currentPostOptions;
      })
      .then((options) => callback(options))
      .catch(() => callback([]));
  };

  const debouncedLoadOptions = debounce(loadOptions, 500);

  const ReactSelectUI = () => (
    <div ref={ref} style={{ minWidth: '200px' }}>
      {documentReady && (
        <StyleProvider document={documentReady}>
          <AsyncSelect
            isMulti={args?.isMulti ? true : undefined}
            isSearchable={args?.isSearchable ?? true}
            isDisabled={args?.isDisabled}
            placeholder={
              args?.placeholder
                ? args?.placeholder
                : args?.isMulti
                  ? 'Select posts...'
                  : 'Select post...'
            }
            openMenuOnFocus={true}
            defaultOptions
            loadOptions={debouncedLoadOptions}
            onChange={(newValue: MultiValue<Option>) => {
              setSelectedOption(newValue);
            }}
            value={selectedOption}
            styles={customStyles}
            isClearable={true}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: 'rgb(56, 88, 233)',
                primary: 'rgb(56, 88, 233)',
              },
            })}
          />
        </StyleProvider>
      )}
    </div>
  );

  return {
    selectedOption,
    setSelectedOption,
    currentOptions: currentOptionsRef.current,
    ReactSelectUI,
    isMounted: documentReady !== null,
  };
}
