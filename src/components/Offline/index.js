import React, { PureComponent } from 'react';
import { Radio, Button, Input, Form } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class Offline extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      selectedValue: 1,
    }
  }
  componentDidMount() {}
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.offOrOnline(values);
        console.log('Received values of form: ', values);
      }
    });
  }
  onChange(e) {
    const value = e.target.value;
    this.setState({
      selectedValue: value,
    })

  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const {getFieldDecorator} = this.props.form;
    return (<div>
          <Form onSubmit={this.handleSubmit} >
        <FormItem>
          {getFieldDecorator('offlineReasonId', {
        initialValue: 1,
      })(
        <RadioGroup onChange = {this.onChange} >
        <Radio style={radioStyle} value={1}>厂商违规</Radio>
        <Radio style={radioStyle} value={2}>不再合作</Radio>
        <Radio style={radioStyle} value={3}>厂商倒闭</Radio>
        <Radio style={radioStyle} value={4}> 其他原因</Radio>
      </RadioGroup>
      )}
          </FormItem>
          {
      (() => {
        if (this.state.selectedValue == 4) {
          return (
            <FormItem>
     {getFieldDecorator('offlineOtherReason', {
              rules: [{
                required: true,
                message: '请填写下线原因!',
              }],
            })(<Input type="textarea" rows={2} />)}

       </FormItem>
            )
        }
      })()
      }

       <FormItem>
      <Button type="primary" className="fl" htmlType="submit" size="large">保存</Button>
      <Button type="ghost" className="fr" onClick={this.props.onCancel} size="large">取消</Button>
       </FormItem>
       </Form>
      </div>)
  }
}
Offline = Form.create({})(Offline);
export default Offline;
