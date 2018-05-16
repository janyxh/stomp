import React, { Component, PropTypes } from "react";
import { Form, Input, Icon, Button, Upload, Col, message } from "antd";
import { Title } from "../../../../components";
import domain from "../../../../actions/domain";
import languageIcon from "./language.svg";

const FormItem = Form.Item;

function beforeUpload(file) {
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error(" 附件大小必须小于 10MB!");
  }
  const name = file.name;
  const reg = new RegExp("(html)$", "i");
  const isFile = reg.test(name);
  if (!reg.test(name)) {
    message.error("上传文件必须以html结尾");
  }

  return isLt10M && isFile;
}
class LanguageConfig extends Component {
  constructor(context, props) {
    super(context, props);

    this.state = {
      data: this.props.applicationLanguages.appLanguageVOList.map(item => {
        const obj = {};
        if (item.agreementUrl) {
          obj.show = false;
          obj.fileList = [
            {
              uid: -1,
              name: item.agreementUrl.slice(
                item.agreementUrl.lastIndexOf("/") + 1,
                item.agreementUrl.length
              ),
              url: item.agreementUrl,
              status: "done"
            }
          ];
        } else {
          obj.show = true;
          obj.fileList = [];
        }
        if (item.historyUrl) {
          obj.display = false;
          obj.logUrlList = [
            {
              uid: -1,
              name: item.historyUrl.slice(
                item.historyUrl.lastIndexOf("/") + 1,
                item.historyUrl.length
              ),
              url: item.historyUrl,
              status: "done"
            }
          ];
        } else {
          obj.display = true;
          obj.logUrlList = [];
        }
        return obj;
      })
    };
    const that = this;
    this.uploadLogProps = {
      name: "multipartFile",

      action: `${domain}/applications/v1/${that.props.id}/loggers/`,
      withCredentials: true,
      beforeUpload: beforeUpload
    };
    this.uploadProps = {
      name: "multipartFile",
      onRemove(e) {
        // let id = e.uid;
        // if (e.response) {
        //   id = e.response.data[0];
        // }
      },
      action: `${domain}/applications/v1/${that.props.id}/agreement/`,
      withCredentials: true,
      beforeUpload: beforeUpload
    };
  }
  handleChange = (info, type, num) => {
    if (info.file.status !== "uploading") {
      if (info.file.status == "removed") {
        const list = this.state.data.map((item, index) => {
          if (index == num) {
            if (type == "agreement") {
              item.show = true;
              item.fileList = [];
            } else {
              item.display = true;
              item.logUrlList = [];
            }
          }
          return item;
        });

        this.setState({
          data: list
        });
        // that.props.removeFileList(info.file.uid);
      } else {
        //const fileId = info.file.response.data[0];
        // this.setState((state, props) => defaultFileList:[]);
        // that.props.addFileList(fileId);
      }
    }

    if (info.file.status == "uploading") {
      const list = this.state.data.map((item, index) => {
        if (index == num) {
          if (type == "agreement") {
            item.show = false;
            item.fileList = info.fileList;
          } else {
            item.display = false;
            item.logUrlList = info.fileList;
          }
        }

        return item;
      });
      this.setState({
        disabled: true,
        data: list
      });
    }
    if (info.file.status === "done") {
      this.setState({
        disabled: false
      });
      const list = this.state.data.map((item, index) => {
        if (index == num) {
          if (type == "agreement") {
            item.show = false;
            item.fileList[0] = {};
            item.fileList[0].name = info.file.response.data.fileName;
            item.fileList[0].url = info.file.response.data.url;
            item.fileList[0].uid = -1;
            item.fileList[0].status = "done";
          } else {
            item.logUrlList[0] = {};
            item.logUrlList[0].name = info.file.response.data.fileName;
            item.logUrlList[0].url = info.file.response.data.url;
            item.logUrlList[0].uid = -1;
            item.logUrlList[0].status = "done";
            item.display = false;
          }
        }

        return item;
      });
      this.setState({
        data: list
      });
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 上传失败`);
    }
    //this.setState({ info });
  };
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data.id != this.props.data.id) {
  //     this.setState({
  //       value: nextProps.data.name
  //     });
  //   }
  // }
  render() {
    const { getFieldDecorator } = this.props.form;

    const applicationLanguages = this.props.applicationLanguages;
    const list = applicationLanguages.appLanguageVOList;

    if (list.length <= 0) {
      return null;
    }
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };

    const childern = list.map((item, index) => {
      return (
        <Col>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <img
                  style={{ position: "relative", top: 12 }}
                  src={languageIcon}
                  width="30"
                />
                &nbsp;
                {item.languageName}

              </span>
            }
          >
            {getFieldDecorator("languageName")}
          </FormItem>
          <FormItem {...formItemLayout} label="APP名称">
            {getFieldDecorator(`appName#${item.id}`, {
              initialValue: item.appName || "",
              rules: [
                {
                  required: true,
                  message: "请输入APP名称!"
                }
              ]
            })(<Input type="text" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="厂商名称">
            {getFieldDecorator(`manufactureName#${item.id}`, {
              initialValue: item.manufactureName,
              rules: [
                {
                  required: true,
                  message: "请输入厂商名称!"
                }
              ]
            })(<Input type="text" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="更新日志">
            {getFieldDecorator(`historyUrl#${item.id}`, {
              initialValue: this.state.data[index].logUrlList,
              rules: [
                {
                  required: false
                  //message: "请上传更新日志"
                }
              ]
            })(
              <Upload
                fileList={this.state.data[index].logUrlList}
                onChange={info => {
                  this.handleChange(info, "log", index);
                }}
                {...this.uploadLogProps}
                type="log"
                index={index}
                disabled={this.state.disabled}
              >
                {this.state.data[index].display &&
                  <a title="只能上传一份更新日志"> <Icon type="upload" />上传</a>}

              </Upload>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="用户协议">
            {getFieldDecorator(`agreementUrl#${item.id}`, {
              initialValue: this.state.data[index].fileList,
              rules: [
                {
                  required: true,
                  message: "请上传用户协议"
                }
              ]
            })(
              <Upload
                {...this.uploadProps}
                fileList={this.state.data[index].fileList}
                onChange={info => {
                  this.handleChange(info, "agreement", index);
                }}
                type="agreement"
                index={index}
                disabled={this.state.disabled}
              >
                {this.state.data[index].show &&
                  <a title="只能上传一份用户协议"> <Icon type="upload" />上传</a>}

              </Upload>
            )}
          </FormItem>
        </Col>
      );
    });

    return (
      <div>
        <Title text="APP多语言配置" />
        <div className="view-content">
          <Form onSubmit={this.props.handleSubmit}>
            {childern}
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
LanguageConfig.propTypes = propTypes;
LanguageConfig = Form.create({})(LanguageConfig);
export default LanguageConfig;
