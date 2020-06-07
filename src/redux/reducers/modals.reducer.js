import ActionTypes from '../actions';
import {
  ADD_WORD_VALIDATION_ERROR,
  CONFIRM_VALIDATE_QUIZ
} from '../../constants/modals.constants';

const { SET_MODAL_DATA, SET_MODAL_STATE } = ActionTypes;

const initialState = {
  [ADD_WORD_VALIDATION_ERROR]: false,
  [CONFIRM_VALIDATE_QUIZ]: false,
  modalData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_DATA:
      return {
        ...state,
        modalData: action.payload
      };

    case SET_MODAL_STATE:
      return {
        ...state,
        [action.payload.type]: action.payload.value
      };

    default:
      return state;
  }
};
