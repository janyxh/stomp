const initialState = {
  loaded: false,
};

export function GetDevice(state = initialState, action) {
  switch (action.type) {
    case 'GetDeviceLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetDeviceSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetDeviceFail':
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

export function GetAllDevice(state = initialState, action) {
  switch (action.type) {
    case 'GetAllDeviceLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetAllDeviceSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetAllDeviceFail':
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
