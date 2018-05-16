import React, { PureComponent } from 'react';

import { Form, Input, Select, Modal, Button, DatePicker } from 'antd';
const {RangePicker} = DatePicker;
class Filter extends PureComponent {
  constructor(context, props) {
    super(context, props);
  }

  render() {
    let range = null;
    const {companyList, productList, show} = this.props;
    const vendorListOptions = companyList.map((item, index) => {
      return <Option key={item.id}>{item.name}</Option>
      });
      const productListOptions = productList.map((item, index) => {
        return <Option key={item.id}>{item.name}</Option>
        })
        if (show) {
          range = <RangePicker style={{
            height: 40,
            marginLeft: 10
          }} ref="RangePicker" onChange={this.props.changeDate}  value={this.props.rangeValue}   />
        }
        return (
          <div>
   <Select className="small-select mr30" defaultValue="all" onChange={this.props.changeCompany} >
    <Option value="all">所有厂商</Option>
    {vendorListOptions}
  </Select>
  <Select className="small-select mr30" value={this.props.productValue} onChange={this.props.changeProduct} >
    <Option value="all">所有产品</Option>
    {productListOptions}
  </Select>
        <Select
          className="small-select"
          style={{
            width: 200,
          }}
          defaultValue="1"
          onChange={this.props.selectDate}
          >
    <Option value="1">昨天</Option>
    <Option value="2">过去七天</Option>
        <Option value="4">过去30天</Option>
      <Option value="3">自定义 </Option>
   
  </Select>
   {range}

  <button className="btn fr mr100" onClick={this.props.saveData} >
  导出当前数据
  </button>

  <div className="clearfix"></div>

  </div>)
      }
    }

    export default Filter;