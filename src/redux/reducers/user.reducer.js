import ActionTypes from '../actions';
import { TOKEN_KEY, USER_KEY } from '../../constants/localStorageKeys.constants';

const {
  CLEAR_USER,
  LOGIN_SUCCESS
} = ActionTypes;

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_USER:
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      return null;

    case LOGIN_SUCCESS:
      const { user, token } = action.payload;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;

    default:
      return state;
  }
};
