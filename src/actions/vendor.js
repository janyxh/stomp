import * as VendorActionTypes from "../constants/vendor";
import requestAPI from "./config";

export function getAllVendor(filterCondition) {
  return {
    types: [
      VendorActionTypes.GetAllVendorLoading,
      VendorActionTypes.GetAllVendorSuccess,
      VendorActionTypes.GetAllVendorFail
    ],
    promise: requestAPI("/manufacturer/", filterCondition, "get")
  };
}
export function getVendor(vendorId) {
  return {
    types: [
      VendorActionTypes.GetVendorLoading,
      VendorActionTypes.GetVendorSuccess,
      VendorActionTypes.GetVendorFail
    ],
    promise: requestAPI(`/manufacturer/${vendorId}`, null, "get")
  };
}
export function addVendor(vendor) {
  return {
    types: [
      VendorActionTypes.AddVendorLoading,
      VendorActionTypes.AddVendorSuccess,
      VendorActionTypes.AddVendorFail
    ],
    promise: requestAPI("/manufacturer/", vendor, "post")
  };
}
export function deleteVendor(vendorId) {
  return {
    types: [
      VendorActionTypes.DeleteVendorLoading,
      VendorActionTypes.DeleteVendorSuccess,
      VendorActionTypes.DeleteVendorFail
    ],
    promise: requestAPI(`/manufacturer/${vendorId}`, null, "delete")
  };
}
export function updateVendor(vendor) {
  return {
    types: [
      VendorActionTypes.UpdateVendorLoading,
      VendorActionTypes.UpdateVendorSuccess,
      VendorActionTypes.UpdateVendorFail
    ],
    promise: requestAPI("/manufacturer/", vendor, "put")
  };
}

// 厂商上下线

export function offOnLine(data) {
  return requestAPI(`/manufacturer/${data.id}`, data, "put");
}

// 更新厂商的手机

export function upDatePhone(data) {
  return requestAPI("/manufacturer/updatePhone", data, "put");
}

// 发送厂商的联系人手机验证码

export function sendPhoneCode(data) {
  return requestAPI("/manufacturer/sendMessage", data, "get");
}

// 验证厂商的手机验证码

export function verfiyPhoneCode(data) {
  return requestAPI("/manufacturer/valCode", data, "get");
}

// 更新厂商的邮箱

export function upDateEmail(data) {
  return requestAPI("/manufacturer/updateEmail", data, "put");
}

// 发送厂商的联系人邮箱验证码

export function sendEmailCode(data) {
  return requestAPI("/manufacturer/sendEamilMessage", data, "get");
}

// 验证厂商的邮箱验证码

export function verfiyEmailCode(data) {
  return requestAPI("/manufacturer/valEmailCode", data, "get");
}

// 更新公司基本信息

export function updateCurrentVendorInfo(data) {
  return requestAPI("/manufacturer/current", data, "put");
}

// 获取当前用户的厂商信息
export function getCurrentVendorInfo() {
  return requestAPI("/manufacturer/current", null, "get");
}
