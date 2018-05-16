import * as TemplateActionTypes from '../constants/template';
import requestAPI from './config';

export function getAllTemplate(productId) {
  return {
    types: [
      TemplateActionTypes.GetAllTemplateLoading,
      TemplateActionTypes.GetAllTemplateSuccess,
      TemplateActionTypes.GetAllTemplateFail,
    ],
    promise: requestAPI(`/template/${productId}`, null, 'get'),
  };
}
export function getTemplate(templateId) {
  return {
    types: [
      TemplateActionTypes.GetTemplateLoading,
      TemplateActionTypes.GetTemplateSuccess,
      TemplateActionTypes.GetTemplateFail,
    ],
    promise: requestAPI(`/template/${templateId}`, null, 'get'),
  };
}
export function addTemplate(template) {
  return {
    types: [
      TemplateActionTypes.AddTemplateLoading,
      TemplateActionTypes.AddTemplateSuccess,
      TemplateActionTypes.AddTemplateFail,
    ],
    promise: requestAPI('/template/', template, 'post'),
  };
}
export function deleteTemplate(templateId) {
  return {
    types: [
      TemplateActionTypes.DeleteTemplateLoading,
      TemplateActionTypes.DeleteTemplateSuccess,
      TemplateActionTypes.DeleteTemplateFail,
    ],
    promise: requestAPI(`/template/${templateId}`, null, 'delete'),
  };
}
export function updateTemplate(template) {
  return {
    types: [
      TemplateActionTypes.UpdateTemplateLoading,
      TemplateActionTypes.UpdateTemplateSuccess,
      TemplateActionTypes.UpdateTemplateFail,
    ],
    promise: requestAPI('/template/', template, 'put'),
  };
}
