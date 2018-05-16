import React, { Component, PropTypes } from "react";
import Wechat from "./Wechat";
import QQ from "./QQ";
import Weibo from "./Weibo";
import XiaoFang from "./XiaoFang";

class ThirdParty extends Component {
  render() {
    return (
      <div>
        <XiaoFang
          type={this.props.type}
          ref="xiaoFang"
          data={this.props.xiaoFangData}
          handleSubmit={this.props.saveXiaoFang}
        />
        <Wechat
          type={this.props.type}
          ref="wechat"
          data={this.props.wechatData}
          handleSubmit={this.props.saveWechat}
        />
        <QQ
          type={this.props.type}
          ref="qq"
          handleSubmit={this.props.saveQQ}
          data={this.props.qqData}
        />
        <Weibo
          type={this.props.type}
          ref="weibo"
          handleSubmit={this.props.saveWeibo}
          data={this.props.weiboData}
        />
      </div>
    );
  }
}
const propTypes = {};
ThirdParty.propTypes = propTypes;
export default ThirdParty;
