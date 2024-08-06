import type { Meta, StoryObj } from '@storybook/react';
import DropdownSelector from './DropdownSelector';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/DropdownSelector',
  component: DropdownSelector,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

} satisfies Meta<typeof DropdownSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Single: Story = {
  args: {
    isMulti: false,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Multiple: Story = {
  args: {
		isMulti: true,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Static: Story = {
  args: {
    isSearchable: false,
  },
};


