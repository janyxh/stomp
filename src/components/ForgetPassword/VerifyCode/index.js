import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Form, Input, Select, Button, Icon, Checkbox } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class VerifyCode extends PureComponent {
  constructor(props, context) {
    super(props, context);


  }
  componentDidMount() {}

  render() {

    const {getFieldDecorator ,getFieldValue} = this.props.form;
    return (
      <div>

<div className="password-title">
  安全验证
</div>
<div className="password-des">请查收手机号码{this.props.phone}的验证码：</div>
<div>
       <Form onSubmit={this.props.verifyCode}>
          
         <FormItem>
          {getFieldDecorator('smsCode', {
        rules: [{
          required: true,
          message: '请输入手机验证码!',
        }],
      })(
        <div>
            <Input type="text"style={{
          width: 260,
          height: 40
        }} placeholder="验证码" /> 
          <Button
        style={{
          width: 110,
          height: 36
        }} type="primary"  className="login-form-button" disabled={this.props.disabled} onClick={this.props.sendCode} >{this.props.text}</Button>
          </div>
      )}
        </FormItem>
                <FormItem>

          <Button style={{
        width: "100%"
      }} type="primary"  htmlType="submit"  className="login-form-button">
            下一步
          </Button>
        </FormItem>
        </Form>
</div>

      </div>
      )
  }
}
VerifyCode = Form.create({})(VerifyCode);
export default VerifyCode;