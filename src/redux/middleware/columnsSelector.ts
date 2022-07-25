import { Middleware } from 'redux';
import { RootState } from 'redux/reducer';
import { LOAD_BOARD, LOAD_COLUMNS, SUCCESS } from '../constants';

const boardNormalize: Middleware<Record<string, unknown>, RootState> =
  () => (next) => async (action) => {
    /* if (action.type === LOAD_BOARD + SUCCESS) {
      const { data, ...rest } = action;
      const { columns = [] } = data;

      next({ ...rest, type: LOAD_COLUMNS, data: columns });
    } */
    next(action);
  };

export default boardNormalize;
