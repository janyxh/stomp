import React, { PureComponent } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Upload,
  message,
  Icon,
  Col,
  Row,
  Modal,
  Radio,
  Tooltip
} from "antd";
import md5 from "md5";
import { Link } from "react-router";
import { Title, Offline } from "../../";
import domain from "../../../actions/domain";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

function beforeUpload(file) {
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error(" 附件大小必须小于 10MB!");
  }
  return isLt10M;
}
class VendorAddOrEdit extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.checkRepassword = this.checkRepassword.bind(this);
    this.checkUserName = this.checkUserName.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.checkPhone = this.checkPhone.bind(this);
    this.state = {
      passwordDirty: false,
      showUpload: true
    };
    const that = this;
    this.uploadProps = {
      name: "files",
      onRemove(e) {
        let id = e.uid;
        if (e.response) {
          id = e.response.data[0];
        }
        that.props.delAttachment(id).then(res => {
          if (res.code == "000000") {
            message.success(`${e.name} 删除成功`);
          } else {
            message.success(`${e.name} 删除失败`);
          }
        });
      },
      action: `${domain}/manufAttachment/`,
      withCredentials: true,
      onChange(info) {
        if (info.file.status !== "uploading") {
          if (info.file.status == "removed") {
            that.props.removeFileList(info.file.uid);
          } else {
            const fileId = info.file.response.data[0];

            that.props.addFileList(fileId);
          }
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 上传失败`);
        }
      },
      beforeUpload: beforeUpload
    };
  }
  componentDidMount() {
    this.setState({
      showUpload: false
    });
    setTimeout(() => {
      this.setState({
        showUpload: true
      });
    }, 100);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.vendor.id != this.props.vendor.id) {
      this.setState({
        showUpload: false
      });
      setTimeout(() => {
        this.setState({
          showUpload: true
        });
      }, 100);
    }
  }
  checkRepassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码必须一致!");
    } else {
      callback();
    }
  }
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({
      passwordDirty: this.state.passwordDirty || !!value
    });
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(["rePassword"], {
        force: true
      });
    }
    const passwordReg = /^[^\s]{6,20}$/;
    if (!passwordReg.test(value)) {
      callback("请输入6~16个字符，支持所有字符，字母区分大小写");
    }
    callback();
  }
  checkPhone(rule, value, callback) {
    const phoneReg = /^\d+$/;
    if (!phoneReg.test(value)) {
      callback("手机号必须是纯数字");
    }
    callback();
  }
  checkUserName(rule, value, callback) {
    const userNameReg = /^[a-z]\w{0,19}$/i;
    if (!userNameReg.test(value)) {
      callback("须为字母或数字，以字母开头，不超过20个字符");
    }
    this.props.verfiyNameOrPhone(value).then(res => {
      if (res.data) {
        if (this.props.isUpdate()) {
          if (this.props.vendor.accountName != res.data.name) {
            callback("帐号名已存在");
          } else {
            callback();
          }
        } else {
          callback("帐号名已存在");
        }
      } else {
        callback();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const vendor = this.props.vendor;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
    const largeformItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16
      }
    };
    const countryOptions = this.props.countryList.map((item, index) => {
      return <Option key={item.id}>{item.country}</Option>;
    });
    const provinceOptions = this.props.provinceList.map((item, index) => {
      return <Option key={item.id}>{item.province}</Option>;
    });
    const cityOptions = this.props.cityList.map((item, index) => {
      return <Option key={item.id}>{item.city}</Option>;
    });
    const comp = this.props.isUpdate() == false
      ? <div>
          <FormItem {...formItemLayout} label="初始密码">
            {getFieldDecorator("password", {
              initialValue: vendor.password,
              rules: [
                {
                  required: true,
                  message: "请输入初始密码!"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(<Input type="password" onBlur={this.handlePasswordBlur} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="确认密码">
            {getFieldDecorator("rePassword", {
              initialValue: vendor.rePassword,
              rules: [
                {
                  required: true,
                  message: "确认密码!"
                },
                {
                  validator: this.checkRepassword
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
        </div>
      : <div />;
    const text = (
      <span>
        <div>
          完全托管：厂商不参与软件研发，不能自行新增产品以及自定义参数模板，适合无软件研发团队的厂商
        </div>
        <div>
          半托管：厂商可参与软件研发，可自行新增产品或自定义参数模板，适合有软件研发团队对接的厂商
        </div>
      </span>
    );
    return (
      <div>
        <Modal
          onCancel={this.props.handleCancel}
          title="请选择下线原因"
          visible={this.props.visible}
          footer=""
          width="310"
        >
          <Offline
            onCancel={this.props.handleCancel}
            offOrOnline={this.props.offOrOnline}
          />
        </Modal>
        <Title text="厂商信息" />
        <div className="view-content">
          <Form>
            <FormItem {...formItemLayout} label="厂商名称">
              {getFieldDecorator("name", {
                initialValue: vendor.name,
                rules: [
                  {
                    required: true,
                    message: "请输入厂商名称!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="厂商地址">
              <Row gutter={8}>
                <Col span={8}>
                  {getFieldDecorator("country", {
                    initialValue: vendor.country,
                    rules: [
                      {
                        required: true,
                        message: "请选择国家"
                      }
                    ]
                  })(
                    <Select
                      placeholder="请选择国家"
                      onChange={this.props.onCountryChange}
                    >
                      {countryOptions}
                    </Select>
                  )}
                </Col>
                {(() => {
                  if (this.props.isChina) {
                    return (
                      <Col>
                        {" "}<Col span={8}>
                          {getFieldDecorator("provice", {
                            initialValue: vendor.provice,
                            rules: [
                              {
                                required: true,
                                message: "请选择省份"
                              }
                            ]
                          })(
                            <Select
                              placeholder="请选择省份"
                              onChange={this.props.onCityChange}
                            >
                              {provinceOptions}
                            </Select>
                          )}
                        </Col>
                        <Col span={8}>
                          {getFieldDecorator("city", {
                            initialValue: vendor.city,
                            rules: [
                              {
                                required: true,
                                message: "请填写城市"
                              }
                            ]
                          })(
                            <Select placeholder="请选择城市">
                              {cityOptions}
                            </Select>
                          )}
                        </Col>
                      </Col>
                    );
                  }
                })()}

              </Row>
            </FormItem>

            <FormItem {...formItemLayout} label="详细地址">
              {getFieldDecorator("address", {
                initialValue: vendor.address,
                rules: [
                  {
                    message: "请输入详细地址!",
                    required: true
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="营业执照号码">
              {getFieldDecorator("businessLicense", {
                initialValue: vendor.businessLicense,
                rules: [
                  {
                    required: true,
                    message: "请输入营业执照号码!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="签约时间">
              {getFieldDecorator("signedTime", {
                initialValue: typeof vendor.signDateStart != "undefined"
                  ? [moment(vendor.signDateStart), moment(vendor.signDateEnd)]
                  : "",
                rules: [
                  {
                    required: true,
                    message: "请输入签约时间!"
                  }
                ]
              })(
                <RangePicker
                  defaultValue={
                    typeof vendor.signDateStart != "undefined"
                      ? [
                          moment(vendor.signDateStart),
                          moment(vendor.signDateEnd)
                        ]
                      : ""
                  }
                />
              )}
            </FormItem>
          </Form>
        </div>
        <Title text="联系人信息" />
        <div className="view-content">
          <Form>
            <FormItem {...formItemLayout} label="联系人姓名">
              {getFieldDecorator("linkmanName", {
                initialValue: vendor.linkmanName,
                rules: [
                  {
                    required: true,
                    message: "请输入联系人姓名!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="联系人手机">
              {getFieldDecorator("linkmanMobile", {
                initialValue: vendor.linkmanMobile,
                rules: [
                  {
                    required: true,
                    message: "请输入联系人手机!"
                  },
                  {
                    validator: this.checkPhone
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="联系人邮箱">
              {getFieldDecorator("linkmanEmail", {
                initialValue: vendor.linkmanEmail,
                rules: [
                  {
                    type: "email",
                    required: true,
                    message: "请输入正确邮箱!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
          </Form>

        </div>

        <Title text="帐号信息" />
        <div className="view-content">
          <Form>

            <FormItem {...formItemLayout} label="帐号名">
              {getFieldDecorator("accountName", {
                initialValue: vendor.accountName,
                rules: [
                  {
                    required: true,
                    message: "请输入帐号名!"
                  },
                  {
                    validator: this.checkUserName
                  }
                ]
              })(
                <Input
                  type="name"
                  placeholder="支持字母或数字，注册后不可修改，请认真填写"
                  disabled={this.props.isUpdate()}
                />
              )}
            </FormItem>
            {comp}

          </Form>

        </div>
        <Title text="其他信息" />
        <div className="view-content">
          <Form onSubmit={this.props.handleSubmit}>

            <FormItem {...formItemLayout} label="定制APP标识码">
              {getFieldDecorator("appCode", {
                initialValue: vendor.appCode,
                rules: [
                  {
                    required: true,
                    message: "请输入定制APP标识码!"
                  }
                ]
              })(<Input type="text" placeholder="请联系开发人员获取" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  厂商合作类型&nbsp;
                  <Tooltip title={text}>
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("cooperationType", {
                initialValue: vendor.cooperationType || "0",
                rules: [
                  {
                    required: true,
                    message: "请选择厂商合作类型!"
                  }
                ]
              })(
                <RadioGroup>
                  <Radio value={"0"}>完全托管</Radio>
                  <Radio value={"1"}>半托管</Radio>
                </RadioGroup>
              )}
            </FormItem>

            {(() => {
              if (this.state.showUpload) {
                return (
                  <FormItem {...formItemLayout} label="附件">
                    {getFieldDecorator("attachmentIds", {
                      initialValue: this.props.defaultFileList
                    })(
                      <Upload
                        defaultFileList={this.props.defaultFileList}
                        {...this.uploadProps}
                      >
                        <a> +添加附件</a>

                      </Upload>
                    )}
                  </FormItem>
                );
              }
            })()}

            <FormItem {...largeformItemLayout} label=" ">
              <span className="mr60">
                <Button type="primary" htmlType="submit" size="large">
                  提交
                </Button>
              </span>
              <span className="mr60">
                {this.props.isUpdate() && this.props.onOffLineAuthority
                  ? <Button
                      type="primary"
                      onClick={
                        this.props.isOnLine()
                          ? this.props.showMoadl
                          : this.props.confirm
                      }
                      style={{
                        backgroundColor: "red",
                        color: "#fff"
                      }}
                      size="large"
                    >
                      {this.props.isOnLine() ? "下线" : " 上线"}
                    </Button>
                  : ""}

              </span>
              <Button type="ghost" onClick={this.props.goBack} size="large">
                取消
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
VendorAddOrEdit = Form.create({})(VendorAddOrEdit);
export default VendorAddOrEdit;
