import React, { Component, PropTypes } from "react";
import { Form, Tag, Button, Input } from "antd";
import { Title } from "../../../../components";

const FormItem = Form.Item;
class XiaoFang extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.id != this.props.data.id) {
      this.props.form.setFieldsValue({
        xiaoOuKey: nextProps.data.xiaoOuKey,
        xiaoFangKey: nextProps.data.xiaoFangKey
      });
    }
  }
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
    return (
      <div>
        <Title text="设备授权协议" />
        <div className="view-content">
          <Form onSubmit={this.props.handleSubmit}>
            <FormItem {...formItemLayout} label="小方Key">
              {getFieldDecorator("xiaoFangKey", {
                initialValue: this.props.data.xiaoFangKey,
                rules: [
                  {
                    message: "请输入小方Key!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="小欧Key">
              {getFieldDecorator("xiaoOuKey", {
                initialValue: this.props.data.xiaoOuKey,
                rules: [
                  {
                    message: "请输入小欧Key!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>

            <FormItem {...formItemLayout} label=" ">
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
const propTypes = {};
XiaoFang.propTypes = propTypes;
XiaoFang = Form.create({})(XiaoFang);
export default XiaoFang;
