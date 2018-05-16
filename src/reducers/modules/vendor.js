const initialState = {
  loaded: false,
};
export function GetAllVendor(state = initialState, action) {
  switch (action.type) {
    case 'GetAllVendorLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetAllVendorSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetAllVendorFail':
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
export function GetVendor(state = initialState, action) {
  switch (action.type) {
    case 'GetVendorLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetVendorSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetVendorFail':
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
