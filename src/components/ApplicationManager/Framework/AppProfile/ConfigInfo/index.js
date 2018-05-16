import React, { Component, PropTypes } from "react";
import {
  Form,
  Button,
  Popconfirm,
  Input,
  Radio,
  Row,
  Col,
  message,
  Upload,
  Icon
} from "antd";
import domain from "../../../../../actions/domain";

const FormItem = Form.Item;
function beforeUpload(file) {
  const name = file.name;
  const reg = new RegExp("(png)$", "i");
  const isFile = reg.test(name);
  if (!reg.test(name)) {
    message.error("上传图片必须以png结尾");
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error("图片不能超过 10MB");
  }
  const nameReg = /[^\u0000-\u00FF]/;
  const isSuccessName = !nameReg.test(name);
  if (nameReg.test(name)) {
    message.error("上传文件名不能有中文字符");
  }
  return isLt10M && isFile && isSuccessName;
}
class ConfigInfo extends Component {
  constructor(context, props) {
    super(context, props);
    this.state = {
      zjIcon: this.props.data.iconUrl
        ? [
            {
              uid: -1,
              name:
                this.props.data.iconUrl &&
                  this.props.data.iconUrl.substring(
                    this.props.data.iconUrl.lastIndexOf("/") + 1,
                    this.props.data.iconUrl.length
                  ),
              status: "done",
              url: this.props.data.iconUrl
            }
          ]
        : []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.id != this.props.data.id) {
      const zjIcon = nextProps.data.iconUrl
        ? [
            {
              uid: -1,
              name:
                nextProps.data.iconUrl &&
                  nextProps.data.iconUrl.substring(
                    nextProps.data.iconUrl.lastIndexOf("/") + 1,
                    nextProps.data.iconUrl.length
                  ),
              status: "done",
              url: nextProps.data.iconUrl
            }
          ]
        : [];
      this.props.form.setFieldsValue({
        link: nextProps.data.url
      });
      this.setState({
        zjIcon
      });
    }
  }
  zjIconChange = ({ fileList }) => {
    this.setState({
      zjIcon: fileList
    });
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
    const data = this.props.data;

    const compLanguage = data.nameLangVOList.map(item => {
      return (
        <FormItem {...formItemLayout} label={item.languageName}>
          {getFieldDecorator(`${item.id}`, {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: `请输入${item.languageName}`
              }
            ]
          })(<Input type="text" onChange={this.visibleEdit} />)}
        </FormItem>
      );
    });
    return (
      <div>

        <Form onSubmit={this.props.handleSubmit}>
          <FormItem {...formItemLayout} label="图标">
            {getFieldDecorator("iconFileName", {
              initialValue: this.state.zjIcon,
              rules: [
                {
                  required: true,
                  message: "请上传图标"
                }
              ]
            })(
              <Upload
                style={{
                  padding: 0,
                  margin: 0
                }}
                name="multipartFile"
                withCredentials
                action={`${domain}/applications/v1/${this.props
                  .appId}/groups/members/iconfile/`}
                listType="picture-card"
                fileList={this.state.zjIcon}
                onChange={this.zjIconChange}
                beforeUpload={beforeUpload}
              >
                {this.state.zjIcon.length >= 1
                  ? null
                  : <div className="ant-upload-icon">
                      <Icon type="plus" />
                      <div className="ant-upload-text">上传</div>
                    </div>}
              </Upload>
            )}

          </FormItem>
          <FormItem {...formItemLayout} label="跳转链接">
            {getFieldDecorator("link", {
              initialValue: data.url,
              rules: [
                {
                  required: true,
                  message: "请输入跳转链接"
                }
              ]
            })(<Input type="text" onChange={this.visibleEdit} />)}
          </FormItem>
          {compLanguage}
          <FormItem {...formItemLayout} label=" ">
            <Button className="mt10" type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}
const propTypes = {};
ConfigInfo.propTypes = propTypes;
ConfigInfo = Form.create({})(ConfigInfo);
export default ConfigInfo;
