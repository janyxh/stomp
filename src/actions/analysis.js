import * as AnalysisActionTypes from "../constants/analysis";
import requestAPI from "./config";

// 设备激活总数统计
export function getDeviceActivation(filterCondition) {
  return {
    types: [
      AnalysisActionTypes.GetDeviceActivationLoading,
      AnalysisActionTypes.GetDeviceActivationSuccess,
      AnalysisActionTypes.GetDeviceActivationFail
    ],
    promise: requestAPI(
      "/statistics/devices/activation/",
      filterCondition,
      "get"
    )
  };
}

// 设备激活趋势
export function getDeviceTrend(filterCondition) {
  return {
    types: [
      AnalysisActionTypes.GetDeviceTrendLoading,
      AnalysisActionTypes.GetDeviceTrendSuccess,
      AnalysisActionTypes.GetDeviceTrendFail
    ],
    promise: requestAPI(
      "/statistics/devices/activation/trend/",
      filterCondition,
      "get"
    )
  };
}

// 设备分布趋势
export function getDeviceDistribute(filterCondition) {
  return {
    types: [
      AnalysisActionTypes.GetDeviceDistributeLoading,
      AnalysisActionTypes.GetDeviceDistributeSuccess,
      AnalysisActionTypes.GetDeviceDistributeFail
    ],
    promise: requestAPI("/statistics/devices/area/", filterCondition, "get")
  };
}

// 用户活跃趋势
// export function getUserRegisterCount(filterCondition) {
//   return {
//     types: [
//       AnalysisActionTypes.GetUserRegisterCountLoading,
//       AnalysisActionTypes.GetUserRegisterCountSuccess,
//       AnalysisActionTypes.GetUserRegisterCountFail,
//     ],
//     promise: requestAPI('/statistics/users/register/', filterCondition, 'get'),
//   };
// }

// 用户注册趋势
export function getUserRegisterTrend(filterCondition) {
  return {
    types: [
      AnalysisActionTypes.GetUserRegisterTrendLoading,
      AnalysisActionTypes.GetUserRegisterTrendSuccess,
      AnalysisActionTypes.GetUserRegisterTrendFail
    ],
    promise: requestAPI(
      "/statistics/users/register/trend/",
      filterCondition,
      "get"
    )
  };
}

// 用户分布情况
export function getUserRegisterDistribute(filterCondition) {
  return {
    types: [
      AnalysisActionTypes.GetUserRegisterDistributeLoading,
      AnalysisActionTypes.GetUserRegisterDistributeSuccess,
      AnalysisActionTypes.GetUserRegisterDistributeFail
    ],
    promise: requestAPI("/statistics/users/area/", filterCondition, "get")
  };
}

// 导出用户分析数据

export function getUserAnalysisData(filterCondition) {
  return requestAPI("/statistics/users/export/", filterCondition, "get", true);
}

// 导出设备分析数据

export function getDeviceAnalysisData(filterCondition) {
  return requestAPI(
    "/statistics/devices/export/",
    filterCondition,
    "get",
    true
  );
}