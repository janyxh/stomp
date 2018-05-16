import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
class Phone extends PureComponent {

  constructor(context, props) {

    super(context, props);

  }
  componentDidMount() {}

  render() {
    let comp = ( <div className="stom-modal">
       <div className="stom-modal-title">修改手机号码</div>
       <div>
  <Input type="phone" style={{
        height: 40,
         width: 308,
        display: "inline-block"
      }}  />
       <button className="btn btn-primary" onClick={this.props.next} >下一步</button>
       </div>
          
          
      </div>)
    if (this.props.firstStep) {
      return comp;
    }
    return (
      <div className="stom-modal">
       <div className="stom-modal-title"> 校验码已发送以下手机，请注意查收 <br />
 188****1234</div>
  <div>
            <Input type="phone" style={{
        height: 40,
        width: 170,
        display: "inline-block"
      }}  />
      <button className="btn btn-primary ml30" onClick={this.props.save} >58秒后重发</button>
      </div>
            <div className="db mt30">
            <button className="btn btn-primary" onClick={this.props.save} >下一步</button>
            </div>
      </div>

      );
  }
}
export default Phone;