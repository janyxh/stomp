import React, { PureComponent } from 'react';

class FirmwareInfo extends PureComponent {

  render() {
    const { zhijiaAccount, name, productModel, internalModel, deviceUid, hardwareVersion, appFirmwareVersion, coordinatorFirmwareVersion, systemFirmwareVersion, mcuFirmwareVersion } = this.props.data;
    return (
      <div>
     <div className="firmwareInfo-title">设备信息</div>
               <ul>
                 <li>
                  <div className="firmwareInfo-label">
                   用户名:
                 </div>
                 <div className="firmwareInfo-text">
                    { zhijiaAccount}
                 </div>
                 </li>
                 <li>
                  <div className="firmwareInfo-label">
                   设备UID:
                 </div>
                 <div className="firmwareInfo-text">
                     {deviceUid}
                 </div>
                 </li>
                 <li>
                  <div className="firmwareInfo-label">
                   产品名称:
                 </div>
                 <div className="firmwareInfo-text">
                     {name}
                 </div>
                 </li>
                 <li>
                  <div className="firmwareInfo-label">
                   产品型号:
                 </div>
                 <div className="firmwareInfo-text">
                    { productModel }
                 </div>
                 </li>
                 <li>
                  <div className="firmwareInfo-label">
                   内部型号:
                 </div>
                 <div className="firmwareInfo-text">
                    {
      internalModel || '无'
      }
                 </div>
                 </li><li>
                  <div className="firmwareInfo-label">
                   硬件版本:
                 </div>
                 <div className="firmwareInfo-text">
                  {
      hardwareVersion || '无'
      }
                 </div>
                 </li>
                 <li>
                  <div className="firmwareInfo-label">
                   应用固件版本:
                 </div>
                 <div className="firmwareInfo-text">
                     {appFirmwareVersion || '无'}
                 </div>
                 </li>
                 <li>
                  <div className="firmwareInfo-label">
                   系统固件版本:
                 </div>
                 <div className="firmwareInfo-text">
                   {systemFirmwareVersion || '无'}
                 </div>
                 </li>
                 <li>
                  <div className="firmwareInfo-label">
                   协调器固件版本:
                 </div>
                 <div className="firmwareInfo-text">
                    {coordinatorFirmwareVersion || '无'}
                 </div>
                 </li>
                 <li>
                  <div className="firmwareInfo-label">
                   第三方MCU固件固件版本:
                 </div>
                 <div className="firmwareInfo-text">
                    {mcuFirmwareVersion || '无'}
                 </div>
                 </li>
               </ul>
      </div>
      );
  }
}
export default FirmwareInfo;
