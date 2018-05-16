import React, { Component, PropTypes } from "react";
import { Form, Tag, Button, Input, Select, InputNumber } from "antd";

// import { TwitterPicker  } from 'react-color';
import { Title } from "../../../../components";

const Option = Select.Option;
const FormItem = Form.Item;
class BasicInfo extends Component {
  onChange = value => {
    if (!value.includes("zh") || !value.includes("en")) {
      setTimeout(() => {
        this.props.form.setFields({
          languageCodeList: {
            value: [...value, "zh", "en"]
          }
        });
      }, 1);
    }
  };

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
    const largeFormItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 20
      }
    };
    const {
      name,
      manufactureName,
      appCode,
      languageCodeList,
      version
    } = this.props.data;
    const list = this.props.languageList || [];

    const children = list.map(item => {
      return <Option key={item.code}>{item.name}</Option>;
    });

    return (
      <div>
        <Title text="基础信息" />
        <div className="view-content">
          <Form onSubmit={this.props.handleSubmit}>
            <FormItem {...formItemLayout} label="应用名称">
              {getFieldDecorator("name", {
                initialValue: name,
                rules: [
                  {
                    required: true,
                    message: "请输入应用名称!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="所属厂商">
              {getFieldDecorator("manufactureName")(
                <span>{manufactureName}</span>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="Source ID">
              {getFieldDecorator("appCode")(<span>{appCode}</span>)}
            </FormItem>

            <FormItem {...formItemLayout} label="语言">
              {getFieldDecorator("languageCodeList", {
                initialValue: languageCodeList || [],
                rules: [
                  {
                    required: true,
                    message: "请添加语言"
                  }
                ]
              })(
                <Select
                  mode="multiple"
                  multiple
                  placeholder="请选择语言"
                  style={{
                    width: 280
                  }}
                  onChange={this.onChange}
                >
                  {children}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="版本号">
              {getFieldDecorator("version", {
                initialValue: version,
                rules: [
                  {
                    required: true,
                    message: "版本号,必须为数字",
                    pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,

                  }
                ]
              })(
                <InputNumber
                 min={0} max={2147483647} step={1}
                  style={{
                    height: 40,
                    width: 280
                  }}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label=" ">
              {getFieldDecorator("save")(
                <Button type="primary" htmlType="submit">保存</Button>
              )}
            </FormItem>
          </Form>
        </div>

      </div>
    );
  }
}
const propTypes = {};

BasicInfo.propTypes = propTypes;
BasicInfo = Form.create({})(BasicInfo);
export default BasicInfo;
