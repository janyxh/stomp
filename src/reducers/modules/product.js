const initialState = {
  loaded: false,
};

export function GetProduct(state = initialState, action) {
  switch (action.type) {
    case 'GetProductLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetProductSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetProductFail':
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

export function GetAllProduct(state = initialState, action) {
  switch (action.type) {
    case 'GetAllProductLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetAllProductSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetAllProductFail':
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
