import React, { PureComponent, PropTypes } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
  Upload,
  Icon,
  Col,
  Row,
  message
} from "antd";
import { Title } from "../../../../components";
import domain from "../../../../actions/domain";
const FormItem = Form.Item;

function beforeUpload(file) {
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error(" 附件大小必须小于 10MB!");
  }
  return isLt10M;
}
class OtherConfig extends PureComponent {
  constructor(context, props) {
    super(context, props);
    const that = this;
    this.state = {
      fileList: this.props.data.iosAuthFilename
        ? [
            {
              uid: -1,
              name: this.props.data.iosAuthFilename,
              status: "done"
            }
          ]
        : [],
      show: this.props.data.iosAuthFilename ? false : true
    };

    this.uploadProps = {
      name: "multipartFile",
      onRemove(e) {
        let id = e.uid;
        if (e.response) {
          id = e.response.data[0];
        }
      },
      action: `${domain}/applications/v1/${that.props.id}/iosauthfile/`,
      withCredentials: true,
      onChange(info) {
        console.log(info);
        if (info.file.status !== "uploading") {
          if (info.file.status == "removed") {
            that.setState((state, props) => ({
              fileList: [],
              show: true
            }));
            // that.props.removeFileList(info.file.uid);
          } else {
            const fileId = info.file.response.data[0];
            // this.setState((state, props) => defaultFileList:[]);
            // that.props.addFileList(fileId);
          }
        }
        if (info.file.status === "done") {
          that.setState({
            show: false
          });
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} 上传失败`);
        }
      }
      //beforeUpload: beforeUpload
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { mapKey, iosAuthFilename, iosSecretKey,appStoreKey } = this.props.data;

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
        <Title text="其他" />
        <div className="view-content">
          <Form onSubmit={this.props.handleSubmit}>
            <FormItem {...formItemLayout} label="高德地图Key">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("mapKey", {
                    initialValue: mapKey,
                    rules: [
                      {
                        // required: true,
                        message: "请输入高德地图Key!"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      className="ant-input-lg mr10"
                      style={{ width: 200 }}
                    />
                  )}
                </Col>
                <Col span={12}>
                  <span className="ml5">
                    ( 仅适用于Android系统 )
                  </span>

                </Col>
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="App Store评分key">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("appStoreKey", {
                    initialValue: appStoreKey,
                    rules: [
                      {
                        // required: true,
                        message: "请输入App Store评分key!"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      className="ant-input-lg mr10"
                      style={{ width: 200 }}
                    />
                  )}
                </Col>
                <Col span={12}>
                  <span className="ml5">
                    ( 仅适用于IOS系统 )
                  </span>

                </Col>
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="iOS消息通知证书">
              {getFieldDecorator("iosAuthFilename", {
                initialValue: this.state.fileList
              })(
                <Upload
                  defaultFileList={this.state.fileList}
                  {...this.uploadProps}

                >
                  {this.state.show &&
                    <a title="只能上传一份证书"> <Icon type="upload" />上传</a>}

                </Upload>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="证书密码">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("iosSecretKey", {
                    initialValue: iosSecretKey,
                    rules: [
                      {
                        // required: true,
                        message: "请输入证书密码!"
                      }
                    ]
                  })(
                    <Input
                      type="text"
                      className="ant-input-lg mr10"
                      style={{ width: 200 }}
                    />
                  )}
                </Col>
                <Col span={12}>
                  <span className="ml5">
                    ( 仅适用于IOS系统 )
                  </span>

                </Col>
              </Row>
            </FormItem>

            <FormItem {...formItemLayout} label=" ">
              {getFieldDecorator("save")(
                <Button type="primary" htmlType="submit">保存</Button>
              )}
            </FormItem>
          </Form>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
const propTypes = {};
OtherConfig.propTypes = propTypes;
OtherConfig = Form.create({})(OtherConfig);
export default OtherConfig;
