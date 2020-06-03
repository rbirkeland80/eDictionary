import ActionTypes from '../actions';
import { CHECK, LEARN } from '../../constants/listTypes.constants';

const { SET_TABLE_PAGER_SETTINGS } = ActionTypes;
const rowsPerPageOptions = [5, 10, 15];
const defaultPagerSettings = {
  page: 0,
  rowsPerPage: rowsPerPageOptions[0],
  rowsPerPageOptions
};

const initialState = {
  [`${CHECK}_pagerSettings`]: defaultPagerSettings,
  [`${LEARN}_pagerSettings`]: defaultPagerSettings
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_PAGER_SETTINGS:
      const { listType, data } = action.payload;

      return {
        ...state,
        [`${listType}_pagerSettings`]: data
      };

    default:
      return state;
  }
};
