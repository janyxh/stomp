const initialState = {
  loaded: false,
};

export function GetFirmware(state = initialState, action) {
  switch (action.type) {
    case 'GetFirmwareLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetFirmwareSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetFirmwareFail':
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

export function GetAllFirmware(state = initialState, action) {
  switch (action.type) {
    case 'GetAllFirmwareLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetAllFirmwareSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetAllFirmwareFail':
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

export function GetProductFirmware(state = initialState, action) {
  switch (action.type) {
    case 'GetProductFirmwareLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetProductFirmwareSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetProductFirmwareFail':
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

export function getFirmwarUpgradeLog(state = initialState, action) {
  switch (action.type) {
    case 'GetFirmwarUpgradeLogLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetFirmwarUpgradeLogSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetFirmwarUpgradeLogFail':
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
