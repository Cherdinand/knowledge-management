import React from 'react';

import Es6Router from './es6';
import CssRouter from './css';
import FrameworkRouter from './framework';
import OthersRouter from './others';
import ReactRouter from './react';
import CherComponentsRouter from './cherComponents';

export const RouterConfig = {
  ...Es6Router,
  ...CssRouter,
  ...FrameworkRouter,
  ...OthersRouter,
  ...ReactRouter,
  ...CherComponentsRouter,
};
