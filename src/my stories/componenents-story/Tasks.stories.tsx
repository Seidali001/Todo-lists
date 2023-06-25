import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../../features/todolistsList/todolist/task/Task";
import {Checkbox} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TaskStatuses, TasksType} from "../../api/todolist-api";
import {tasksApi} from "../../api/tasks-api";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Checkbox> = {
    title: 'Example/Task',
    component: Checkbox,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
    tags: ['autodocs']
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const StatusChecked: Story = {
    render: () =>
        <div>
            <Checkbox
                color="secondary"
                onChange={() => {
                }}
                checked={true}
            />
        </div>
};

export const StatusNotChecked: Story = {
    render: () =>
        <div>
            <Checkbox
                color="secondary"
                onChange={() => {
                }}
                checked={false}
            />
        </div>
};

export const CheckBoxUnControled: Story = {
    render: () =>
        <div>
            <Checkbox
            />
        </div>
};

/*type CheckStatusProps = {
    TaskStatuses: {
        New: 0,
        InProgress: 1,
        Completed: 2,
        Draft: 3
    }
}
export const CheckStatus = (props: CheckStatusProps) => {
    const [state, setState] = useState<any>(null)
    console.log(state)
    return <div>
        <Checkbox
            value={props.TaskStatuses}
            color="secondary"
            checked={!!props.TaskStatuses.Completed}

        />
    </div>
}*/
