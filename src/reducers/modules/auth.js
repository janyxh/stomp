import {
LOAD,
LOAD_SUCCESS,
LOAD_FAIL,
LOGIN,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
LOGOUT_SUCCESS,
LOGOUT_FAIL,
} from '../../constants/auth';

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currUser: action.result.data,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        currUser: action.result.data,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        currUser: null,
        loginError: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        currUser: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error,
      };
    default:
      return state;
  }
}

