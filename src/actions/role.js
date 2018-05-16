import * as RoleActionTypes from '../constants/role';
import requestAPI from './config';

export function getAllRole(filterCondition) {
  return {
    types: [
      RoleActionTypes.GetAllRoleLoading,
      RoleActionTypes.GetAllRoleSuccess,
      RoleActionTypes.GetAllRoleFail,
    ],
    promise: requestAPI('/role/', filterCondition, 'get'),
  };
}
export function getRole(RoleId) {
  return {
    types: [
      RoleActionTypes.GetRoleLoading,
      RoleActionTypes.GetRoleSuccess,
      RoleActionTypes.GetRoleFail,
    ],
    promise: requestAPI(`/role/${RoleId}`, null, 'get'),
  };
}
export function addRole(Role) {
  return {
    types: [
      RoleActionTypes.AddRoleLoading,
      RoleActionTypes.AddRoleSuccess,
      RoleActionTypes.AddRoleFail,
    ],
    promise: requestAPI('/role/', Role, 'post'),
  };
}
export function deleteRole(RoleId) {
  return {
    types: [
      RoleActionTypes.DeleteRoleLoading,
      RoleActionTypes.DeleteRoleSuccess,
      RoleActionTypes.DeleteRoleFail,
    ],
    promise: requestAPI(`/role/${RoleId}`, null, 'delete'),
  };
}
export function updateRole(Role) {
  return {
    types: [
      RoleActionTypes.UpdateRoleLoading,
      RoleActionTypes.UpdateRoleSuccess,
      RoleActionTypes.UpdateRoleFail,
    ],
    promise: requestAPI('/role/', Role, 'put'),
  };
}

// 获取没有权限的角色列表

export function getRoleList(id) {
  return requestAPI(`/role/account/${id}`, null, 'get');
}
