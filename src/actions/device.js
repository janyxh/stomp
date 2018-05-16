import * as DeviceActionTypes from '../constants/device';
import requestAPI from './config';

export function getAllDevice(filterCondition) {
  return {
    types: [
      DeviceActionTypes.GetAllDeviceLoading,
      DeviceActionTypes.GetAllDeviceSuccess,
      DeviceActionTypes.GetAllDeviceFail,
    ],
    promise: requestAPI('/firmware/device/', filterCondition, 'get'),
  };
}
export function getDevice() {
  return {
    types: [
      DeviceActionTypes.GetDeviceLoading,
      DeviceActionTypes.GetDeviceSuccess,
      DeviceActionTypes.GetDeviceFail,
    ],
    promise: requestAPI('/firmware/device/', null, 'get'),
  };
}
export function addDevice(device) {
  return {
    types: [
      DeviceActionTypes.AddDeviceLoading,
      DeviceActionTypes.AddDeviceSuccess,
      DeviceActionTypes.AddDeviceFail,
    ],
    promise: requestAPI('/device', device, 'post'),
  };
}
export function deleteDevice(deviceId) {
  return {
    types: [
      DeviceActionTypes.DeleteDeviceLoading,
      DeviceActionTypes.DeleteDeviceSuccess,
      DeviceActionTypes.DeleteDeviceFail,
    ],
    promise: requestAPI(`/device/${deviceId}`, null, 'delete'),
  };
}
export function updateDevice(device) {
  return {
    types: [
      DeviceActionTypes.UpdateDeviceLoading,
      DeviceActionTypes.UpdateDeviceSuccess,
      DeviceActionTypes.UpdateDeviceFail,
    ],
    promise: requestAPI(`/device/${device.deviceId}`, device, 'update'),
  };
}
