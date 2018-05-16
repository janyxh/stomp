import React, { Component, PropTypes } from "react";

import BasicInfo from "./BasicInfo";
import LanguageConfig from "./LanguageConfig";
import Theme from "./Theme";
import ServiceConfig from "./ServiceConfig";
import OtherConfig from "./OtherConfig";

class BasicConfig extends Component {
  render() {
    return (
      <div>
        <BasicInfo
          ref="basicInfo"
          handleSubmit={this.props.updateApplication}
          data={this.props.applicationInfo}
          languageList={this.props.languageList}
          id={this.props.addId}
        />
        <LanguageConfig
          ref="languageConfig"
          handleSubmit={this.props.updateApplicationLanguage}
          applicationLanguages={this.props.applicationLanguages}
          id={this.props.addId}
        />
        <ServiceConfig
          ref="serviceConfig"
          handleSubmit={this.props.saveService}
          data={this.props.data}
        />
        <Theme
          data={this.props.data}
          changeBgc={this.props.changeBgc}
          changeThemec={this.props.changeThemec}
          changeFontc={this.props.changeFontc}
          changeSecurityBgColor={this.props.changeSecurityBgColor}
          saveColor={this.props.saveColor}
        />
        <OtherConfig handleSubmit = { this.props.updateApplicationOtherInfo} id={this.props.addId} ref="otherConfig" data={this.props.data} />

      </div>
    );
  }
}
const propTypes = {};
BasicConfig.propTypes = propTypes;
export default BasicConfig;
