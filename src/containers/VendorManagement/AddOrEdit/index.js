import React, { PureComponent } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Modal } from "antd";
import * as vendorActions from "../../../actions/vendor";
import { verfiyNameOrPhone } from "../../../actions/user";

import {
  getCountryList,
  getProvinceList,
  getCityList,
  addAttachment,
  delAttachment
} from "../../../actions";
import { VendorAddOrEdit } from "../../../components/VendorManagement";
import md5 from "md5";
class AddOrEdit extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onProvinceChange = this.onProvinceChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFileList = this.addFileList.bind(this);
    this.removeFileList = this.removeFileList.bind(this);
    this.isUpdate = this.isUpdate.bind(this);
    this.offOrOnline = this.offOrOnline.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isOnLine = this.isOnLine.bind(this);
    this.showMoadl = this.showMoadl.bind(this);
    this.onLine = this.onLine.bind(this);
    this.goBack = this.goBack.bind(this);
    this.once = true;
    this.fileList = [];
    this.defaultFileList = [];
    this.state = {
      countryList: [],
      provinceList: [],
      cityList: [],
      visible: false,
      isChina: true
    };
  }
  componentDidMount() {
    this.init();
  }
  init() {
    const vendorId = this.getVendorId();
    if (this.isUpdate()) {
      this.props.actions.getVendor(vendorId).then(() => {
        const vendor = this.props.vendor.data;
        this.setSelectValue(vendor);
      });
    }
    getCountryList().then(res => {
      this.setState({
        countryList: res.data
      });
    });
  }
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  setSelectValue(vendor) {
    const countryId = vendor.country;
    this.onProvinceChange(countryId);
    const provinceId = vendor.provice;
    this.onCityChange(provinceId);
  }
  onCountryChange(id) {
    this.onProvinceChange(id);
  }
  onProvinceChange(id) {
    if (this.state.countryList.length > 0) {
      const china = this.state.countryList.find(item => {
        return item.country == "中国";
      });
      if (id != china.id) {
        this.setState({
          isChina: false
        });
      } else {
        this.setState({
          isChina: true
        });
      }
    }
    getProvinceList(id).then(res => {
      this.setState({
        provinceList: res.data
      });
    });
  }
  onCityChange(id) {
    getCityList(id).then(res => {
      this.setState({
        cityList: res.data
      });
      // 编辑 只执行一次
      if (this.isUpdate()) {
        !this.once &&
          this.refs.vendorAddOrEdit.setFieldsValue({
            city: res.data[0].id
          });
        this.once = false;
      } else {
        this.once &&
          this.refs.vendorAddOrEdit.setFieldsValue({
            city: res.data[0].id
          });
      }
    });
  }
  doAction(values) {
    const vendor = values;
    if (this.isUpdate()) {
      vendor.id = this.getVendorId();
      return this.props.actions.updateVendor(vendor);
    } else {
      return this.props.actions.addVendor(vendor);
    }
  }
  addFileList(fileId) {
    if (this.fileList.indexOf(fileId) <= -1) {
      this.fileList.push(fileId);
    }
  }
  removeFileList(fileId) {
    this.fileList.splice(this.fileList.indexOf(fileId), 1);
  }
  componentWillUnmount() {
    this.fileList = [];
  }
  handleSubmit(e) {
    e.preventDefault();

    this.refs.vendorAddOrEdit.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = values;
        data.signDateStart = data.signedTime[0].valueOf();
        data.signDateEnd = data.signedTime[1].valueOf();
        delete data.signedTime;

        if (data.attachmentIds.fileList) {
          const list = [];
          data.attachmentIds.fileList.map((item, index) => {
            if (item.response) {
              list.push(item.response.data[0]);
            } else {
              list.push(item.uid);
            }
          });
          data.attachmentIds = list;
        } else {
          data.attachmentIds = data.attachmentIds.map((item, index) => {
            return item.uid;
          });
        }
        data.password = values.password && md5(values.password).toUpperCase();
        data.rePassword =
          values.rePassword && md5(values.rePassword).toUpperCase();
        this.doAction(data).then(res => {
          if (res.code == "000000") {
            this.fileList = [];
            const router = this.context.router;
            router.push("/Content/VendorManagement/List");
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  getVendorId() {
    const router = this.context.router;
    return router.params.id;
  }
  isUpdate() {
    const vendorId = this.getVendorId();
    if (typeof vendorId != "undefined") {
      return true;
    }
    return false;
  }
  offOrOnline(data) {
    if (this.isOnLine()) {
      this.offline(data);
    } else {
      this.onLine();
    }
  }
  offline(data) {
    const id = this.getVendorId();
    const offlineFlag = "1";
    data.id = id;
    data.offlineFlag = offlineFlag;
    vendorActions.offOnLine(data).then(res => {
      if (res.code == "000000") {
        const router = this.context.router;
        router.push("/Content/VendorManagement/List");
      }
    });
  }
  confirm() {
    Modal.confirm({
      title: "确认",
      content: "确定上线吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.onLine.bind(this)
    });
  }
  onLine() {
    const id = this.getVendorId();
    const offlineFlag = "0";
    vendorActions
      .offOnLine({
        id,
        offlineFlag
      })
      .then(res => {
        if (res.code == "000000") {
          const router = this.context.router;
          router.push("/Content/VendorManagement/List");
        } else {
          alert(res.message);
        }
      });
  }
  isOnLine() {
    return this.props.vendor.data.offlineFlag == "0";
  }
  showMoadl() {
    this.setState({
      visible: true
    });
  }
  handleCancel() {
    this.setState({
      visible: false
    });
  }
  onOffLineAuthority() {
    return this.props.auth.currUser.authorityVOList.find(item => {
      return item.number == "03000001040000";
    });
  }
  render() {
    const selectObj = {
      countryList: this.state.countryList,
      provinceList: this.state.provinceList,
      cityList: this.state.cityList,
      onCountryChange: this.onCountryChange,
      onCityChange: this.onCityChange
    };
    let data = {};
    const defaultFileList = [];
    if (this.isUpdate()) {
      if (!this.props.vendor.loaded) {
        return <div />;
      }
      data = this.props.vendor.data;

      data.manufAttachmentList.map((item, index) => {
        this.addFileList(item.id);
        defaultFileList.push({
          uid: item.id,
          name: item.originName,
          status: "done"
        });
      });
    }

    return (
      <VendorAddOrEdit
        onOffLineAuthority={this.onOffLineAuthority()}
        ref="vendorAddOrEdit"
        verfiyNameOrPhone={verfiyNameOrPhone}
        isChina={this.state.isChina}
        vendor={data}
        doAction={this.doAction}
        {...selectObj}
        handleSubmit={this.handleSubmit}
        addFileList={this.addFileList}
        isUpdate={this.isUpdate}
        removeFileList={this.removeFileList}
        offOrOnline={this.offOrOnline}
        visible={this.state.visible}
        handleCancel={this.handleCancel}
        showMoadl={this.showMoadl}
        isOnLine={this.isOnLine}
        confirm={this.confirm.bind(this)}
        goBack={this.goBack}
        defaultFileList={defaultFileList}
        delAttachment={delAttachment}
        loginUser={this.props.auth.currUser}
      />
    );
  }
}
AddOrEdit.contextTypes = {
  router: React.PropTypes.object
};
function mapStateToProps(state) {
  return {
    vendor: state.vendor,
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(vendorActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrEdit);
