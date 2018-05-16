import * as UserActionTypes from "../constants/user";
import requestAPI from "./config";

export function getAllUser(filterCondition) {
  return {
    types: [
      UserActionTypes.GetAllUserLoading,
      UserActionTypes.GetAllUserSuccess,
      UserActionTypes.GetAllUserFail
    ],
    promise: requestAPI("/account/", filterCondition, "get")
  };
}

export function getUser(userId) {
  return {
    types: [
      UserActionTypes.GetUserLoading,
      UserActionTypes.GetUserSuccess,
      UserActionTypes.GetUserFail
    ],

    promise: requestAPI(`/account/${userId}`, null, "get")
  };
}

export function addUser(user) {
  return {
    types: [
      UserActionTypes.AddUserLoading,
      UserActionTypes.AddUserSuccess,
      UserActionTypes.AddUserFail
    ],
    promise: requestAPI("/account/", user, "post")
  };
}
export function deleteUser(userId) {
  return {
    types: [
      UserActionTypes.DeleteUserLoading,
      UserActionTypes.DeleteUserSuccess,
      UserActionTypes.DeleteUserFail
    ],
    promise: requestAPI(`/account/${userId}`, null, "delete")
  };
}
export function updateUser(user) {
  return {
    types: [
      UserActionTypes.UpdateUserLoading,
      UserActionTypes.UpdateUserSuccess,
      UserActionTypes.UpdateUserFail
    ],
    promise: requestAPI("/account/", user, "put")
  };
}

// 更新当前用户的密码

export function upUserPassword(data) {
  return requestAPI("/account/curracc", data, "put");
}

// 更新用户的手机

// export function upDatePhone(data) {
//   return requestAPI('/manufacturer/updatePhone', data, 'put');
// }

// 发送用户手机的验证码

export function sendPhoneCode(data) {
  return requestAPI("/account/smscode", data, "get");
}

// 验证用户的手机验证码

export function verfiyPhoneCode(data) {
  return requestAPI("/account/mobile", data, "put");
}

// 更新用户的邮箱

// export function upDateEmail(data) {
//   return requestAPI('/manufacturer/updateEmail', data, 'put');
// }

// 发送用户的邮箱验证码

export function sendEmailCode(data) {
  return requestAPI("/account/emailcode", data, "get");
}

// 验证用户的邮箱验证码

export function verfiyEmailCode(data) {
  return requestAPI("/account/email", data, "put");
}

// 校验手机号和用户名的唯一性

export function verfiyNameOrPhone(mobileOrName) {
  return requestAPI(`/account/name/${mobileOrName}`, null, "get");
}
