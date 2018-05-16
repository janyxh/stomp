import { LOAD, LOAD_SUCCESS, LOAD_FAIL, LOAD_TEST, LOAD_TEST_SUCCESS, LOAD_TEST_FAIL, LOAD_PRODUCTNAME, LOAD_PRODUCTNAME_SUCCESS, LOAD_PRODUCTNAME_FAIL } from '../../constants/test';
const initialState = {
  loaded: false,
};

export function getTestList(state = initialState, action = {}) {
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
        data: action.result.data,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export function getTest(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_TEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case LOAD_TEST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export function getProductNameList(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PRODUCTNAME:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PRODUCTNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case LOAD_PRODUCTNAME_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}
