import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Form, Input, Select, Button, Icon, Checkbox,Row,Col, } from 'antd';
import { Code } from '../../';
const FormItem = Form.Item;
const Option = Select.Option;
class PhoneVerify extends PureComponent {
  constructor(props, context) {
    super(props, context);

  }
  componentDidMount() {}

  render() {

    const {getFieldDecorator} = this.props.form;
    return (
      <div>

<div className="password-title">
  重置密码
</div>
<div>
       <Form onSubmit={this.props.verifyPhone}>
            <FormItem>
          {getFieldDecorator('phone', {
        rules: [{
          required: true,
          message: '请输入你绑定的手机号!'
        }],
      })(
        <Input  placeholder="手机号" />
      )}
        </FormItem>
         <FormItem>
         <Row>
         <Col span="16">
      {getFieldDecorator('verifyCode', {
        rules: [{
          required: true,
          message: '请输入验证码!'
        }],
      })(

            <Input type="text"style={{
          width: 260,
          height: 40
        }} placeholder="验证码" /> 

      )}
         </Col>
         <Col span="2">
<Code  ref="code" />
         
         </Col>
         </Row>
    
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
PhoneVerify = Form.create({})(PhoneVerify);
export default PhoneVerify;