import ActionTypes from '../actions';

const {
  FETCH_WORDS_SUCCESS
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

    default:
      return state;
  }
};
