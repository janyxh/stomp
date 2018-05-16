import React, { Component } from 'react';
import { Link } from 'react-router';
import { Input, Select, Form, Button } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
class VerifyCode extends Component {

  constructor(context, props) {

    super(context, props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendCode = this.sendCode.bind(this)
    this.clear = this.clear.bind(this)


    this.data = null;
    this.id = null;
    this.state = {
      seconde: false,
      time: 59,
      disabled: true,
      text: "60秒后重发送"
    }
  }

  componentDidMount() {}

  clear() {
    if (this.id) {
      clearInterval(this.id)
      this.props.form.resetFields();
      this.setState({
        seconde: false,
        time: 59,
        disabled: true,
        text: "60秒后重发送",
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!this.state.seconde) {
        if (!err) {
          const data = values.data;

          this.props.sendCode(data).then((res) => {
            if (res.code == "000000") {
              this.startInterval()
              this.setState({
                seconde: true,
                disabled: true,
                data: data,
              });
            } else {
              this.props.form.setFields({
                data: {
                  errors: [new Error(res.message)],
                },
              });
            }
          });

        }
      // 提交数据
      } else {
        if (!err.smsCode) {
          
          values.data = this.state.data;
          this.props.callback(values);
        }
      }
    });
  }
  startInterval() {
    this.id = setInterval(() => {
      if (this.state.time <= 0) {
        clearInterval(this.id);
        this.setState({
          text: "重新发送",
          disabled: false,
          time: 59,
        })
        return;
      }
      const count = this.state.time--;
      this.setState({
        disabled: true,
        text: `${count}秒后重发送`
      })


    }, 1000)
  }
  sendCode() {
    this.startInterval();
    this.props.sendCode(this.state.data);
  }
  render() {

    const {getFieldDecorator, getFieldValue} = this.props.form;

    const name = this.props.isEmail ? '邮箱' : '电话'
    let comp = (

    <div className="stom-modal">
       <div className="stom-modal-title"> {`请输入要绑定的${name}`}</div>
       <div>
             <Form onSubmit={this.handleSubmit} >
        <FormItem>
          {getFieldDecorator('data', {
      rules: [{
        type: this.props.isEmail ? 'email' : 'string',
        required: true,
        message: this.props.isEmail ? '请输入正确邮箱地址' : '请输入正确电话号码',
      }

      ],
    })(
      <Input placeholder= {this.props.isEmail ? "邮箱" : "手机"}  style={{
        height: 40,
        width: 308,
        display: "inline-block"
      }}
      />
    )}
        </FormItem>
         <FormItem>
       <button className="btn btn-primary" htmlType="submit"  onClick={this.onNext} >下一步</button>
            </FormItem>
           </Form>
       </div>
          
          
      </div>)
    if (!this.state.seconde) {
      return comp;
    }
    return (
      <div className="stom-modal">
       <div className="stom-modal-title"> {`验证码已发送以下${name}，请注意查收` }<br />
    {this.state.data}</div>
   <Form onSubmit={this.handleSubmit} >
        <FormItem>
                  {getFieldDecorator('smsCode', {
        rules: [{
          required: true,
          message: '请输入正确的验证码!'
        }

        ],
      })(
        <div>
                <Input
        placeholder="请输入验证码"
        style={{
          height: 40,
          width: 170,
          display: "inline-block"
        }}  />
      <Button className="login-form-button ml30"  disabled={this.state.disabled} onClick={this.sendCode} >{this.state.text}</Button>
      </div>
      )}

        </FormItem>
          <FormItem>
            <div className="db">
            <button className="btn btn-primary"  htmlType="submit"  >保存</button>
            </div>
            </FormItem>
            </Form>
      </div>

      );
  }
}
VerifyCode = Form.create({})(VerifyCode);
export default VerifyCode;