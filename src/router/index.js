import Es6Router from './es6';
import CssRouter from './css';
import FrameworkRouter from './framework';
import OthersRouter from './others';
import ReactRouter from './react';
import CherComponentsRouter from './cherComponents';
import WebpackRouter from './webpack';
import MoviesRouter from './movies';
import ReadRouter from './read';
import GamesRouter from './games';

export const RouterConfig = {
  ...Es6Router,
  ...CssRouter,
  ...ReactRouter,
  ...WebpackRouter,
  ...OthersRouter,
  ...CherComponentsRouter,
  ...FrameworkRouter,
  ...MoviesRouter,
  ...ReadRouter,
  ...GamesRouter,
};
