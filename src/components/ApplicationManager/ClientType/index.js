import React, { Component, PropTypes } from "react";

class ClientType extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: this.props.type || "Android"
    };
  }
  onClick(value) {
     console.log('ok')
    this.props.onClick && this.props.onClick(value);
    this.setState({
      type: value
    });

  }
  render() {
    return (
      <div className="clientContainer">
        <div
          style={{
            marginLeft: 30
          }}
          className={
            this.state.type == "Android" ? "client selected " : "client"
          }
          onClick={this.onClick.bind(this, "Android")}
        >
           Android客户端
        </div>
        <div className="typeSplit" />
        <div
          className={this.state.type == "iOS" ? "client selected " : "client"}
          onClick={this.onClick.bind(this, "iOS")}
        >
        iOS客户端

        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
const propTypes = {};
ClientType.propTypes = propTypes;
export default ClientType;
