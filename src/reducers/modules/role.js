const initialState = {
  loaded: false,
};

export function GetRole(state = initialState, action) {
  switch (action.type) {
    case 'GetRoleLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetRoleSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetRoleFail':
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

export function GetAllRole(state = initialState, action) {
  switch (action.type) {
    case 'GetAllRoleLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetAllRoleSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetAllRoleFail':
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
