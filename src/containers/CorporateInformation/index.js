import React, { PureComponent } from "react";
import immutable from "immutable";
import { Form, Input, Modal, Button, message } from "antd";
import { Title, VerifyCode } from "../../components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getVendor,
  upDatePhone,
  sendPhoneCode,
  verfiyPhoneCode,
  upDateEmail,
  sendEmailCode,
  verfiyEmailCode,
  updateCurrentVendorInfo,
  getCurrentVendorInfo
} from "../../actions/vendor";
const FormItem = Form.Item;
class CorporateInformation extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.goBack = this.goBack.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.editSucess = this.editSucess.bind(this);
    this.showModal = this.showModal.bind(this);
    this.visibleEdit = this.visibleEdit.bind(this);
    this.state = {
      visible: false,
      isEmail: false,
      currentVendor: null,
      disabled: true
    };
  }
  componentDidMount() {
    this.getData();
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          id: this.state.currentVendor.id,
          address: values.address,
          name: values.name,
          businessLicense: values.businessLicense,
          linkmanName: values.linkmanName
        };
        updateCurrentVendorInfo(data).then(res => {
          if (res.code == "000000") {
            message.success("更新成功");
            this.getData();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  visibleEdit() {
    setTimeout(() => {
      let newData = this.props.form.getFieldsValue();

      const data = this.state.currentVendor;

      delete newData.linkmanMobile;
      delete newData.linkmanEmail;
      let oldData = {};
      Object.keys(newData).map(item => {
        oldData[item] = data[item];
      });
      delete oldData.linkmanMobile;
      delete oldData.linkmanEmail;
      newData = immutable.fromJS(newData);
      oldData = immutable.fromJS(oldData);
      this.setState({
        disabled: immutable.is(newData, oldData)
      });
    }, 200);
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
  getData() {
    return getCurrentVendorInfo().then(res => {
      if (res.code == "000000") {
        this.setState(
          {
            currentVendor: res.data
          },
          () => {
            this.visibleEdit();
          }
        );
      } else {
        alert(res.message);
      }
    });
  }
  editSucess(data) {
    if (!this.state.isEmail) {
      verfiyPhoneCode(data).then(res => {
        if (res.code == "000000") {
          console.log(data);
          const sendData = {
            linkmanMobile: data.data,
            id: this.state.currentVendor.id
          };
          upDatePhone(sendData).then(res => {
            this.getData();
          });
        } else {
          alert(res.message);
        }
      });
    } else {
      // 参数能不能一样。。。。
      data.emailCode = data.smsCode;
      verfiyEmailCode(data).then(res => {
        if (res.code == "000000") {
          const sendData = {
            linkmanEmail: data.data,
            id: this.state.currentVendor.id
          };
          upDateEmail(sendData).then(res => {
            this.getData();
          });
        } else {
          alert(res.message);
        }
      });
    }
    this.handleCancel();
  }
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  sendCode(data) {
    if (this.state.isEmail) {
      const sendData = {
        email: data
      };
      return sendEmailCode(sendData);
    }
    const sendData = {
      phone: data
    };
    return sendPhoneCode(sendData);
  }
  render() {
    if (!this.state.currentVendor) {
      return <div />;
    }
    const data = this.state.currentVendor;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

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
        <Title text="企业信息" />
        <div className="view-content">
          <Form>
            <FormItem {...formItemLayout} label="公司名">
              {getFieldDecorator("name", {
                initialValue: data.name,
                rules: [
                  {
                    required: true,
                    message: "请输入公司名称!"
                  }
                ]
              })(<Input type="text" onChange={this.visibleEdit} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="公司地址">
              {getFieldDecorator("address", {
                initialValue: data.address,
                rules: [
                  {
                    required: true,
                    message: "请输入公司地址!"
                  }
                ]
              })(<Input type="text" onChange={this.visibleEdit} />)}

            </FormItem>

            <FormItem {...formItemLayout} label="营业执照号码">
              {getFieldDecorator("businessLicense", {
                initialValue: data.businessLicense,
                rules: [
                  {
                    required: true,
                    message: "请输入营业执照号码!"
                  }
                ]
              })(<Input type="text" onChange={this.visibleEdit} />)}

            </FormItem>

          </Form>

        </div>
        <Title text="联系人信息" />
        <div className="view-content">
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="联系人姓名">
              {getFieldDecorator("linkmanName", {
                initialValue: data.linkmanName,
                rules: [
                  {
                    required: true,
                    message: "请输入联系人姓名!"
                  }
                ]
              })(<Input type="text" onChange={this.visibleEdit} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="联系人手机">
              {getFieldDecorator("linkmanMobile")(
                <div>
                  <span>
                    {data.linkmanMobile}
                  </span>
                  <span
                    className="edit-a"
                    onClick={this.showModal.bind(null, false)}
                  >
                    修改
                  </span>
                </div>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="联系人邮箱">
              {getFieldDecorator("linkmanEmail")(
                <div>
                  <span>
                    {data.linkmanEmail}
                  </span>
                  <span
                    className="edit-a"
                    onClick={this.showModal.bind(null, true)}
                  >
                    修改
                  </span>
                </div>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label=" ">
              <span className="mr60">
                <Button
                  type="primary"
                  disabled={this.state.disabled}
                  htmlType="submit"
                  size="large"
                >
                  保存
                </Button>
              </span>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

CorporateInformation.contextTypes = {
  router: React.PropTypes.object
};
CorporateInformation = Form.create({})(CorporateInformation);

function mapStateToProps(state) {
  return {
    vendor: state.vendor
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getVendor
      },
      dispatch
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(
  CorporateInformation
);
