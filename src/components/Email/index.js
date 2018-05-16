import React, { PureComponent } from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;
class Email extends PureComponent {

  constructor(context, props) {
    super(context, props);
    this.onNext = this.onNext.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendCode = this.sendCode.bind(this);


    this.data = null;
    this.state = {
      seconde: false,
      time: 59,
      disabled: true,
      text: '60秒后重发送',
    };
  }

  componentDidMount() {}

  onNext() {
    // 校验邮箱

  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!this.state.seconde) {
        if (!err) {
          const email = values.email;
          this.setState({
            seconde: true,
            disabled: true,
          })
          this.startInterval()
        }
      // 提交数据
      } else {
        if (!err.code) {
          console.log('提交数据')
        }
      }
    });
  }
  startInterval() {
    const id = setInterval(() => {
      if (this.state.time <= 0) {
        clearInterval(id);
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
    this.startInterval()
  }
  render() {

    const {   getFieldDecorator} = this.props.form;
    let comp = (

    <div className="stom-modal">
       <div className="stom-modal-title">请输入要绑定的邮箱</div>
       <div>
             <Form onSubmit={this.handleSubmit} >
        <FormItem>
          {getFieldDecorator('email', {
      rules: [{
        type: 'email',
        required: true,
        message: '请输入正确邮箱地址!'
      }

      ],
    })(
      <Input  style={{
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
       <div className="stom-modal-title"> 验证码已发送以下邮箱，请注意查收 <br />
 {this.props.email}</div>
   <Form onSubmit={this.handleSubmit} >
        <FormItem>
                  {getFieldDecorator('code', {
        rules: [{
          required: true,
          message: '请输入验证码!'
        }

        ],
      })(
        <div>
                <Input type="code" style={{
          height: 40,
          width: 170,
          display: "inline-block"
        }}  />
      <button className={this.state.disabled ? "btn btn-disabled ml30 " : "btn btn-primary ml30"} disabled={this.state.disabled} onClick={this.sendCode} >{this.state.text}</button>
      </div>
      )}

        </FormItem>
          <FormItem>
            <div className="db mt30">
            <button className="btn btn-primary"  htmlType="submit"  >保存</button>
            </div>
            </FormItem>
            </Form>
      </div>

      );
  }
}
Email = Form.create({})(Email);
export default Email;
