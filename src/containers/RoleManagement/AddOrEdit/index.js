import React, { PureComponent } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as roleActions from "../../../actions/role";
import { getAllAuthority } from "../../../actions/";
import { Title } from "../../../components";
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class AddOrEdit extends PureComponent {
  constructor(context, props) {
    super(context, props);

    this.powerSubmit = this.powerSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      authorityList: [],
      render: true,
      role: {
        name: "",
        description: ""
      }
    };
  }
  componentDidMount() {
    this.init();
  }
  componentWillReceiveProps(nextProps) {}
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  powerSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 主页默认选中
        const list = this.createAuthorityList(values);
        const data = {
          name: values.name,
          description: values.description,
          authorityIds: list
        };
        this.doAction(data).then(res => {
          if (res.code == "000000") {
            this.props.form.resetFields();
            const router = this.context.router;
            router.push("/Content/RoleManagement/List");
          } else {
            alert(res.message);
          }
        });
      }
    });
  }

  createAuthorityList(values) {
    const list = [];
    const target = Object.values(values);
    target.map(item => {
      if (Array.isArray(item)) {
        list.push(...item);
      }
    });
    list.map(item => {
      if (item == "01000001000000") {
        if (!list.includes("01000001000000")) {
          list.push("01000001000000"); // 统计分析
        }
      }
      if (item == "02010001010000" || item == "02020001020000") {
        if (!list.includes("02000001000000")) {
          list.push("02000001000000"); // 统计分析
        }
      }
      if (item == "03000001010000") {
        if (!list.includes("03000001000000")) {
          list.push("03000001000000"); // 厂商管理
        }
      }
      if (item == "05010001010000" || item == "05020001020000") {
        if (!list.includes("05000001000000")) {
          list.push("05000001000000"); // 固件升级
        }
      }
      if (item == "08000001000000") {
        if (!list.includes("08000001000000")) {
          list.push("08000001000000"); // 产测查询
        }
      }
      if (item == "04000001010000") {
        if (!list.includes("04000001000000")) {
          list.push("04000001000000"); // 产品管理
        }
      }
      if (item == "06010001010100") {
        if (!list.includes("06010001010000")) {
          list.push("06010001010000"); // 账号管理
        }
        if (!list.includes("06000001000000")) {
          list.push("06000001000000"); // 账号权限
        }
      }
      if (item == "06020001020100") {
        if (!list.includes("06020001020000")) {
          list.push("06020001020000"); // 角色管理
          if (!list.includes("06000001000000")) {
            list.push("06000001000000"); // 账号权限
          }
        }
      }
      if (item == "07010001010000" || item == "07020001020000") {
        if (!list.includes("07000001000000")) {
          list.push("07000001000000"); // 设置
        }
      }
    });
    const result = [];
    list.map(item => {
      this.state.authorityList.map(val => {
        if (item == val.number) {
          result.push(val.id);
        }
      });
    });
    return result;
  }
  init() {
    getAllAuthority()
      .then(res => {
        this.setState({
          authorityList: res.data
        });
      })
      .then(() => {
        if (this.isUpdate()) {
          this.props.actions.getRole(this.getRoleId()).then(() => {
            this.setState(
              {
                render: false
              },
              () => {
                this.setState({
                  render: true
                });
              }
            );
          });
        }
      });
  }
  doAction(values) {
    const role = values;

    if (this.isUpdate()) {
      role.id = this.getRoleId();
      return this.props.actions.updateRole(role);
    } else {
      return this.props.actions.addRole(role);
    }
  }
  getRoleId() {
    const router = this.context.router;
    return router.params.id;
  }
  isUpdate() {
    const role = this.getRoleId();
    if (typeof role != "undefined") {
      return true;
    }
    return false;
  }

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
    let data = {};
    if (!this.props.auth.currUser) {
      return <div />;
    }
    const currAuthorityList = this.props.auth.currUser.authorityVOList;
    const analysisInitialValue = [];
    const homeInitialValue = [];
    const applicationnitialValue = [];
    const productInitialValue = [];
    const firmwareUpgradeInitialValue = [];
    const accountInitialValue = [];
    const informationInitialValue = [];
    const vendorInitialValue = [];
    const roleInitialValue = [];
    const testInitialValue = [];
    if (this.isUpdate()) {
      if (!this.props.role.loaded) {
        return <div />;
      } else {
        data = { ...this.props.role.data };
        const list = [];
        data.authorityIds.map(item => {
          this.state.authorityList.map(val => {
            if (item == val.id) {
              list.push(val.number);
            }
          });
        });
        list.map(item => {
          if (item == "01000001000000") {
            homeInitialValue.push(item);
          }
          if (item == "08000001000000") {
            testInitialValue.push(item);
          }
          if (item == "02010001010000" || item == "02020001020000") {
            analysisInitialValue.push(item);
          }
          if (
            item == "03000001010000" ||
            item == "03000001020000" ||
            item == "03000001030000" ||
            item == "03000001040000"
          ) {
            vendorInitialValue.push(item);
          }
          if (item == "09000001000000") {
            applicationnitialValue.push(item);
          }
          if (
            item == "05010001010000" ||
            item == "05020001020000" ||
            item == "05020001030000"
          ) {
            firmwareUpgradeInitialValue.push(item);
          }
          if (
            item == "04000001010000" ||
            item == "04000001020000" ||
            item == "04000001030000" ||
            item == "04000001050000" ||
            item == "04000001040000"
          ) {
            productInitialValue.push(item);
          }
          if (
            item == "06010001010100" ||
            item == "06010001010200" ||
            item == "06010001010300" ||
            item == "06010001010400"
          ) {
            accountInitialValue.push(item);
          }
          if (
            item == "06020001020100" ||
            item == "06020001020200" ||
            item == "06020001020300" ||
            item == "06020001020400"
          ) {
            roleInitialValue.push(item);
          }
          if (item == "07010001010000" || item == "07020001020000") {
            informationInitialValue.push(item);
          }
        });
      }
    } else {
      data = this.state.role;
      // homeInitialValue.push("01000001000000");
      informationInitialValue.push("07010001010000");
    }

    const informationOptions = [
      {
        label: "个人信息",
        value: "07010001010000",
        disabled: true
      }
    ];
    const homeOptions = [];
    const analysisOptions = [];
    const vendorOptions = [];
    const productOptions = [];
    const accountOptions = [];
    const roleOptions = [];
    const firmwareUpgradeOptions = [];
    const testOptions = [];
    const applicationOptions = [];
    currAuthorityList.map(item => {
      if (item.number == "01000001000000") {
        homeOptions.push({
          label: "主页",
          value: "01000001000000"
        });
      }
      if (item.number == "09000001000000") {
        applicationOptions.push({
          label: "应用管理",
          value: "09000001000000"
        });
      }
      if (item.number == "07020001020000") {
        informationOptions.push({
          label: "企业信息",
          value: "07020001020000"
        });
      }
      if (item.number == "02010001010000") {
        analysisOptions.push({
          label: "设备分析",
          value: "02010001010000"
        });
      }
      if (item.number == "02020001020000") {
        analysisOptions.push({
          label: "用户分析",
          value: "02020001020000"
        });
      }
      if (item.number == "08000001000000") {
        testOptions.push({
          label: "产测查询",
          value: "08000001000000"
        });
      }
      if (item.number == "05010001010000") {
        firmwareUpgradeOptions.push({
          label: "固件升级",
          value: "05010001010000"
        });
      }
      if (item.number == "05020001020000") {
        firmwareUpgradeOptions.push({
          label: "固件管理",
          value: "05020001020000"
        });
      }
      if (item.number == "05020001030000") {
        firmwareUpgradeOptions.push({
          label: "升级记录",
          value: "05020001030000"
        });
      }

      if (item.number == "03000001010000") {
        vendorOptions.push({
          label: "查看",
          value: "03000001010000"
        });
      }
      if (item.number == "03000001020000") {
        vendorOptions.push({
          label: "新增",
          value: "03000001020000"
        });
      }
      if (item.number == "03000001030000") {
        vendorOptions.push({
          label: "编辑",
          value: "03000001030000"
        });
      }
      if (item.number == "03000001040000") {
        vendorOptions.push({
          label: "上/下线",
          value: "03000001040000"
        });
      }

      if (item.number == "04000001010000") {
        productOptions.push({
          label: "查看",
          value: "04000001010000"
        });
      }
      if (item.number == "04000001020000") {
        productOptions.push({
          label: "新增",
          value: "04000001020000"
        });
      }
      if (item.number == "04000001030000") {
        productOptions.push({
          label: "编辑",
          value: "04000001030000"
        });
      }
      if (item.number == "04000001050000") {
        productOptions.push({
          label: "删除",
          value: "04000001050000"
        });
      }
      if (item.number == "04000001040000") {
        productOptions.push({
          label: "参数模板",
          value: "04000001040000"
        });
      }

      if (item.number == "06010001010100") {
        accountOptions.push({
          label: "查看",
          value: "06010001010100"
        });
      }
      if (item.number == "06010001010200") {
        accountOptions.push({
          label: "新增",
          value: "06010001010200"
        });
      }
      if (item.number == "06010001010300") {
        accountOptions.push({
          label: "编辑",
          value: "06010001010300"
        });
      }
      if (item.number == "06010001010400") {
        accountOptions.push({
          label: "删除",
          value: "06010001010400"
        });
      }

      if (item.number == "06020001020100") {
        roleOptions.push({
          label: "查看",
          value: "06020001020100"
        });
      }
      if (item.number == "06020001020200") {
        roleOptions.push({
          label: "新增",
          value: "06020001020200"
        });
      }
      if (item.number == "06020001020300") {
        roleOptions.push({
          label: "编辑",
          value: "06020001020300"
        });
      }
      if (item.number == "06020001020400") {
        roleOptions.push({
          label: "删除",
          value: "06020001020400"
        });
      }
    });

    const compAuthority = [];

    currAuthorityList.map(item => {
      if (item.number == "01000001000000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="主页">
            {getFieldDecorator("index", {
              initialValue: homeInitialValue
            })(<CheckboxGroup options={homeOptions} />)}
          </FormItem>
        );
      }
      if (item.number == "02000001000000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="统计分析">
            {getFieldDecorator("statisticalAnalysis", {
              initialValue: analysisInitialValue
            })(<CheckboxGroup options={analysisOptions} />)}
          </FormItem>
        );
      }
      if (item.number == "03000001000000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="厂商管理">
            {getFieldDecorator("vendorManagement", {
              initialValue: vendorInitialValue
            })(<CheckboxGroup options={vendorOptions} />)}
          </FormItem>
        );
      }
     if (item.number == "09000001000000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="应用管理">
            {getFieldDecorator("appManagement", {
              initialValue: applicationnitialValue
            })(<CheckboxGroup options={applicationOptions} />)}
          </FormItem>
        );
      }
      if (item.number == "05000001000000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="固件升级">
            {getFieldDecorator("firmwareUpgrade", {
              initialValue: firmwareUpgradeInitialValue
            })(<CheckboxGroup options={firmwareUpgradeOptions} />)}
          </FormItem>
        );
      }

      if (item.number == "08000001000000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="产测查询">
            {getFieldDecorator("test", {
              initialValue: testInitialValue
            })(<CheckboxGroup options={testOptions} />)}
          </FormItem>
        );
      }
      if (item.number == "06010001010000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="帐号管理">
            {getFieldDecorator("accountPermission", {
              initialValue: accountInitialValue
            })(<CheckboxGroup options={accountOptions} />)}
          </FormItem>
        );
      }
      if (item.number == "04000001000000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="产品管理">
            {getFieldDecorator("productManagement", {
              initialValue: productInitialValue
            })(<CheckboxGroup options={productOptions} />)}
          </FormItem>
        );
      }
      if (item.number == "06020001020000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="角色管理">
            {getFieldDecorator("rolePermission", {
              initialValue: roleInitialValue
            })(<CheckboxGroup options={roleOptions} />)}
          </FormItem>
        );
      }
      if (item.number == "07000001000000") {
        compAuthority.push(
          <FormItem {...formItemLayout} label="设置">
            {getFieldDecorator("information", {
              initialValue: informationInitialValue
            })(<CheckboxGroup options={informationOptions} />)}
          </FormItem>
        );
      }
    });
    // 强制重新渲染
    if (!this.state.render) {
      return <div />;
    }
    return (
      <div>
        <Title text="角色信息" />
        <div className="view-content">
          <Form>
            <FormItem {...formItemLayout} label="角色名称">
              {getFieldDecorator("name", {
                initialValue: data.name,
                rules: [
                  {
                    required: true,
                    message: "请输入角色名称!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="角色描述">
              {getFieldDecorator("description", {
                initialValue: data.description,
                rules: [{}]
              })(<Input type="text" />)}
            </FormItem>
          </Form>

        </div>
        <Title text="角色信息" />
        <div className="view-content">
          <Form onSubmit={this.powerSubmit}>
            {compAuthority}
            <FormItem {...formItemLayout} label=" ">
              <span className="mr60">
                <Button type="primary" htmlType="submit" size="large">
                  保存
                </Button>
              </span>
              <Button type="ghost" onClick={this.goBack} size="large">
                取消
              </Button>
            </FormItem>
          </Form>

        </div>
      </div>
    );
  }
}
AddOrEdit.contextTypes = {
  router: React.PropTypes.object
};
AddOrEdit = Form.create({})(AddOrEdit);
function mapStateToProps(state) {
  return {
    role: state.role,
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(roleActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddOrEdit);
