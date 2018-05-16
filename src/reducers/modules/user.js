const initialState = {
  loaded: false,
};

export function GetUser(state = initialState, action) {
  switch (action.type) {
    case 'GetUserLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetUserSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetUserFail':
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case 'Logout':
      return {
        Logout: true,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

export function GetAllUser(state = initialState, action) {
  switch (action.type) {
    case 'GetAllUserLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetAllUserSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetAllUserFail':
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
