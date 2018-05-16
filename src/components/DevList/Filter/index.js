import React, { PureComponent, PropTypes } from 'react';
import { Input, Select } from 'antd';

const Option = Select.Option;
const Search = Input.Search;
class Filter extends PureComponent {
  componentDidMount() {}

  render() {
    const productOptions = this.props.productList
    .map(item => <Option key={item.id}>{item.name}</Option>);

    const companyOptions = this.props.companyList
    .map(item => <Option key={item.id}>{item.name}</Option>);
    return (
      <div>
      <div className="fl ml60 search-label mr10" >筛选 : </div>
      <div className="fl mr30">
      <Select
        defaultValue="all"
        style={{
          width: 170,
          height: 40,
        }}
        onChange={this.props.companyChange}
      >
      <Option key="all">全部</Option>
     {companyOptions}
     </Select>
      </div>
      <div className="fl">
      <Select
        defaultValue="all"
        style={{
          width: 170,
          height: 40,
        }}
        onChange={this.props.productChange}
        value={this.props.productValue}
      >
      <Option key="all">全部</Option>
     {productOptions}
      </Select>
      </div>
      <div className="fl ml30">
      <Search
        className="searchProduct"
        placeholder="请输入帐号或者设备MAC地址"
        style={{
          width: 218,
          height: 40,
        }}
        onSearch={this.props.onSearch}
      />
      </div>
      <div className="clearfix" />
      </div>
    );
  }
}

const propTypes = {
  onSearch: PropTypes.func.isRequired,
  productChange: PropTypes.func.isRequired,
  productValue: PropTypes.string.isRequired,
  companyChange: PropTypes.func.isRequired,
  companyList: PropTypes.array.isRequired,
  productList: PropTypes.array.isRequired,
};
Filter.propTypes = propTypes;
export default Filter;
