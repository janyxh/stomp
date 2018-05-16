// import * as AnalysisActionTypes from "../constants/analysis";
import requestAPI from "./config";

export function getAllApplication(filterCondition) {
  return requestAPI("/applications/v1/", filterCondition, "get");
}
// 添加应用
export function addApplication(data) {
  return requestAPI("/applications/v1/", data, "post");
}

// 获取某个应用信息
export function getApplication(id) {
  return requestAPI(`/applications/v1/${id}`, null, "get");
}

// 更新某个应用
export function updateApplication(data) {
  return requestAPI(`/applications/v1/${data.id}`, data, "put");
}

// 获取某个应用的语言信息
export function getApplicationLanguage(id) {
  return requestAPI(`/applications/v1/${id}/languages/`, null, "get");
}

// 更新某个应用的语言信息
export function updateApplicationLanguage(data) {
  return requestAPI(`/applications/v1/${data.id}/languages/`, data, "put");
}

// 更新某个应用的基本信息的其他信息

export function updateApplicationOtherInfo(data) {
  return requestAPI(`/applications/v1/${data.id}/baseinfo/other/`, data, "put");
}

// 获取某个应用的基本信息
export function getApplicationBasicInfo(id) {
  return requestAPI(`/applications/v1/${id}/baseinfo/`, null, "get");
}

export function deleteApplication(id) {
  return requestAPI(`/applications/v1/${id}`, null, "delete");
}

// 发布应用 同步应用配置信息到服务器

export function publishApplication(id) {
  return requestAPI(`/applications/v1/${id}/synchronization/`, null, "put");
}

// 更新某个应用的基本信息的业务功能信息
export function getApplicationServerInfo(id) {
  return requestAPI(`/applications/v1/${id}/baseinfo/register/`, null, "get");
}

// 更新某个应用的基本信息的业务功能信息
export function updateApplicationServerInfo(data) {
  return requestAPI(
    `/applications/v1/${data.id}/baseinfo/register/`,
    data,
    "put"
  );
}

// 更新某个应用的基本信息的颜色
export function updateApplicationTheme(data) {
  return requestAPI(`/applications/v1/${data.id}/baseinfo/color/`, data, "put");
}

export function exportApplicationData(id) {
  return requestAPI(`/applications/v1/${id}/excel`, null, "get");
}

// 获取设备分类列表

export function getDeviceCategory(languageCode) {
  return requestAPI(`/applications/v1/devices/${languageCode}`, null, "get");
}

// 获取某个应用的一级分类列表

export function getApplicationTopCategory(id) {
  return requestAPI(`/applications/v1/${id}/categorys/level/1/`, null, "get");
}

// 获取某个应用一级分类的二级分类列表
export function getApplicationSecondCategory(id, categoryId) {
  return requestAPI(
    `/applications/v1/${id}/categorys/${categoryId}/sons/`,
    null,
    "get"
  );
}

// 添加某个应用分类

export function addApplicationCategory(data) {
  return requestAPI(`/applications/v1/${data.id}/categorys/`, data, "post");
}

// 编辑某个应用分类名称

export function updateApplicationCategory(data) {
  return requestAPI(
    `/applications/v1/${data.id}/categorys/${data.categoryId}`,
    data,
    "put"
  );
}
// 编辑某个应用分类顺序

export function updateApplicationCategoryOrder(data) {
  return requestAPI(
    `/applications/v1/${data.id}/categorys/${data.categoryId}/sequence/`,
    data,
    "put"
  );
}

//  删除某个应用分类

export function deleteApplicationCategory(data) {
  return requestAPI(
    `/applications/v1/${data.id}/categorys/${data.categoryId}`,
    data,
    "delete"
  );
}

// 获取某个应用的主导航栏信息

export function getApplicationAllNav(id) {
  return requestAPI(`/applications/v1/${id}/navigations/`, null, "get");
}

// 更新某个应用的主导航栏信息

export function updateApplicationNav(data) {
  return requestAPI(
    `/applications/v1/${data.id}/navigations/${data.navigationId}`,
    data,
    "put"
  );
}

// 删除某个应用的主导航栏信息

export function deleteApplicationNav(data) {
  return requestAPI(
    `/applications/v1/${data.id}/navigations/${data.navigationId}`,
    null,
    "delete"
  );
}

// 添加某个应用的主导航栏信息

