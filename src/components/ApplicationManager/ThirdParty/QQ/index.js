import React, { Component, PropTypes } from "react";
import { Form, Tag, Button, Input } from "antd";
import { Title } from "../../../../components";

const FormItem = Form.Item;
class QQ extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.id != this.props.data.id) {
      this.props.form.setFieldsValue({
        appId: nextProps.data.appId,
        appSecret: nextProps.data.appSecret
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
        <Title text="关联QQ登录" />
        <div className="view-content">
          <Form onSubmit={this.props.handleSubmit}>
            <FormItem {...formItemLayout} label="APP ID">
              {getFieldDecorator("appId", {
                initialValue: this.props.data.appId,
                rules: [
                  {
                    message: "请输入APP ID!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            {this.props.type == "Android"
              ? <FormItem {...formItemLayout} label="APP Secret">
                  {getFieldDecorator("appSecret", {
                    initialValue: this.props.data.appSecret,
                    rules: [
                      {
                        message: "请输入APP Secret!"
                      }
                    ]
                  })(<Input type="text" />)}
                </FormItem>
              : null}

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
QQ.propTypes = propTypes;
QQ = Form.create({})(QQ);
export default QQ;
