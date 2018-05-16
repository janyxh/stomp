const initialState = {
  loaded: false
};

export function getDeviceActivation(state = initialState, action) {
  switch (action.type) {
    case "GetDeviceActivationLoading":
      return {
        ...state,
        loading: true
      };
    case "GetDeviceActivationSuccess":
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data
      };
    case "GetDeviceActivationFail":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function getDeviceTrend(state = initialState, action) {
  switch (action.type) {
    case "GetDeviceTrendLoading":
      return {
        ...state,
        loading: true
      };
    case "GetDeviceTrendSuccess":
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data
      };
    case "GetDeviceTrendFail":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function getDeviceDistribute(state = initialState, action) {
  switch (action.type) {
    case "GetDeviceDistributeLoading":
      return {
        ...state,
        loading: true
      };
    case "GetDeviceDistributeSuccess":
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data
      };
    case "GetDeviceDistributeFail":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function getUserRegisterCount(state = initialState, action) {
  switch (action.type) {
    case "GetUserRegisterCountLoading":
      return {
        ...state,
        loading: true
      };
    case "GetUserRegisterCountSuccess":
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data
      };
    case "GetUserRegisterCountFail":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function GetRegisterTrend(state = initialState, action) {
  switch (action.type) {
    case "GetUserRegisterTrendLoading":
      return {
        ...state,
        loading: true
      };
    case "GetUserRegisterTrendSuccess":
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data
      };
    case "GetUserRegisterTrendFail":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function GetUserRegisterDistribute(state = initialState, action) {
  switch (action.type) {
    case "GetUserRegisterDistributeLoading":
      return {
        ...state,
        loading: true
      };
    case "GetUserRegisterDistributeSuccess":
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data
      };
    case "GetUserRegisterDistributeFail":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}
