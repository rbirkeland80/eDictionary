import ActionTypes from '../actions';
import { CHECK, LEARN } from '../../constants/listTypes.constants';

const {
  CLEAR_TABLE_FILTER_SETTINGS,
  SET_TABLE_FILTER_SETTINGS,
  SET_TABLE_HIDDEN_COLUMNS,
  SET_TABLE_PAGER_SETTINGS,
  SET_TABLE_SORT_SETTINGS
} = ActionTypes;
const rowsPerPageOptions = [25, 50, 75];
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
const defaultSortSettings = {
  sortProp: null,
  sortDirection: 'asc'
};

const initialState = {
  [`${CHECK}_filterIsApplied`]: false,
  [`${CHECK}_filterSettings`]: defaultFilterSettings,
  [`${CHECK}_hiddenColumns`]: [],
  [`${CHECK}_pagerSettings`]: defaultPagerSettings,
  [`${CHECK}_sortSettings`]: defaultSortSettings,
  [`${LEARN}_hiddenColumns`]: [],
  [`${LEARN}_pagerSettings`]: defaultPagerSettings,
  [`${LEARN}_sortSettings`]: defaultSortSettings
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

    case SET_TABLE_HIDDEN_COLUMNS: {
      const { listType, data } = action.payload;

      return {
        ...state,
        [`${listType}_hiddenColumns`]: data
      };
    }

    case SET_TABLE_PAGER_SETTINGS: {
      const { listType, data } = action.payload;

      return {
        ...state,
        [`${listType}_pagerSettings`]: data
      };
    }

    case SET_TABLE_SORT_SETTINGS: {
      const { listType, sortProp } = action.payload;
      const sort = state[`${listType}_sortSettings`];
      const sortDirection = sortProp !== sort.sortProp || sort.sortDirection === 'desc'
        ? 'asc'
        : 'desc';

      return {
        ...state,
        [`${listType}_sortSettings`]: { sortProp, sortDirection }
      };
    }

    default:
      return state;
  }
};
