import React, { PureComponent, PropTypes } from "react";
import { Menu, Icon } from "antd";
import logo from "./logo.png";
const SubMenu = Menu.SubMenu;
const propTypes = {
  children: PropTypes.object.isRequired
};

const routerConfig = {
  1: "/Content/home",
  2: "/Content/DeviceAnalysis",
  3: "/Content/UserAnalysis",
  4: "/Content/VendorManagement",
  5: "/Content/ProductManagement",
  6: "/Content/DevList",
  7: "/Content/FirmwareManagement",
  8: "/Content/AccountManagement",
  9: "/Content/RoleManagement",
  10: "/Content/PersonalInformation",
  11: "/Content/CorporateInformation",
  12: "/Content/UpgradeLogs",
  13: "/Content/FirmwareUpgrade",
  14: "/Content/TestSearch",
  15: "/Content/ApplicationManager"
};

class Navigation extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.getAncestorKeys = this.getAncestorKeys.bind(this);
    this.state = {
      current: "1",
      openKeys: []
    };
  }
  componentDidMount() {
    this.init();
  }
  componentWillReceiveProps(nextProps) {
    this.init();
  }
  init() {
    const authorityList = this.props.authorityList;
    const pathname = this.context.router.location.pathname;
    for (var key in routerConfig) {
      const reg = new RegExp(routerConfig[key]);
      if (reg.test(pathname)) {
        let openKeys = [];
        if (key == "2" || key == "3") {
          openKeys = ["sub1"];
        }
        if (key == "12" || key == "13" || key == "7") {
          openKeys = ["sub2"];
        }
        if (key == "8" || key == "9") {
          openKeys = ["sub3"];
        }
        if (key == "10" || key == "11") {
          openKeys = ["sub4"];
        }
        this.setState({
          openKeys,
          current: key
        });
      }
    }
  }
  handleClick(e) {
    this.setState({
      current: e.key
    });
    const { router } = this.context;
    router.replace(routerConfig[e.key]);
  }
  onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(
      key => !(state.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = state.openKeys.find(
      key => !(openKeys.indexOf(key) > -1)
    );

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({
      openKeys: nextOpenKeys
    });
  }
  getAncestorKeys(key) {
    const map = {
      // sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {
    const analyisisList = [];
    const firmwareList = [];
    const accountList = [];
    const configList = [];
    this.props.authorityList.map((item, index) => {
      switch (item.number) {
        case "02010001010000":
          analyisisList.push(<Menu.Item key="2"> 设备分析</Menu.Item>);
          break;
        case "02020001020000":
          analyisisList.push(<Menu.Item key="3"> 用户分析</Menu.Item>);
          break;
        case "05010001010000":
          firmwareList.push(<Menu.Item key="13"> 固件升级</Menu.Item>);
          break;
        case "05020001030000":
          firmwareList.push(<Menu.Item key="12"> 升级记录</Menu.Item>);
          break;

        case "06010001010000":
          accountList.push(<Menu.Item key="8"> 帐号管理</Menu.Item>);
          break;
        case "06020001020000":
          accountList.push(<Menu.Item key="9"> 角色管理</Menu.Item>);
          break;
        case "07010001010000":
          configList.push(<Menu.Item key="10"> 个人信息</Menu.Item>);
          break;
        case "07020001020000":
          configList.push(<Menu.Item key="11"> 企业信息</Menu.Item>);
          break;
      }
    });
    // 为了保证左侧导航的顺序
    this.props.authorityList.map(item => {
      if (item.number == "05020001020000") {
        firmwareList.push(<Menu.Item key="7"> 固件管理</Menu.Item>);
      }
    });
    const comp = this.props.authorityList.map((item, index) => {
      switch (item.number) {
        case "01000001000000":
          return (
            <Menu.Item key="1">
              <span><Icon type="home" /><span>主页</span></span>
            </Menu.Item>
          );
        case "02000001000000":
          return (
            <SubMenu
              key="sub1"
              title={<span><Icon type="area-chart" /><span>统计分析</span></span>}
            >
              {analyisisList}
            </SubMenu>
          );
        case "03000001000000":
          return (
            <Menu.Item key="4">
              <span><Icon type="team" /><span>厂商管理</span></span>
            </Menu.Item>
          );
        case "04000001000000":
          return (
            <Menu.Item key="5">
              <span><Icon type="appstore-o" /><span>产品管理</span></span>
            </Menu.Item>
          );
         case "09000001000000":
          return (
            <Menu.Item key="15">
              <span><Icon type="switcher" /><span>应用管理</span></span>
            </Menu.Item>
          );
        case "05000001000000":
          return (
            <SubMenu
              key="sub2"
              title={
                <span><Icon type="cloud-upload-o" /><span>固件升级</span></span>
              }
            >
              {firmwareList}
            </SubMenu>
          );

        case "08000001000000":
          return (
            <Menu.Item key="14">
              <span><Icon type="exception" /><span>产测查询</span></span>
            </Menu.Item>
          );
        case "06000001000000":
          return (
            <SubMenu
              key="sub3"
              title={<span><Icon type="user" /><span>帐号权限</span></span>}
            >
              {accountList}
            </SubMenu>
          );

        case "07000001000000":
          return (
            <SubMenu
              key="sub4"
              title={<span><Icon type="setting" /><span>设置</span></span>}
            >
              {configList}
            </SubMenu>
          );
      }
    });
    return (
      <div>
        <div className="logo">
          <img src={logo} className="logo-img" alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          style={{
            width: 190
          }}
          inlineIndent="28"
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
        >
          {comp}

        </Menu>
      </div>
    );
  }
}
Navigation.propTypes = propTypes;
Navigation.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default Navigation;
