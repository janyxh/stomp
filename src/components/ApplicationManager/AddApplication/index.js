import React, { PureComponent, Component, PropTypes } from "react";
import { Form, Input, Select, Button, InputNumber } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

class AddApplication extends Component {
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
  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
  }
  state = {
    languageList: this.props.languageList
    //checkedLanguage: ["1"]
  };
  // 默认选中中文

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 6
      }
    };
    const bigformItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 18
      }
    };

    const children = this.props.languageList.map(item => {
      return <Option key={item.code}>{item.name}</Option>;
    });
    const compOptions = this.props.list.map(item => {
      return <Option key={item.id}>{item.name}</Option>;
    });

    return (
      <div>
        <Form onSubmit={this.props.handleSubmit}>
          <FormItem {...formItemLayout} label="应用名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "应用名称,最多40个字",
                  max: 40
                }
              ]
            })(
              <Input
                type="text"
                style={{
                  width: 280
                }}
              />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="厂商">
            {getFieldDecorator("manufactureId", {
              rules: [
                {
                  required: true,
                  message: "请选择厂商"
                }
              ]
            })(
              <Select
                showSearch
                style={{
                  width: 280
                }}
                placeholder="选择厂商"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
              >
                {compOptions}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="语言">

            {getFieldDecorator("languageCodeList", {
              initialValue: ["zh", "en"],
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
              initialValue: "24000300",
              rules: [
                {
                  required: true,
                  message: "版本号,必须为数字",
                  pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                  max: "10"
                }
              ]
            })(
              <InputNumber
                min={0}
                max={2147483647}
                step={1}
                style={{
                  height: 40,
                  width: 280
                }}
                defaultValue="24000300"
              />
            )}
          </FormItem>
          <FormItem {...bigformItemLayout} label=" ">
            <span className="mr30">
              <Button
                type="primary"
                //disabled={hasErrors(getFieldsError())}
                htmlType="submit"
              >
                保存
              </Button>
            </span>
            <Button type="ghost" onClick={this.props.handleCancel}>取消</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const propTypes = {};
AddApplication.propTypes = propTypes;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const onFieldsChange = (props, values) => {
  //console.log(that.props.form.validateFields())
  //console.log(that.props.form.getFieldsValue());
  //props.changeBtn(true);
  // console.log(props, values);
};
const mapPropsToFields = (props, values) => {
  //console.log("mapPropsToFields");
};
AddApplication = Form.create(
  {
    // mapPropsToFields,
    // onFieldsChange
  }
)(AddApplication);
export default AddApplication;
