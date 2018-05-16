import React, { Component, PropTypes } from "react";
import Twitter from "./Twitter.js";
import color from "./helpers/color";
class HommilyColorPicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.sketchHandleClick = this.sketchHandleClick.bind(this);
    this.sketchHandleClose = this.sketchHandleClose.bind(this);
    this.sketchHandleChange = this.sketchHandleChange.bind(this);
    this.twitterHandleChange = this.twitterHandleChange.bind(this);
    this.state = {
      displayColorPicker: false,
      check: false,
      hexValue: this.props.defaultValue.toLowerCase(),
      checkedColor: {
        r: "225",
        g: "105",
        b: "0",
        a: "100"
      }
    };
  }
  componentDidMount() {
    // 初始化选项
    const list = this.props.colors;
    if (!list.includes(this.props.defaultValue.toLowerCase())) {
      this.setState({
        check: true,
        displayColorPicker: false,
        checkedColor: color.toState(this.props.defaultValue.toLowerCase()).rgb
      });
    }
  }
  twitterHandleChange(hex, e) {
    color.isValidHex(hex);
    this.setState({
      check: false,
      hexValue: hex.hex.toLowerCase()
    });
    this.props.onChange(hex.hex.toLowerCase());
  }
  sketchHandleClick() {

    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    });
  }

  sketchHandleClose() {

    this.setState({
      displayColorPicker: false,
     // check: true,
    });
    //this.props.onChange(this.state.hexValue);
  }

  sketchHandleChange(color) {

    this.setState({
      checkedColor: color.rgb,
      hexValue: color.hex,
      check: true,
    });
    this.props.onChange(color.hex);
  }

  render() {
    return (
      <div>
        <Twitter
          ref="Twitter"
          colors={this.props.colors}
          twitterHandleChange={this.twitterHandleChange}
          triangle="hide"
          sketchHandleClick={this.sketchHandleClick}
          sketchHandleClose={this.sketchHandleClose}
          sketchHandleChange={this.sketchHandleChange}
          {...this.state}
        />
      </div>
    );
  }
}
const propTypes = {};
HommilyColorPicker.defaultProps = {
  defaultValue: "#ff6900"
};
HommilyColorPicker.propTypes = propTypes;
export default HommilyColorPicker;
