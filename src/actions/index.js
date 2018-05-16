import requestAPI from './config';

// 获取权限列表

export function GetProductType() {
  return requestAPI('/productType/', null, 'get');
}

// 获取一级产品类型

export function getAllAuthority() {
  return requestAPI('/authority/', null, 'get');
}

// 获取二级产品类型

export function GetChildProductType(typeId) {
  return requestAPI(`/productType/${typeId}`, null, 'get');
}

// 获取一级技术方案

export function GetTechnicalType() {
  return requestAPI('/technicalScheme/', null, 'get');
}

// 获取二级技术方案

export function GetChildTechnicalType(typeId) {
  return requestAPI(`/technicalScheme/sub/${typeId}`, null, 'get');
}

// 上传附件

export function UploadAttachment(files) {
  return requestAPI('/manufAttachment/', files, 'post');
}


// 获取厂商 不用权限

export function getVendorList() {
  return requestAPI('/manufacturer/product', null, 'get');
}


// 获取省市

export function getCountryList() {
  return requestAPI('/country/', null, 'get');
}

// 获取城市

export function getProvinceList(countryId) {
  return requestAPI(`/province/${countryId}`, null, 'get');
}

// 地区

export function getCityList(provinceId) {
  return requestAPI(`/city/${provinceId}`, null, 'get');
}

// 上传文件

export function addAttachment(files) {
  return requestAPI('/manufAttachment/', files, 'post');
}

// 删除文件

export function delAttachment(id) {
  return requestAPI(`/manufAttachment/${id}`, null, 'DELETE');
}


// 发送手机验证码

export function sendCode(phone) {
  return requestAPI('/account/sendMessage', phone, 'get');
}

// 验证手机验证码

export function verifyCode(smsCode) {
  return requestAPI('/account/valTelCode', smsCode, 'get');
}

// 验证手机号和验证码

export function verifyPhoneAndCode(data) {
  return requestAPI('/account/valTelAndCode', data, 'put');
}

// 重置密码

export function resetPassword(data) {
  return requestAPI('/account/updatePwd', data, 'put');
}


// 设备激活总数
export function getDeviceActivationCount(filterCondition) {
  return requestAPI('/statistics/devices/activation/', filterCondition, 'get');
}

// 用户注册总数

export function getUserRegisterCount(filterCondition) {
  return requestAPI('/statistics/users/register/', filterCondition, 'get');
}

// 今日设备激活趋势

export function todayDevTrend(filterCondition) {
  return requestAPI('/statistics/devices/activation/trend/', filterCondition, 'get');
}

// 今日用户注册趋势

export function todayUserTrend(filterCondition) {
  return requestAPI('/statistics/users/register/trend/', filterCondition, 'get');
}
