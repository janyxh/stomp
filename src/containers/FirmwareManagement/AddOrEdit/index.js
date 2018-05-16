import React, { PureComponent, PropTypes } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Tag,
  Icon,
  Modal,
  message,
  Radio
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as firmwareActions from "../../../actions/firmware";
import { getVendorList } from "../../../actions/";
import domain from "../../../actions/domain";
import { getProductListFirmware } from "../../../actions/product";
import {
  FilterProduct,
  CustomParameters
} from "../../../components/FirmwareManagement";
import { Title } from "../../../components";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
function beforeUpload(file) {
  const name = file.name;
  const reg = new RegExp("(bin|ipk|rpk|hex)$", "i");
  const isFile = reg.test(name);
  if (!reg.test(name)) {
    message.error("上传文件必须以bin,ipk,rpk结尾");
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error("Image must smaller than 10MB!");
  }
  return isLt10M && isFile;
}

class AddOrEdit extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.addRelatedProduct = this.addRelatedProduct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModel = this.showModel.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.changeCompany = this.changeCompany.bind(this);
    this.goBack = this.goBack.bind(this);
    this.deletefirmware = this.deletefirmware.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.customParamsChange = this.customParamsChange.bind(this);
    this.addParameter = this.addParameter.bind(this);
    this.removeParameter = this.removeParameter.bind(this);
    this.showModal = this.showModal.bind(this);
    this.companyChange = this.companyChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.publishFirmware = this.publishFirmware.bind(this);
    this.file = {
      originName: ""
    };
    this.state = {
      companyList: [],
      productList: [],
      paramsList: [],
      render: true,
      visible: false,
      disabledUpload: false,
      passwordDirty: false,
      hardwareVersion: [],
      data: {},
      allProductList: [],
      newRandomKey: +new Date(),
      selectedRowKeys: []
    };
    this.filterCondition = {};
    const that = this;
    this.uploadProps = {
      multiple: false,
      name: "multipartFile",
      action: `${domain}/firmware/attachment`,
      withCredentials: true,
      onChange(info) {
        if (info.file.status == "uploading") {
          that.setState({
            disabledUpload: true
          });
        }
        if (info.file.status !== "uploading") {
          if (info.file.status == "removed") {
            that.setState({
              disabledUpload: false
            });
            that.file = null;
          } else {
            const file = info.file.response.data;
            that.file = file;
          }
        }

        if (info.file.status === "done") {
          that.setState({
            disabledUpload: true
          });
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 上传失败.`);
          that.setState({
            disabledUpload: false
          });
        }
      },
      beforeUpload: beforeUpload
    };
  }
  componentDidMount() {
    this.init();
  }
  publishFirmware() {
    const id = this.getFirmwareId();
    firmwareActions.publishFirmware(id).then(res => {
      if (res.code == "000000") {
        const router = this.context.router;
        router.push("/Content/FirmwareManagement/List");
      } else {
        alert(res.message);
      }
    });
  }
  onSearch(value) {
    value = value.trim();
    this.filterCondition.keyword = value;
    this.setState({
      productList: this.getProductList()
    });
  }
  companyChange(value) {
    this.filterCondition.manufactureId = value;
    this.setState({
      productList: this.getProductList()
    });
  }
  getProductList() {
    let list = this.state.allProductList;
    const manufactureId = this.filterCondition.manufactureId;
    if (manufactureId && manufactureId != "all") {
      list = list.filter(item => {
        return item.manufactureId == manufactureId;
      });
    }
    const keyword = this.filterCondition.keyword;
    if (keyword && keyword.length > 0) {
      const reg = new RegExp(keyword.trim());
      list = list.filter(item => {
        return reg.test(item.name) || reg.test(item.modelId);
      });
    }
    return list;
  }
  onSelectChange(selectedRowKeys) {
    this.setState(
      {
        selectedRowKeys
      },
      () => {
        this.relatedProductStatus();
      }
    );
  }
  deleteTag(value) {
    const selectedRowKeys = this.state.selectedRowKeys.filter(item => {
      return item != value;
    });
    this.setState(
      {
        selectedRowKeys
      },
      () => {
        this.relatedProductStatus();
      }
    );
  }
  relatedProductStatus() {
    const selectedRowKeys = this.state.selectedRowKeys;
    if (selectedRowKeys.length <= 0) {
      this.props.form.setFields({
        relatedProduct: {
          value: null,
          errors: [new Error("请选择适用产品!")]
        }
      });
    } else {
      this.props.form.setFieldsValue({
        relatedProduct: selectedRowKeys
      });
    }
  }
  addRelatedProduct() {
    this.setState({
      visible: true
    });
  }
  showModal(value) {
    this.setState({
      visible: true,
      newRandomKey: +new Date(),
      isEmail: value
    });
  }
  handleOk() {
    this.setState({
      visible: false
    });
  }
  handleCancel(e) {
    this.setState({
      visible: false
    });
  }

  addParameter(value) {
    const list = [...this.state.paramsList];
    const isExtis = list.find(item => {
      return value.name == item.name;
    });
    if (isExtis) {
      return;
    }
    list.push(value);
    this.setState({
      paramsList: list
    });
  }
  removeParameter(value) {
    let list = [...this.state.paramsList];
    list = list.filter((item, index) => {
      return value.name != item.name;
    });
    this.setState({
      paramsList: list
    });
  }
  onTypeChange(value) {
    this.setState({
      type: value
    });
  }
  confirm() {
    Modal.confirm({
      title: "确认",
      content: "确定删除吗？",
      okText: "确定",
      cancelText: "取消",
      onOk: this.deletefirmware.bind(this)
    });
  }
  deletefirmware() {
    const id = this.getFirmwareId();
    this.props.actions.deleteFirmware(id).then(res => {
      if (res.code == "000000") {
        const router = this.context.router;
        router.push("/Content/FirmwareManagement/List");
      } else {
        alert(res.message);
      }
    });
  }

  showModel() {
    this.setState({
      visible: true
    });
  }

  addFileList(fileId) {
    if (this.fileList.indexOf(fileId) <= -1) {
      this.fileList.push(fileId);
    }
  }
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  removeFileList(fileId) {
    this.fileList.splice(this.fileList.indexOf(fileId), 1);
  }

  changeCompany(value) {}
  init() {
    if (this.isUpdate()) {
      this.props.actions.getFirmware(this.getFirmwareId()).then(res => {
        if (this.isUpdate()) {
          const firmwareProductInfoVOList =
            res.data.firmwareProductInfoVOList || [];
          const list = firmwareProductInfoVOList.map(item => {
            return item.productId;
          });

          // 是否自定义参数
          if (res.data.customParamFlag == "1") {
            const data = res.data.paramVOList;
            this.setState({
              isCustomParams: true,
              paramsList: data
            });
          }
          this.setState({
            selectedRowKeys: list || []
          });
          //this.relatedProductStatus();
        }
      });
    }
    getVendorList().then(res => {
      this.setState({
        companyList: res.data
      });
    });
    //

    const filterCondition = {
      pageSize: 100000
    };
    getProductListFirmware(filterCondition).then(res => {
      const list = res.data.rows.map(item => {
        item.key = item.id;
        return item;
      });
      this.setState({
        allProductList: list,
        productList: list
      });
    });
  }
  doAction(values) {
    const firmware = values;

    if (this.isUpdate()) {
      const data = {
        id: this.getFirmwareId(),
        productIds: JSON.stringify(this.state.selectedRowKeys)
      };
      return this.props.actions.updateFirmware(data);
    } else {
      delete firmware.relatedProduct;
      firmware.fileSize = this.file.fileSize;
      firmware.originName = this.file.originName;
      firmware.fileName = this.file.fileName;
      firmware.productIds = JSON.stringify(this.state.selectedRowKeys);
      firmware.paramVOJson = JSON.stringify;
      this.state.paramsList;
      if (this.state.paramsList.length <= 0) {
        values.customParamFlag = "0";
      } else {
        values.customParamFlag = "1";
      }
      return this.props.actions.addFirmware(firmware);
    }
  }
  getFirmwareId() {
    const router = this.context.router;
    return router.params.id;
  }
  isUpdate() {
    const firmwareId = this.getFirmwareId();
    if (typeof firmwareId != "undefined") {
      return true;
    }
    return false;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values.attach;
        if (!this.file) {
          alert("请上传固件！");
          return;
        }

        this.doAction(values).then(res => {
          if (res.code == "000000") {
            const router = this.context.router;
            router.push("/Content/FirmwareManagement/List");
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  customParamsChange(e) {
    this.setState({
      isCustomParams: e.target.value
    });
  }
  render() {
    let data = null;
    let defaultFileList = [];

    if (this.isUpdate()) {
      if (!this.props.firmware.loaded) {
        return <div />;
      } else {
        data = this.props.firmware.data;
        defaultFileList = [
          {
            uid: -1,
            name: data.originName,
            status: "done"
          }
        ];
      }
    } else {
      if (this.state.allProductList.length <= 0) {
        return <div />;
      }
      data = this.state.data;
    }
    const disabled = this.isUpdate();
    const defaultTags = this.state.allProductList.filter((item, index) => {
      return this.state.selectedRowKeys.includes(item.id);
    });

    const compTags = defaultTags.map(item => {
      return (
        <Tag
          key={item.id}
          closable
          onClose={this.deleteTag.bind(this, item.id)}
        >
          {`${item.manufactureName}/${item.name}`}
        </Tag>
      );
    });
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
    const largeFormItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 20
      }
    };

    return (
      <div>
        <Modal
          key={this.state.newRandomKey}
          title="选择产品"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer=""
          width="1000"
        >
          <FilterProduct
            companyList={this.state.companyList}
            selectedRowKeys={this.state.selectedRowKeys}
            onSelectChange={this.onSelectChange}
            companyChange={this.companyChange}
            onSearch={this.onSearch}
            list={this.state.productList}
          />
        </Modal>
        <Title text="固件信息" />
        <div className="view-content">
          <Form>
            <FormItem {...formItemLayout} label="固件类型">
              {getFieldDecorator("types", {
                initialValue: data.types,
                rules: [
                  {
                    required: true,
                    message: "请选择固件类型"
                  }
                ]
              })(
                <Select
                  disabled={disabled}
                  onSelect={this.onTypeChange}
                  placeholder="请选择固件类型"
                >
                  <Option value="0">应用固件</Option>
                  <Option value="1">协调器固件</Option>
                  <Option value="2">系统固件</Option>
                  <Option value="3">第三方MCU固件</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="固件版本">
              {getFieldDecorator("version", {
                initialValue: data.version,
                rules: [
                  {
                    required: true,
                    message: "请填写固件版本号"
                  }
                ]
              })(
                <Input disabled={disabled} type="text" placeholder="请填写固件版本号" />
              )}
            </FormItem>
            {(() => {
              if (this.state.type == "3") {
                return (
                  <FormItem {...formItemLayout} label="自定义参数">
                    {getFieldDecorator("customParams", {
                      initialValue: data.customParams || false,
                      rules: [
                        {
                          required: true,
                          message: "请填写自定义参数"
                        }
                      ]
                    })(
                      <RadioGroup onChange={this.customParamsChange}>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                );
              }
            })()}
          </Form>
        </div>
        {(() => {
          if (this.state.isCustomParams) {
            return (
              <div>
                <Title text="自定义参数" />
                <div className="view-content">
                  <CustomParameters
                    isUpdate={this.isUpdate()}
                    paramsList={this.state.paramsList}
                    addParameter={this.addParameter}
                    removeParameter={this.removeParameter}
                  />
                </div>
              </div>
            );
          }
        })()}
        <Title text="适用产品" />
        <div className="view-content">
          <Form>
            <FormItem {...formItemLayout} label="适用产品">
              {getFieldDecorator("relatedProduct", {
                initialValue: data.firmwareProductInfoVOList,
                rules: [
                  {
                    required: true,
                    message: "请选择适用产品"
                  }
                ]
              })(
                <Button
                  type="primary"
                  icon="plus"
                  onClick={this.addRelatedProduct}
                  size="default"
                >
                  添加
                </Button>
              )}
            </FormItem>
            {
              <FormItem {...largeFormItemLayout} label=" ">
                {getFieldDecorator("list", {})(
                  <span>
                    {compTags}
                  </span>
                )}

              </FormItem>
            }
          </Form>
        </div>
        <Title text="固件上传" />
        <div className="view-content">
          <Form onSubmit={this.handleSubmit}>
            {(() => {
              if (this.isUpdate()) {
                return (
                  <FormItem {...formItemLayout} label="固件">
                    {`${defaultFileList[0].name}`}
                    <span className="b2">
                      {`  (${(parseInt(data.fileSize) / 1024 / 1024).toFixed(
                        2
                      )}M)`}
                    </span>
                  </FormItem>
                );
              } else {
                return (
                  <FormItem {...formItemLayout} label="固件">
                    {getFieldDecorator("originName", {
                      initialValue: data.originName,
                      rules: [
                        {
                          required: true,
                          message: "请上传固件"
                        }
                      ]
                    })(
                      <Upload
                        disabled={this.state.disabledUpload}
                        {...this.uploadProps}
                      >
                        <a title="只能上传一个固件">
                          <Icon type="upload" /> 上传
                        </a>
                      </Upload>
                    )}
                  </FormItem>
                );
              }
            })()}
            {disabled
              ? <FormItem {...largeFormItemLayout} label=" ">
                  <span className="mr30">
                    <Button type="primary" htmlType="submit" size="large">
                      保存
                    </Button>
                  </span>
                  {this.props.firmware.data.publishFlag == "0" &&
                    <span className="mr30">
                      <Button
                        type="ghost"
                        onClick={this.publishFirmware}
                        size="large"
                      >
                        发布
                      </Button>
                    </span>}

                  <Button type="ghost" onClick={this.goBack} size="large">
                    取消
                  </Button>
                </FormItem>
              : <FormItem {...formItemLayout} label=" ">
                  <span className="mr30">
                    <Button type="primary" htmlType="submit" size="large">
                      保存
                    </Button>
                  </span>
                  <Button type="ghost" onClick={this.goBack} size="large">
                    取消
                  </Button>
                </FormItem>}
          </Form>
        </div>
      </div>
    );
  }
}
const propTypes = {
  firmware: PropTypes.object.isRequired,
  productList: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};
AddOrEdit.propTypes = propTypes;
AddOrEdit.contextTypes = {
  router: React.PropTypes.object
};

AddOrEdit = Form.create({})(AddOrEdit);
function mapStateToProps(state) {
  return {
    firmware: state.firmware,
    productList: state.productList
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...firmwareActions
      },
      dispatch
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrEdit);
