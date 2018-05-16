import React, { PropTypes, Component } from "react";

import { Title } from "../../../../components";
// import MenuManager from "../../MenuManager";
import ConfigList from "./ConfigList";
import FeedBack from "./FeedBack";


class AppProfile extends Component {
  constructor(context, props) {
    super(context, props);
  }

  render() {
    return (
      <div>
        <Title text="我的列表" />
        <div className="ml60 mt20">

          <ConfigList />
        </div>
        <Title text="意见反馈" />
        <FeedBack />
      </div>
    );
  }
}
const propTypes = {};
AppProfile.propTypes = propTypes;
export default AppProfile;
