import React, { PureComponent, PropTypes } from "react";
import { Tree, Icon, Input, Upload, Modal, Button, Form, message, Col } from "antd";
import {
  getApplicationFeedBack,
  updateApplicationFeedBack
} from "../../../../../actions/application";
const FormItem = Form.Item;

class FeedBack extends PureComponent {
  state = {
    data: {
      nameLangVOList: []
    }
  };
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const id = this.getApplicationId();
    getApplicationFeedBack(id).then(res => {
      this.setState({
        data: res.data
      });
    });
  };
  getApplicationId = () => {
    const router = this.context.router;
    return router.params.id;
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          adviceUrl: values.adviceUrl,
          id: this.getApplicationId()
        };
        delete values.adviceUrl;
        // console.
        const nameLangVOJson = [];
        for (const v in values) {
          nameLangVOJson.push({
            id: v,
            name: values[v]
          });
        }
        data.nameLangVOJson = JSON.stringify(nameLangVOJson) ;
        updateApplicationFeedBack(data).then((res) => {
          if (res.code == "000000") {
             message.success('保存成功');
          this.getData();
          }else{
            alert(res.message)
          }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 8
      }
    };
    const data = this.state.data;
    // const compLanguage = data.nameLangVOList.map(item => {
    //   return (
    //     <FormItem {...formItemLayout} label={item.languageName}>
    //       {getFieldDecorator(item.id, {
    //         initialValue: item.name,
    //         rules: [
    //           {
    //             required: true,
    //             message: "请输入标题"
    //           }
    //         ]
    //       })(<Input />)}

    //     </FormItem>
    //   );
    // });
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="跳转链接">
            {getFieldDecorator("adviceUrl", {
              initialValue: data.url,
              rules: [
                {
                  //required: true,
                  message: "请输入跳转链接"
                }
              ]
            })(<Input />)}

          </FormItem>
          {

          //  compLanguage

          }

          <FormItem {...formItemLayout} label=" ">
            <Button type="primary" htmlType="submit" size="large">保存</Button>
          </FormItem>
        </Form>

      </div>
    );
  }
}
FeedBack.contextTypes = {
  router: React.PropTypes.object
};
const propTypes = {};
FeedBack.propTypes = propTypes;
FeedBack = Form.create({})(FeedBack);
export default FeedBack;
