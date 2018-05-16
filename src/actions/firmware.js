import * as FirmwareActionTypes from '../constants/firmware';
import requestAPI from './config';

export function getAllFirmware(filterCondition) {
  return {
    types: [
      FirmwareActionTypes.GetAllFirmwareLoading,
      FirmwareActionTypes.GetAllFirmwareSuccess,
      FirmwareActionTypes.GetAllFirmwareFail,
    ],
    promise: requestAPI('/firmware/', filterCondition, 'get'),
  };
}
export function getFirmware(firmwareId) {
  return {
    types: [
      FirmwareActionTypes.GetFirmwareLoading,
      FirmwareActionTypes.GetFirmwareSuccess,
      FirmwareActionTypes.GetFirmwareFail,
    ],
    promise: requestAPI(`/firmware/${firmwareId}`, null, 'get'),
  };
}
export function addFirmware(firmware) {
  return {
    types: [
      FirmwareActionTypes.AddFirmwareLoading,
      FirmwareActionTypes.AddFirmwareSuccess,
      FirmwareActionTypes.AddFirmwareFail,
    ],
    promise: requestAPI('/firmware/', firmware, 'post'),
  };
}
export function deleteFirmware(firmwareId) {
  return {
    types: [
      FirmwareActionTypes.DeleteFirmwareLoading,
      FirmwareActionTypes.DeleteFirmwareSuccess,
      FirmwareActionTypes.DeleteFirmwareFail,
    ],
    promise: requestAPI(`/firmware/${firmwareId}`, null, 'delete'),
  };
}
export function updateFirmware(firmware) {
  return {
    types: [
      FirmwareActionTypes.UpdateFirmwareLoading,
      FirmwareActionTypes.UpdateFirmwareSuccess,
      FirmwareActionTypes.UpdateFirmwareFail,
    ],
    promise: requestAPI(`/firmware/v1.2.0/${firmware.id}`, firmware, 'put'),
  };
}

export function getProductFirmware(uid, filterCondition) {
  return {
    types: [
      FirmwareActionTypes.GetProductFirmwareLoading,
      FirmwareActionTypes.GetProductFirmwareSuccess,
      FirmwareActionTypes.GetProductFirmwareFail,
    ],
    promise: requestAPI(`/firmware/product/${uid}`, filterCondition, 'get'),
  };
}


// 升级固件

export function updateDevFirmware(data) {
  return requestAPI('/firmware/promotion', data, 'put');
}

// 发布固件

export function publishFirmware(id) {
  return requestAPI(`/firmware/${id}`, null, 'put');
}

// 升级记录

export function getFirmwarUpgradeLog(filterCondition) {
  return {
    types: [
      FirmwareActionTypes.GetFirmwarUpgradeLogLoading,
      FirmwareActionTypes.GetFirmwarUpgradeLogSuccess,
      FirmwareActionTypes.GetFirmwarUpgradeLogFail,
    ],
    promise: requestAPI('/firmware/promotionresult', filterCondition, 'get'),
  };
}

// 根据UID 查询固件

export function getFirmwarByUID(uid, firmwareId) {
  return requestAPI(`/firmware/device/${uid}`, firmwareId, 'get');
}

// 根据UID 获取 固件列表下拉列表(支持模糊查询)

export function getFirmwarListByUID(filterCondition) {
  return requestAPI('/firmware/device/uids', filterCondition, 'get');
}

// 获取产品对应的固件列表
export function getFirmwarListByProduct(modelId, filterCondition) {
  return requestAPI(`/firmware/product/${modelId}`, filterCondition, 'get');
}

// 获取操作人

export function getAllOperator() {
  return requestAPI('/firmware/promotionresult/createaccount', null, 'get');
}

