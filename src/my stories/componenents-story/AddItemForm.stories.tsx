import type { Meta} from '@storybook/react';

import { AddItemForm } from '../../components/addItemForm/AddItemForm';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'Example/Button',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};


export default meta;
/*
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

export const Secondary: Story = {
    args: {

    },
};

export const Large: Story = {
    args: {

    },
};

export const Small: Story = {
    args: {

    },
};
*/
