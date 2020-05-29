import ActionTypes from '../actions';

const {
  FETCH_WORDS_SUCCESS,
  SAVE_WORDS_SUCCESS
} = ActionTypes;

const initialState = {
  list: null,
  item: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORDS_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    case SAVE_WORDS_SUCCESS:
      const newList = action.payload.success || [];
      const oldList = state.list || [];

      return {
        ...state,
        list: {
          ...state.list,
          count: oldList.count + newList.length,
          list: [ ...newList, ...oldList.list ]
        }
      }

    default:
      return state;
  }
};
