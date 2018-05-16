import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
class Filter extends PureComponent {

  constructor(context, props) {

    super(context, props);
  }
  componentDidMount() {


  }
  render() {

    return (
      <div className="mt40 mb50">
   <div className="fl searchTitle mr20 ml50">
     厂商状态：
    </div>
  <div className="fl mr30">
    <Select defaultValue="" style={{
        width: 170,
        height: 40
      }} onChange={this.props.selectChange}>
      <Option value="">全部</Option>
      <Option value="0">上线</Option>
      <Option value="1">下线</Option>
    </Select>
    </div>
      <div className="fl">
           <Search
      className="searchProduct"
      placeholder="搜索厂商名称关键字"
      style={{
        width: 218,
        height: 40,
      }}
      onSearch={this.props.onSearch}
      />

  </div>

  {

    this.props.addAuthority &&
     (<div className="fr addProduct">
    <Link to="/Content/VendorManagement/AddOrEdit">
    <button className="btn" >新增厂商</button>
    </Link>
      </div>)
  }

    <div className="clearfix"></div>
      </div>


      );
  }
}
export default Filter;
