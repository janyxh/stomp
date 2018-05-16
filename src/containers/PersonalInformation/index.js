import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upUserPassword, sendPhoneCode, verfiyPhoneCode, sendEmailCode, verfiyEmailCode } from '../../actions/user';
import { load } from '../../actions/auth';
import { Form, Input, Select, Modal, Button, message } from 'antd';
import md5 from 'md5';
import { Title, VerifyCode } from '../../components';

const FormItem = Form.Item;
const Option = Select.Option;

class PersonalInformation extends PureComponent {

  constructor(context, props) {
    super(context, props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.checkRepassword = this.checkRepassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.editSucess = this.editSucess.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      passwordDirty: false,
      visible: false,
      isEmail: false,
      
      newRandomKey: +new Date(),
    };
  }
  componentDidMount() {
    // this.get();
  }
  getData() {
    this.props.actions.load();
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          oldPassword: md5(values.password).toUpperCase(),
          password: md5(values.newPassword).toUpperCase(),
          id: this.props.auth.currUser.id,
        };
        upUserPassword(data).then((res) => {
          if (res.code == "000000") {
            message.success('更新成功');
            this.getData();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({
      passwordDirty: this.state.passwordDirty || !!value,
    });
  }

  checkRepassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码必须一致!');
    } else {
      callback();
    }
  }
  showModal(value) {
    this.setState({
      visible: true,
      newRandomKey: +new Date(),
      isEmail: value
    });
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['rePassword'], {
        force: true,
      });
    }
    const passwordReg = /^[^\s]{6,20}$/;
    if (!passwordReg.test(value)) {
      callback('请输入6~16个字符，支持所有字符，字母区分大小写');
    }
    callback();
  }
  handleOk() {
    this.setState({
      visible: false,
    });
  }
  handleCancel(e) {
    //this.refs.VerifyCode.clear()
    this.setState({
      visible: false,
    });
  }

  editSucess(data) {
    if (!this.state.isEmail) {
      verfiyPhoneCode(data).then((res) => {
        if (res.code == "000000") {
          this.getData();
          this.handleCancel();
        } else {

          this.refs.VerifyCode.setFields({
            smsCode: {
              errors: [new Error(res.message)],
            },
          })

        }
      });
    } else {
      // 参数能不能一样。。。。
      data.emailCode = data.smsCode;
      verfiyEmailCode(data).then((res) => {
        if (res.code == "000000") {
          this.getData();
          this.handleCancel();
        } else {
        
          this.refs.VerifyCode.setFields({
            smsCode: {
              errors: [new Error(res.message)],
            },
          })
        }
      })
    }

  }
  sendCode(data) {
    if (this.state.isEmail) {
      const sendData = {
        email: data,
      };
      return sendEmailCode(sendData);
    }
    const sendData = {
      mobile: data,
    };
    return sendPhoneCode(sendData);
  }
  render() {

    const {name, mobile, email} = this.props.auth.currUser;
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };

    return (
      <div>
             <Modal
      key={this.state.newRandomKey}
      title={`修改${this.state.isEmail ? "邮箱" : "手机号"}`}
      visible={this.state.visible}
      onCancel={this.handleCancel}
      footer=""
      >
      <VerifyCode
      ref="VerifyCode"
      isEmail = {this.state.isEmail}
      callback={this.editSucess}
      sendCode = {this.sendCode}
      />
        </Modal>
      <Title text="个人信息" />
      <div className="view-content">
      <Form >
              <FormItem
      {...formItemLayout}
      label="用户名"

      >
          {getFieldDecorator('name')(

        <span>{name}</span>
      )}
        </FormItem>


        <FormItem
      {...formItemLayout}
      label="手机号"
      >
          {getFieldDecorator('mobile')(
        <div>
      <span>
        {mobile}
        </span>
        <span className="edit-a" onClick={this.showModal.bind(null, false)}>
        修改
        </span>
        </div>

      )}
        </FormItem>
             <FormItem
      {...formItemLayout}
      label="联系邮箱"
      >
          {getFieldDecorator('email')(
        <div>
      <span>
       {email}
        </span>
        <span className="edit-a" onClick={this.showModal.bind(null, true)}>
        修改
        </span>
        </div>
      )}
        </FormItem>




        </Form>
        </div>
 <Title text="密码设置" />
      <div className="view-content">
      <Form onSubmit={this.handleSubmit} >
        <FormItem
      {...formItemLayout}
      label="原密码"

      >
          {getFieldDecorator('password', {
        rules: [
          {
            required: true,
            message: '请输入原密码',
          }],
      })(
        <Input type="password" placeholder="请输入原密码" />
      )}

        </FormItem>
        <FormItem
      {...formItemLayout}
      label="新密码"

      >
          {getFieldDecorator('newPassword', {
        rules: [
          {
            required: true,
            message: '请输入新密码',
          }, {
            validator: this.checkConfirm,
          },
        ],

      })(

        <Input type="password"  placeholder="请输入新密码"  />

      )}

        </FormItem>
     
                <FormItem
      {...formItemLayout}
      label="确认新密码"

      >
          {getFieldDecorator('rePassword', {

        rules: [
          {
            required: true,
            message: '确认新密码',
          },
          {
            validator: this.checkRepassword,
          }
        ],

      }
      )(
        <Input type="password" onBlur={this.handlePasswordBlur}  placeholder="确认新密码" />
      )}

        </FormItem>
             <FormItem {...formItemLayout}  label=" "
      >
      <span className ="mr60">
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </span>
        {


        // <Button type="ghost"   onClick={this.goBack} size="large">取消</Button>
      }
        
        </FormItem>
      </Form>
         
      </div>
      </div>
      );

  }
}
PersonalInformation.contextTypes = {
  router: React.PropTypes.object,
};
PersonalInformation = Form.create({})(PersonalInformation);
function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      load,
    }, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformation);
