// 把每个容器组件对应的 state 绑定到 全局state里面
import { combineReducers } from "redux";
import { GetAllUser, GetUser } from "./modules/user";
import auth from "./modules/auth"; // 重构代码
import { getTestList, getTest, getProductNameList } from "./modules/test";
import { GetAllVendor, GetVendor } from "./modules/vendor";
import { GetAllRole, GetRole } from "./modules/role";
import { GetAllProduct, GetProduct } from "./modules/product";
import { GetAllDevice, GetDevice } from "./modules/device";
import {
  GetAllFirmware,
  GetFirmware,
  GetProductFirmware,
  getFirmwarUpgradeLog
} from "./modules/firmware";
import { GetAllTemplate, GetTemplate } from "./modules/template";
import {
  getDeviceActivation,
  getDeviceTrend,
  getDeviceDistribute,
  getUserRegisterCount,
  GetRegisterTrend,
  GetUserRegisterDistribute
} from "./modules/analysis";

const rootReducer = combineReducers({
  userList: GetAllUser,
  user: GetUser,
  vendor: GetVendor,
  vendorList: GetAllVendor,
  role: GetRole,
  roleList: GetAllRole,
  product: GetProduct,
  productList: GetAllProduct,
  device: GetDevice,
  deviceList: GetAllDevice,
  firmware: GetFirmware,
  productFirmware: GetProductFirmware,
  firmwareList: GetAllFirmware,
  template: GetTemplate,
  templateList: GetAllTemplate,
  firmwarUpgradeLog: getFirmwarUpgradeLog,
  auth,
  test: combineReducers({
    list: getTestList,
    test: getTest,
    productNameList: getProductNameList
  }),
  analysis: combineReducers({
    deviceActivation: getDeviceActivation,
    deviceTrend: getDeviceTrend,
    deviceDistribute: getDeviceDistribute,
    userRegisterCount: getUserRegisterCount,
    registerTrend: GetRegisterTrend,
    userRegisterDistribute: GetUserRegisterDistribute
  })
});
export default rootReducer;
