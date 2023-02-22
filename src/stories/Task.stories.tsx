import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import {action} from "@storybook/addon-actions";

import Task from "../Task";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    task: {id:'aa',title:'JS', isDone:false},
    removeTask: action('Remove task'),
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle')
  },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

TaskIsDoneStory.args={
  task: {id:'aa',title:'JS', isDone:true},
}