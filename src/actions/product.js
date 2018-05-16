import * as ProductActionTypes from '../constants/product';
import requestAPI from './config';

export function getAllProduct(filterCondition) {
  return {
    types: [
      ProductActionTypes.GetAllProductLoading,
      ProductActionTypes.GetAllProductSuccess,
      ProductActionTypes.GetAllProductFail,
    ],
    promise: requestAPI('/productInfo/', filterCondition, 'get'),
  };
}
export function getProduct(productId) {
  return {
    types: [
      ProductActionTypes.GetProductLoading,
      ProductActionTypes.GetProductSuccess,
      ProductActionTypes.GetProductFail,
    ],
    promise: requestAPI(`/productInfo/${productId}`, null, 'get'),
  };
}
export function addProduct(product) {
  return {
    types: [
      ProductActionTypes.AddProductLoading,
      ProductActionTypes.AddProductSuccess,
      ProductActionTypes.AddProductFail,
    ],
    promise: requestAPI('/productInfo/', product, 'post'),
  };
}
export function deleteProduct(productId) {
  return {
    types: [
      ProductActionTypes.DeleteProductLoading,
      ProductActionTypes.DeleteProductSuccess,
      ProductActionTypes.DeleteProductFail,
    ],
    promise: requestAPI(`/productInfo/${productId}`, null, 'delete'),
  };
}
export function updateProduct(product) {
  return {
    types: [
      ProductActionTypes.UpdateProductLoading,
      ProductActionTypes.UpdateProductSuccess,
      ProductActionTypes.UpdateProductFail,
    ],
    promise: requestAPI('/productInfo/', product, 'put'),
  };
}

// 更新技术信息
export function addTechniqueInfo(product) {
  return requestAPI('/techniqueInfo/', product, 'post');
}


// 更新技术信息
export function updateTechniqueInfo(product) {
  return requestAPI('/techniqueInfo/', product, 'put');
}

// 验证mode id是否存在

export function checkModelId(modelId) {
  return requestAPI(`/techniqueInfo/${modelId}`, null, 'get');
}

// 获取产品列表 不需要权限

export function getProductTypeList(manufId) {
  return requestAPI(`/productInfo/manuf/${manufId}`, null, 'get');
}
// 分页获取产品信息（固件模块）
export function getProductListFirmware(filterCondition) {
  return requestAPI('/productInfo/v1.2.0', filterCondition, 'get');
}
