import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Form, Input, Select, Button, Icon, Checkbox } from 'antd';
import { ResetPassword, VerifyCode, PhoneVerify } from '../../components/ForgetPassword'
import md5 from 'md5';
import { sendCode as sendVerfiyCode, verifyCode as verifyPhoneCode, verifyPhoneAndCode, resetPassword } from '../../actions';
const FormItem = Form.Item;
const Option = Select.Option;
class ForgetPassword extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.saveHandel = this.saveHandel.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.verifyPhone = this.verifyPhone.bind(this)
    this.verifyCode = this.verifyCode.bind(this)
    this.sendCode = this.sendCode.bind(this)
    this.state = {
      show: 1,
      text: "发送验证码",
      disabled: false,
      time: 59,
    }
  }
  startInterval() {
    this.id = setInterval(() => {
      if (this.state.time <= 0) {
        clearInterval(this.id);
        this.setState({
          text: "重新发送",
          disabled: false,
          time: 59,
        })
        return;
      }
      const count = this.state.time--;
      this.setState({
        disabled: true,
        text: `${count}秒后重发送`
      })


    }, 1000)
  }
  componentDidMount() {}
  nextStep(value) {
    this.setState({
      show: value
    })
  }
  verifyPhone(e) {
    e.preventDefault();
    this.refs.phoneVerify.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.phone = values.phone;

        verifyPhoneAndCode(values).then((res) => {
          if (res.code == "000000") {
            console.log(values)
            this.nextStep(2)
          } else {
            this.refs.phoneVerify.setFields({
              verifyCode: {
                errors: [new Error(res.message)],
              },
            });
          }
        })

      }
    });
  // 验证电话号码
  // 
  }
  verifyCode(e) {
    e.preventDefault();
    this.refs.verifyCode.validateFieldsAndScroll((err, values) => {
      if (!err) {
        verifyPhoneCode(values).then((res) => {
          if (res.code == "000000") {
            this.nextStep(3)
          } else {
            this.refs.verifyCode.setFields({
              smsCode: {
                errors: [new Error(res.message)],
              },
            });
          }
        });
      }
    });
  }
  sendCode() {
    const data = {
      phone: this.phone,
    }
    sendVerfiyCode(data).then((res) => {
      this.startInterval()
    })
  }
  saveHandel(e) {
    e.preventDefault();
    this.refs.resetPassword.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          phone: this.phone,
          pwd:  md5(values.reNewPassword).toUpperCase(),
        }; 
        resetPassword(data).then((res) => {
          if (res.code == "000000") {
            const router = this.context.router;
            router.push('/Login');
          } else {
            this.refs.resetPassword.setFields({
              reNewPassword: {
                errors: [new Error(res.message)],
              },
            });
          }
        })

      }
    });

  }
  render() {

    const {getFieldDecorator} = this.props.form;
    let comp = null;
    if (this.state.show == 1) {
      comp = <PhoneVerify  ref="phoneVerify" verifyPhone={this.verifyPhone}  />
    } else if (this.state.show == 2) {
      comp = <VerifyCode
      ref="verifyCode"
      text={this.state.text}
      time={this.state.time}
      disabled= {this.state.disabled}
      phone={this.phone}
      sendCode = {this.sendCode}
      nextStep={this.nextStep}
      verifyCode = {this.verifyCode}
      />
    } else {
      comp = <ResetPassword ref="resetPassword"  saveHandel={this.saveHandel} />
    }
    return (
      <div className="password-root">
      {comp}
      </div>
      );
  }
}
ForgetPassword.contextTypes = {
  router: React.PropTypes.object
}
ForgetPassword = Form.create({})(ForgetPassword);
export default ForgetPassword;