import { combineReducers } from 'redux';

import * as duckReducers from './redux';

export default combineReducers({
  ...duckReducers,
});
