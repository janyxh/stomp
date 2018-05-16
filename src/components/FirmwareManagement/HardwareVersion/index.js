import React, { PureComponent } from 'react';
import { Form, Button, Input } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
class HardwareVersion extends PureComponent {
  constructor(context, props) {

    super(context, props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkhardwareVersion = this.checkhardwareVersion.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
      }
    });
  }
  checkhardwareVersion(rule, value, callback) {
    const list = this.props.list;

    if (list.includes(value)) {
      callback('版本号已存在!');
    } else {
      callback();
    }
  }
  componentDidMount() {}

  render() {
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 10
      },
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
          <Form onSubmit={this.handleSubmit}>
              <FormItem
      {...formItemLayout}
      label="固件版本"
      >
          {getFieldDecorator('hardwareVersion', {
        rules: [
          {
            required: true,
            message: '请输入硬件版本号',
          },
          {
            validator: this.checkhardwareVersion,
          }

        ],
      })(
        <Input style={{
          width: 248
        }} type="text" placeholder="硬件版本号"  />

      )}
        </FormItem>
        </Form>
      </div>
      );
  }
}
HardwareVersion = Form.create({})(HardwareVersion);
export default HardwareVersion;