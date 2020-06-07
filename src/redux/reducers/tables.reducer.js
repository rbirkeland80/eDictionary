import ActionTypes from '../actions';
import { CHECK, LEARN } from '../../constants/listTypes.constants';

const {
  CLEAR_TABLE_FILTER_SETTINGS,
  SET_TABLE_FILTER_SETTINGS,
  SET_TABLE_PAGER_SETTINGS
} = ActionTypes;
const rowsPerPageOptions = [5, 10, 15];
const defaultFilterSettings = {
  includeToVerify: true,
  maxCount: null,
  type: null
};
const defaultPagerSettings = {
  page: 0,
  rowsPerPage: rowsPerPageOptions[0],
  rowsPerPageOptions
};

const initialState = {
  [`${CHECK}_filterIsApplied`]: false,
  [`${CHECK}_filterSettings`]: defaultFilterSettings,
  [`${CHECK}_pagerSettings`]: defaultPagerSettings,
  [`${LEARN}_pagerSettings`]: defaultPagerSettings
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_TABLE_FILTER_SETTINGS: {
      const { listType } = action.payload;

      return {
        ...state,
        [`${listType}_filterIsApplied`]: false,
        [`${listType}_filterSettings`]: defaultFilterSettings
      };
    }

    case SET_TABLE_FILTER_SETTINGS: {
      const { listType, data } = action.payload;

      return {
        ...state,
        [`${listType}_filterIsApplied`]: true,
        [`${listType}_filterSettings`]: data
      };
    }

    case SET_TABLE_PAGER_SETTINGS: {
      const { listType, data } = action.payload;

      return {
        ...state,
        [`${listType}_pagerSettings`]: data
      };
    }

    default:
      return state;
  }
};
