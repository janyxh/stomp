import React, { PureComponent, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation, TopNavigation } from "../../components";
import { load as loadAuth, logout as logoutAuth } from "../../actions/auth";

class Content extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.Logout = this.Logout.bind(this);
  }

  Logout() {
    this.props.actions.logoutAuth().then(res => {
      if (res.code == "000000") {
        window.location.href = "/";
      }
    });
  }
  render() {
    if (!this.props.auth.currUser) {
      return <div />;
    }
    const { authorityVOList, name } = this.props.auth.currUser;

    return (
      <div>
        <div className="left">
          <Navigation authorityList={authorityVOList || []} />
        </div>
        <div className="right">
          <div className="logout">
            <div className="fr mr30">
              <span className="mr5"> {name} </span>
              {" "}
              |
              {" "}
              <span onClick={this.Logout} className="ml5 out"> 退出 </span>
            </div>
            <div className="clearfix" />
          </div>
          <div className="TopNavigation">
            <TopNavigation />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
const propTypes = {
  children: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadAuth,
        logoutAuth
      },
      dispatch
    )
  };
}
Content.contextTypes = {
  router: React.PropTypes.object
};
Content.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Content);
