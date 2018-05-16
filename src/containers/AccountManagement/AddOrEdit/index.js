import React, { PureComponent } from "react";
import { Form, Input, Select, Button, Modal } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import immutable from "immutable";
import { Link } from "react-router";
import * as userActions from "../../../actions/user";
import { getRoleList } from "../../../actions/role";
import md5 from "md5";
import { Title, VerifyCode } from "../../../components";

const FormItem = Form.Item;
const Option = Select.Option;
class AddOrEdit extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.checkUserName = this.checkUserName.bind(this);
    this.checkPhone = this.checkPhone.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.editSucess = this.editSucess.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.visibleEdit = this.visibleEdit.bind(this);
    this.state = {
      roleList: [],
      visible: false,
      disabled: false,
      isEmail: false,
      newRandomKey: +new Date(),
      passwordDirty: false,
      user: {}
    };
  }
  componentDidMount() {
    this.init();
  }
  visibleEdit() {
    if (this.isUpdate()) {
      setTimeout(() => {
        let newData = this.props.form.getFieldsValue();
        const data = this.props.user.data;
        let oldData = {};
        Object.keys(newData).map(item => {
          oldData[item] = data[item];
        });
        // 编辑自己
        if (this.getUserId() == this.props.auth.currUser.id) {
          delete newData.email;
          delete newData.mobile;
          delete oldData.email;
          delete oldData.mobile;
        }
        newData = immutable.fromJS(newData);
        oldData = immutable.fromJS(oldData);
        this.setState({
          disabled: immutable.is(newData, oldData)
        });
      }, 200);
    }
  }

  init() {
    const userId = this.props.auth.currUser.id;
    if (this.isUpdate()) {
      getRoleList(userId).then(res => {
        this.setState({
          roleList: res.data
        });
        this.getData();
      });
    } else {
      getRoleList(userId).then(res => {
        this.setState({
          roleList: res.data
        });
      });
    }
  }
  getData() {
    this.props.actions.getUser(this.getUserId()).then(() => {
      this.visibleEdit();
    });
  }
  showModal(value) {
    this.setState({
      visible: true,
      newRandomKey: +new Date(),
      isEmail: value
    });
  }
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  doAction(values) {
    const user = values;
    user.password = values.password && md5(values.password).toUpperCase();
    if (this.isUpdate()) {
      user.id = this.getUserId();
      return this.props.actions.updateUser(user);
    } else {
      return this.props.actions.addUser(user);
    }
  }
  getUserId() {
    const router = this.context.router;
    return router.params.id;
  }
  isUpdate() {
    const userId = this.getUserId();
    if (typeof userId != "undefined") {
      return true;
    }
    return false;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.doAction(values).then(res => {
          if (res.code == "000000") {
            const router = this.context.router;
            router.push("/Content/AccountManagement/List");
          } else {
            alert(res.message);
          }
        });
      }
    });
  }

  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({
      passwordDirty: this.state.passwordDirty || !!value
    });
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码必须一致!");
    } else {
      callback();
    }
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(["repassword"], {
        force: true
      });
    }
    const passwordReg = /^[^\s]{6,20}$/;
    if (!passwordReg.test(value)) {
      callback("请输入6~16个字符，支持所有字符，字母区分大小写");
    }
    callback();
  }
  checkUserName(rule, value, callback) {
    const userNameReg = /^[a-z]\w{0,19}$/i;
    if (!userNameReg.test(value)) {
      callback("须为字母或数字，以字母开头，不超过20个字符");
    }
    userActions.verfiyNameOrPhone(value).then(res => {
      if (res.data) {
        if (this.isUpdate()) {
          if (this.props.user.data.id != res.data.id) {
            callback("用户名已存在");
          } else {
            callback();
          }
        } else {
          callback("用户名已存在");
        }
      } else {
        callback();
      }
    });
  }
  checkPhone(rule, value, callback) {
    const phoneReg = /^\d+$/;
    if (!phoneReg.test(value)) {
      callback("手机号必须是纯数字");
    }
    userActions.verfiyNameOrPhone(value).then(res => {
      if (res.data) {
        if (this.isUpdate()) {
          if (this.props.user.data.id != res.data.id) {
            callback("手机号已存在");
          } else {
            callback();
          }
        } else {
          callback("手机号已存在");
        }
      } else {
        callback();
      }
    });
  }
  editSucess(data) {
    if (!this.state.isEmail) {
      userActions.verfiyPhoneCode(data).then(res => {
        if (res.code == "000000") {
          this.getData();
          this.handleCancel();
        } else {
          this.refs.VerifyCode.setFields({
            smsCode: {
              errors: [new Error(res.message)]
            }
          });
        }
      });
    } else {
      // 参数能不能一样。。。。
      data.emailCode = data.smsCode;
      userActions.verfiyEmailCode(data).then(res => {
        if (res.code == "000000") {
          this.getData();
          this.handleCancel();
        } else {
          this.refs.VerifyCode.setFields({
            smsCode: {
              errors: [new Error(res.message)]
            }
          });
        }
      });
    }
  }
  sendCode(data) {
    if (this.state.isEmail) {
      const sendData = {
        email: data
      };
      return userActions.sendEmailCode(sendData);
    }
    const sendData = {
      mobile: data
    };
    return userActions.sendPhoneCode(sendData);
  }
  handleOk() {
    this.setState({
      visible: false
    });
  }
  handleCancel(e) {
    //this.refs.VerifyCode.clear()
    this.setState({
      visible: false
    });
  }
  render() {
    let data = null;
    if (this.isUpdate()) {
      if (!this.props.user.loaded) {
        return <div />;
      }
      data = this.props.user.data;
    } else {
      data = {};
    }

    const optionComp = this.state.roleList.map((item, index) => {
      return <Option key={item.id}>{item.name}</Option>;
    });
    optionComp.push(
      <Option key="createRole">
        <Link to="/Content/RoleManagement/AddOrEdit"><div> 创建角色</div></Link>
      </Option>
    );
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
    const comp = this.isUpdate()
      ? <div />
      : <div>

          <FormItem {...formItemLayout} label="初始密码">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "请输入初始密码"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(<Input type="password" onBlur={this.handlePasswordBlur} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码">
            {getFieldDecorator("repassword", {
              rules: [
                {
                  required: true,
                  message: "请输入确认密码"
                },
                {
                  validator: this.checkPassword
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
        </div>;
    return (
      <div>
        <Modal
          key={this.state.newRandomKey}
          title={`修改${this.state.isEmail ? "邮箱" : "手机号"}`}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer=""
        >
          <VerifyCode
            ref="VerifyCode"
            isEmail={this.state.isEmail}
            callback={this.editSucess}
            sendCode={this.sendCode}
          />
        </Modal>
        <Title text="帐号信息" />
        <div className="view-content">
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator("name", {
                initialValue: data.name,
                rules: [
                  {
                    required: true,
                    message: "请输入用户名"
                  },
                  {
                    validator: this.checkUserName
                  }
                ]
              })(
                <Input
                  disabled={this.isUpdate()}
                  type="text"
                  placeholder="支持字母或数字，注册后不可修改，请认真填写"
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator("nickname", {
                initialValue: data.nickname,
                rules: [
                  {
                    required: true,
                    message: "请输入姓名"
                  }
                ]
              })(<Input type="text" onChange={this.visibleEdit} />)}
            </FormItem>

            {this.getUserId() == this.props.auth.currUser.id
              ? <FormItem {...formItemLayout} label="手机号">
                  {getFieldDecorator("mobile")(
                    <div>
                      <span>
                        {data.mobile}
                      </span>
                      <span
                        className="edit-a"
                        onClick={this.showModal.bind(this, false)}
                      >
                        修改
                      </span>
                    </div>
                  )}
                </FormItem>
              : <FormItem {...formItemLayout} label="手机号">
                  {getFieldDecorator("mobile", {
                    initialValue: data.mobile,
                    rules: [
                      {
                        required: true,
                        message: "请输入手机号"
                      },
                      {
                        validator: this.checkPhone
                      }
                    ]
                  })(<Input type="text" onChange={this.visibleEdit} />)}
                </FormItem>}

            {this.getUserId() == this.props.auth.currUser.id
              ? <FormItem {...formItemLayout} label="联系邮箱">
                  {getFieldDecorator("email")(
                    <div>
                      <span>
                        {data.email}
                      </span>
                      <span
                        className="edit-a"
                        onClick={this.showModal.bind(this, true)}
                      >
                        修改
                      </span>
                    </div>
                  )}
                </FormItem>
              : <FormItem {...formItemLayout} label="邮箱">
                  {getFieldDecorator("email", {
                    initialValue: data.email,
                    rules: [
                      {
                        type: "email",
                        required: true,
                        message: "请输入正确的邮箱"
                      }
                    ]
                  })(<Input type="text" onChange={this.visibleEdit} />)}
                </FormItem>}
            {comp}
            {this.getUserId() != this.props.auth.currUser.id &&
              <FormItem {...formItemLayout} label="选择角色">
                {getFieldDecorator("roleId", {
                  initialValue: data.roleId,
                  rules: [
                    {
                      required: true,
                      message: "请输入角色"
                    }
                  ]
                })(
                  <Select onChange={this.visibleEdit} className="icp-selector">
                    {optionComp}
                  </Select>
                )}
              </FormItem>}
            <FormItem {...formItemLayout} label=" ">
              <span className="mr60">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.state.disabled}
                  size="large"
                >
                  保存
                </Button>
              </span>
              <Button type="ghost" onClick={this.goBack} size="large">
                取消
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
AddOrEdit.contextTypes = {
  router: React.PropTypes.object
};
AddOrEdit = Form.create({})(AddOrEdit);
function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrEdit);
