import React from 'react';
import Demo from './demo'

export default {
  title: 'Welcome',
  component: Demo,
};

export const ToStorybook = () => <Demo />;

ToStorybook.story = {
  name: 'Default',
};
