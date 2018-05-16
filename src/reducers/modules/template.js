const initialState = {
  loaded: false,
};

export function GetTemplate(state = initialState, action) {
  switch (action.type) {
    case 'GetTemplateLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetTemplateSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetTemplateFail':
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

export function GetAllTemplate(state = initialState, action) {
  switch (action.type) {
    case 'GetAllTemplateLoading':
      return {
        ...state,
        loading: true,
      };
    case 'GetAllTemplateSuccess':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
      };
    case 'GetAllTemplateFail':
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
