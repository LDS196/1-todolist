import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import AppWithRedux from "../AppWithRedux";
import ReduxStoreProviderDecorator from "../state/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
  decorators:[ReduxStoreProviderDecorator]
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) =><AppWithRedux/> ;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

