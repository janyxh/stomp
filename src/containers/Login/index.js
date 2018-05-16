import React, { PureComponent } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Select,
  Button,
  Icon,
  Checkbox,
  Row,
  Col,
  Spin
} from "antd";
import logo from "./logo-big.png";
import { login, load } from "../../actions/auth";
import { Code } from "../../components";
import md5 from "md5";
const FormItem = Form.Item;
const Option = Select.Option;
const urlMap = {
  "01000001000000": "/Content/home",
  "02010001010000": "/Content/DeviceAnalysis",
  "02020001020000": "/Content/UserAnalysis",
  "03000001000000": "/Content/VendorManagement",
  "04000001000000": "/Content/ProductManagement",
  "05010001010000": "/Content/FirmwareUpgrade",
  "05020001020000": "/Content/FirmwareManagement",
  "05020001030000": "/Content/UpgradeLogs",
  "06010001010000": "/Content/AccountManagement",
  "06020001020000": "/Content/RoleManagement",
  "07010001010000": "/Content/PersonalInformation",
  "07020001020000": "/Content/CorporateInformation"
};
class Login extends PureComponent {
  constructor(context, props) {
    super(context, props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: false,
      errorInfo: null
    };
  }
  componentDidMount() {}
  getUrl(data) {
    const list = data;
    let result;
    for (var key in list) {
      if (
        urlMap[list[key].number] != null ||
        urlMap[list[key].number] != undefined
      ) {
        result = urlMap[list[key].number];
        break;
      }
    }
    return result;
  }
  handleSubmit(e) {
    e.preventDefault();
    const router = this.context.router;
    router.push(url);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          name: values.userName.trim(),
          pwd: md5(values.password.trim()).toUpperCase(),
          verifyCode: values.code
        };
        this.setState({
          loading: true
        });
        this.props.actions
          .login(data)
          .then(res => {
            if (res.code == "000000") {
              this.props.actions.load().then(o => {
                const router = this.context.router;
                // 判断路由权限
                const url = this.getUrl(res.data.authorityVOList);
                router.push(url);
              });
            } else {
              this.refs.code.onClick();
              this.setState({
                loading: false
              });
              if (res.code == "010001" || res.code == "010011") {
                this.props.form.setFields({
                  code: {
                    errors: [new Error(res.message)]
                  }
                });
                this.setState({
                  errorInfo: null
                });
              }
              if (res.code == "020027" || res.code == "020029") {
                this.setState({
                  errorInfo: res.message
                });
              }
            }
          })
          .catch(err => {});
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.state.loading} tip="Loading...">
        <div className="login-root">
          <div className="tc">
            <img src={logo} alt="" />
          </div>
          <div>
            <div className="error-message">
              {this.state.errorInfo}
            </div>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator("userName", {
                  rules: [
                    {
                      required: true,
                      message: "请输入用户名!"
                    }
                  ]
                })(
                  <Input
                    style={{
                      width: '100%',
                      height: 40
                    }}
                    addonBefore={<Icon type="user" />}
                    placeholder="用户名"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "请输入密码!"
                    }
                  ]
                })(
                  <Input
                    style={{
                      width: '100%',
                      height: 40
                    }}
                    addonBefore={<Icon type="lock" />}
                    type="password"
                    placeholder="密码"
                  />
                )}
              </FormItem>
              <FormItem>
                <Row gutter={20}>
                  <Col span={16}>
                    {getFieldDecorator("code", {
                      rules: [
                        {
                          required: true,
                          message: "请输入验证码!"
                        }
                      ]
                    })(
                      <Input
                        type="text"
                        style={{
                          width: 260,
                          height: 40
                        }}
                        placeholder="验证码"
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <div className="code">
                      <Code ref="code" />
                    </div>
                  </Col>
                </Row>

              </FormItem>
              <FormItem>

                <Button
                  style={{
                    width: "100%"
                  }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
          <div className="tc">
            <Link to="/ForgetPassword">忘记密码</Link>
          </div>
        </div>
      </Spin>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        login,
        load
      },
      dispatch
    )
  };
}
Login = Form.create({})(Login);
export default connect(null, mapDispatchToProps)(Login);
