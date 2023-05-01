import type {Meta, StoryObj} from '@storybook/react';
import {Task, TaskProps} from "../features/todolistsList/todolist/task/Task";
import {action} from '@storybook/addon-actions'
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import React, {FC} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'Example/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    /*tags: ['autodocs'],
    args: {},*/
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as Meta<typeof Task>;

//const Template: ComponentStory<typeof Task> = () => Task
   // export const TaskWithExzample = Template.bind({})
export default meta
type Story = StoryObj<typeof Task>;

const checkboxOnchangeCallback = action("status changed inside Task")
const onChangeTitleCallback = action("title changed inside Task")
const removeOnClickCallback = action("remove button inside Task was clicked")

const baseArgs = {
    changeTaskStatus: checkboxOnchangeCallback,
    changeTaskTitle: onChangeTitleCallback,
    removeTask: removeOnClickCallback
}
/*export const TaskExzample = (): FC<TaskProps> => {
return <>

    </>
}*/
/*
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
