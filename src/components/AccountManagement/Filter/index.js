import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
class Filter extends PureComponent {

  constructor(context, props) {
    super(context, props);
  }
  componentDidMount() {}

  render() {

    return (
      <div className="mt40 mb50">
      {
        this.props.addAuthority &&  <Link to="/Content/AccountManagement/AddOrEdit">
       <div className="fr addProduct btn">
   新增帐号
      </div></Link>
      }

      <div className="fl ml50">
           <Search
      className="searchProduct"
      placeholder="搜索用户关键字"
      style={{
        width: 218,
        height: 40
      }}
      onSearch={this.props.onSearch}
      />
  </div>


    <div className="clearfix"></div>
      </div>


      );
  }
}
export default Filter;
