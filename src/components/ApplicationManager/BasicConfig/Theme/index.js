import React, { Component, PropTypes } from "react";
import { Title } from "../../../../components";
import { Button } from "antd";
import { HommilyColorPicker } from "../../../";
class Theme extends Component {
  render() {
    const bgcList = [
      "#ff6900",
      "#fcb900",
      "#7bdcb5",
      "#00d084",
      "#8ed1fc",
      "#0693e3",
      "#abb8c3",
      "#eb144c",
      "#f78da7",
      "#9900ef"
    ];
    const data = this.props.data;

    if (!data.backgroundColor) {
      return null;
    }
    return (
      <div>
        <Title text="主题风格" />
        <div className="mt20 ml50">
          <div className="mt10 mb20"> 选择背景颜色 </div>
          <HommilyColorPicker
            colors={bgcList}
            onChange={this.props.changeBgc}
            defaultValue={data.backgroundColor }
            triangle="hide"
          />
          <div className="mt20 mb20"> 选择主题颜色 </div>
          <HommilyColorPicker
            colors={bgcList}
            defaultValue={data.topicColor }
            onChange={this.props.changeThemec}
            triangle="hide"
          />
          <div className="mt20 mb20"> 选择字体颜色 </div>
          <HommilyColorPicker
            colors={bgcList}
            defaultValue={data.fontColor}
            onChange={this.props.changeFontc}
            triangle="hide"
          />
          <div className="mt20 mb20"> 选择安防颜色 </div>
          <HommilyColorPicker
            colors={bgcList}
            defaultValue={data.securityBgColor}
            onChange={this.props.changeSecurityBgColor}
            triangle="hide"
          />
          <Button
            className="mt20"
            type="primary"
            size="large"
            onClick={this.props.saveColor}
          >
            保存
          </Button>
        </div>
      </div>
    );
  }
}
const propTypes = {};
Theme.propTypes = propTypes;
export default Theme;
