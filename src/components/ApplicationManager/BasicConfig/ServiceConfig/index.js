import React, { PureComponent, PropTypes } from "react";
import { Form, Input, Radio, Button } from "antd";
import { Title } from "../../../../components";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class ServiceConfig extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
    const data = this.props.data;
    return (
      <div>
        <Title text="业务功能" />
        <div className="view-content">
          <Form onSubmit={this.props.handleSubmit}>
            <FormItem {...formItemLayout} label="扫一扫">
              {getFieldDecorator("scanFlag", {
                initialValue: data.scanFlag ,
                rules: [
                  {
                    required: true,
                    message: "请输入应用名称!"
                  }
                ]
              })(
                <RadioGroup  className="myGroupRadio">
                  <RadioButton value={1}>启用</RadioButton>
                  <RadioButton value={0}>停用</RadioButton>

                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="短信注册">
              {getFieldDecorator("smsRegisterFlag", {
                initialValue: data.smsRegisterFlag,
                rules: [
                  {
                    required: true,
                    message: "请输入应用名称!"
                  }
                ]
              })(
                <RadioGroup  className="myGroupRadio">
                  <RadioButton value={1}>启用</RadioButton>
                  <RadioButton value={0}>停用</RadioButton>

                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="邮箱注册">
              {getFieldDecorator("emailRegisterFlag", {
                initialValue: data.emailRegisterFlag ,
                rules: [
                  {
                    required: true,
                    message: "请输入应用名称!"
                  }
                ]
              })(
                <RadioGroup className="myGroupRadio">
                  <RadioButton value={1}>启用</RadioButton>
                  <RadioButton value={0}>停用</RadioButton>

                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label=" ">
              {getFieldDecorator("save")(
                <Button type="primary" onClick={this.props.saveService} htmlType="submit">保存</Button>
              )}
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
const propTypes = {};
ServiceConfig.propTypes = propTypes;
ServiceConfig = Form.create({})(ServiceConfig);
export default ServiceConfig;
