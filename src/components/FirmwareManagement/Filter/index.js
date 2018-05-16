import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';
import { Select } from 'antd';

const Option = Select.Option;
class Filter extends PureComponent {

  componentDidMount() {}

  render() {
    const { companyList, productList, typeList } = this.props;
    const companyOptions = companyList.map(item => <Option key={item.id}>{item.name}</Option>);
    const productListOptions = productList.map(item => <Option key={item.id}>{item.name}</Option>);
    const typeListOptions = typeList.map(item => <Option key={item.key}>{item.value}</Option>);
    return (
      <div>
     {
      !this.props.isShowCompany &&
      (
      <div className="fl mr30">
      <Select
        defaultValue="all"
        style={{
          width: 170,
          height: 40,
        }}
        onChange={this.props.companyChange}
      >
      <Option key="all">全部厂商</Option>
     {companyOptions}
    </Select>
      </div>
      )
      }
      <div className="fl mr30">
      <Select
        style={{
          width: 170,
          height: 40,
        }}
        onChange={this.props.productChange}
        value={this.props.productValue}
      >
      <Option key="all">全部产品</Option>
     {productListOptions}
     </Select>
      </div>
      <div className="fl mr30">
      <Select
        style={{
          width: 170,
          height: 40,
        }}
        onChange={this.props.typeChange}
        defaultValue="all"
      >
      <Option key="all">全部类型</Option>
     {typeListOptions}
    </Select>

      </div>
     <Link to="/Content/FirmwareManagement/AddOrEdit">
      <button className="btn fr mr60">
      上传新固件
      </button>
      </Link>
      <div className="clearfix" />
      </div>
    );
  }
}
const propTypes = {
  typeChange: PropTypes.func.isRequired,
  productChange: PropTypes.func.isRequired,
  companyChange: PropTypes.func.isRequired,
  productValue: PropTypes.string.isRequired,
  isShowCompany: PropTypes.bool.isRequired,
  companyList: PropTypes.array.isRequired,
  productList: PropTypes.array.isRequired,
  typeList: PropTypes.array.isRequired,
};
Filter.propTypes = propTypes;
export default Filter;
