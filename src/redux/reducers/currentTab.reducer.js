import ActionTypes from '../actions';

const {
  SET_TAB_VALUE
} = ActionTypes;

const initialState = {
  tabValue: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TAB_VALUE:
      return {
        ...state,
        tabValue: action.payload
      };

    default:
      return state;
  }
};
