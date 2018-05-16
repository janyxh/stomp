import React, { PureComponent } from 'react';
import domain from '../../actions/domain';

class Code extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
    this.state = {
      time: null,
    };
  }
  onClick() {
    this.setState({
      time: +new Date(),
    });
  }
  render() {
    return <img width="100" height="40" className="cp" alt="验证码" onClick={this.onClick} role="button" src={`${domain}/verifcode?${this.state.time}`} />;
  }
}
export default Code;
