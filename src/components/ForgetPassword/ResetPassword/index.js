import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Form, Input, Select, Button, Icon, Checkbox,Row, Col, } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
class ResetPassword extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.checkRepassword = this.checkRepassword.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.state = {
      passwordDirty: false,
    }
  }
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({
      passwordDirty: this.state.passwordDirty || !!value
    });
  }
  checkRepassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码必须一致!');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['reNewPassword'], {
        force: true
      });
    }
    callback();
  }
  componentDidMount() {}
  nextStep(value) {
    this.setState({
      show: value
    })
  }
  render() {

    const {getFieldDecorator} = this.props.form;
    return (
      <div className="password-root">
<div>
<div className="password-title">
  重置密码
</div>
<div className="password-des">请重设您的帐号密码</div>
<div>
       <Form style={{marginTop:10,}} onSubmit={this.props.saveHandel}>

         <FormItem>
          {getFieldDecorator('newPassword', {
        rules: [{
          required: true,
          message: '请输入新密码!'
        },
          {
            validator: this.checkConfirm,
          }

        ],
      })(
        <div>
            <Input type="text"style={{

          height: 40
        }} placeholder="请输入新密码"  type="password" onBlur={this.handlePasswordBlur}  />
          </div>
      )}
        </FormItem>
                <FormItem>
               {getFieldDecorator('reNewPassword', {
        rules: [{
          required: true,
          message: '请再次输入新密码!'
        }, {
          validator: this.checkRepassword,
        }
        ],
      })(
        <div>
            <Input type="text"style={{

          height: 40
        }} placeholder="请再次输入新密码"  type="password" />
          </div>
      )}
        </FormItem>
        <FormItem>

          <Button style={{
        width: "100%"
      }} type="primary" htmlType="submit"  className="login-form-button">
           保存
          </Button>
        </FormItem>
        </Form>
</div>
</div>
</div>
      );
  }
}
ResetPassword = Form.create({})(ResetPassword);
export default ResetPassword;