export function addApplicationNav(data) {
  return requestAPI(`/applications/v1/${data.id}/navigations/`, data, "post");
}

// 更新某个应用的主导航栏顺序

export function updateApplicationNavOrder(data) {
  return requestAPI(
    `/applications/v1/${data.id}/navigations/${data.navigationId}/sequence/`,
    null,
    "put"
  );
}
//  上传导航栏的图标

// 获取语言列表

export function getLanguageList() {
  return requestAPI("/languages/v1/", null, "get");
}

// 获取某应用第三方微信登录信息
export function getWechatInfo({ id, platform }) {
  return requestAPI(
    `/applications/v1/${id}/authorizations/wechat/`,
    { platform },
    "get"
  );
}

// 获取某应用第三方QQ登录信息
export function getQQInfo({ id, platform }) {
  return requestAPI(
    `/applications/v1/${id}/authorizations/qq/`,
    { platform },
    "get"
  );
}

// 获取某应用第三方微博登录信息

export function getWeiboInfo({ id, platform }) {
  return requestAPI(
    `/applications/v1/${id}/authorizations/weibo/`,
    { platform },
    "get"
  );
}

// 获取某应用第三方小欧小方信息

export function getXiaoFangInfo({ id, platform }) {
  return requestAPI(
    `/applications/v1/${id}/authorizations/xoxf/`,
    { platform },
    "get"
  );
}
// 更新某应用第三方微信登录信息

export function updateWechatInfo(data) {
  return requestAPI(
    `/applications/v1/${data.id}/authorizations/wechat/${data.authorityId}`,
    data,
    "put"
  );
}

// 更新某应用第三方QQ登录信息

export function updateQQInfo(data) {
  return requestAPI(
    `/applications/v1/${data.id}/authorizations/qq/${data.authorityId}`,
    data,
    "put"
  );
}

// 更新某应用第三方微博登录信息

export function updateWeiboInfo(data) {
  return requestAPI(
    `/applications/v1/${data.id}/authorizations/weibo/${data.authorityId}`,
    data,
    "put"
  );
}

// 更新某应用第三方小欧小方信息

export function updateXiaoFangInfo(data) {
  return requestAPI(
    `/applications/v1/${data.id}/authorizations/xoxf/${data.authorityId}`,
    data,
    "put"
  );
}

// 获取某个应用的【我的】列表

export function getApplicationMemu(id) {
  return requestAPI(`/applications/v1/${id}/mycenters/`, null, "get");
}

// 获取某个应用的建议反馈

export function getApplicationFeedBack(id) {
  return requestAPI(`/applications/v1/${id}/advices/`, null, "get");
}
export function updateApplicationFeedBack(data) {
  return requestAPI(`/applications/v1/${data.id}/advices/`, data, "put");
}
// 添加某个应用的分组

export function addApplicationGroup(data) {
  return requestAPI(`/applications/v1/${data.id}/groups/`, data, "post");
}

// 更新某个应用的分组顺序

export function updateApplicationGroupOrder(data) {
  return requestAPI(
    `/applications/v1/${data.id}/groups/${data.groupIndex}`,
    data,
    "put"
  );
}

// 删除某个应用的分组

export function deleteApplicationGroup(data) {
  return requestAPI(
    `/applications/v1/${data.id}/groups/${data.groupIndex}`,
    null,
    "delete"
  );
}

// 添加某个应用某个分组的成员

export function addApplicationGroupMember(data) {
  return requestAPI(
    `/applications/v1/${data.id}/groups/${data.groupIndex}`,
    data,
    "post"
  );
}

// 删除某个应用某个分组的成员

export function deleteApplicationGroupMember(data) {
  return requestAPI(
    `/applications/v1/${data.id}/groups/members/${data.memberId}`,
    null,
    "delete"
  );
}

// 更新某个应用某个分组的成员顺序

export function updateAppGroupMemberOrder(data) {
  return requestAPI(
    `/applications/v1/${data.id}/groups/members/${data.memberId}/sequence/`,
    null,
    "put"
  );
}

// 更新某个应用某个分组的成员

export function updateAppGroupMember(data) {
  return requestAPI(
    `/applications/v1/${data.id}/groups/members/${data.memberId}`,
    data,
    "put"
  );
}

//获取应用厂商下拉列表
export function getAppVendorList() {
  return requestAPI("/applications/v1/manufacture", null, "get");
}
