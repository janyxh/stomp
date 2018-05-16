import React, { PureComponent, PropTypes } from "react";
import { Tabs } from "antd";
import AppDevList from "./AppDevList";
import AppNavigation from "./AppNavigation";
import AppProfile from "./AppProfile";

const TabPane = Tabs.TabPane;
class Framework extends PureComponent {
  render() {
    const applicationLanguages = this.props.applicationLanguages;
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="主导航栏" key="1">
          <AppNavigation
            applicationLanguages={
              this.props.applicationLanguages.appLanguageVOList
            }
          />

        </TabPane>

        <TabPane tab="「我的」列表" key="2">

          <AppProfile />

        </TabPane>
        <TabPane tab="设备列表" key="3">

          <AppDevList />;

        </TabPane>
      </Tabs>
    );
  }
}
const propTypes = {};
Framework.propTypes = propTypes;
export default Framework;
