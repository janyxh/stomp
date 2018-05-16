import React, { PureComponent, PropTypes } from 'react';

import { DatePicker, Select, Input, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;

class Filter extends PureComponent {
  render() {
    const ranges = {
      '昨天': [moment().subtract(1, 'day').set({
        hour: 0,
        minute: 0,
        second: 0,
      }), moment().subtract(1, 'day').set({
        hour: 23,
        minute: 59,
        second: 59,
      })],
      '过去3天': [moment().subtract(3, 'days').set({
        hour: 0,
        minute: 0,
        second: 0,
      }), moment().subtract(1, 'day').set({
        hour: 23,
        minute: 59,
        second: 59,
      })],
      '过去7天': [moment().subtract(7, 'days').set({
        hour: 0,
        minute: 0,
        second: 0,
      }), moment().subtract(1, 'day').set({
        hour: 23,
        minute: 59,
        second: 59,
      })],
    };
    const list = this.props.list.map((item) => {
      return <Option key={item}>{item}</Option>
    })
    return (
      <div>
      <RangePicker
      allowClear = {false}
      style={{
        marginRight: 30,
        float: 'left'
      }}
      placeholder={['开始时间', '结束时间']}
      defaultValue ={
        [moment().subtract(1, 'day').set({
        hour: 0,
        minute: 0,
        second: 0,
      }), moment().subtract(1, 'day').set({
        hour: 23,
        minute: 59,
        second: 59,
      })]

      }
      ranges={ranges}
      onChange={this.props.onChange}
      />
      <Select

      defaultValue="all"
      style={{
        width: 170,
        height: 40,
        marginRight: 30,
        float: 'left'
      }}
      onChange={this.props.productChange}>
      <Option value="all">全部产品</Option>
      {list}
    </Select>
  <Select
      defaultValue="1"
      style={{
        width: 170,
        height: 40,
        marginRight: 30,
        float: 'left'
      }}
      onChange={this.props.typeChange}>
      <Option value="all">全部</Option>
      <Option value="1">测试通过</Option>
      <Option value="0">测试不通过</Option>

    </Select>
    <Search
      className="searchProduct"
      placeholder="支持根据Mac地址或条码搜索"
      style={{
        width: 218,
        height: 40,
      }}
      onSearch={this.props.onSearch}
      />
       <Button  style={{
        float: 'right',
        marginRight: 50,
        height: 40
      }} type="primary" icon="download" onClick={this.props.saveData} >导出当前数据</Button>
       <div className="clearfix"></div>
      </div>
      );
  }
}
const propTypes = {
  onChange: PropTypes.func.isRequired,
  productChange: PropTypes.func.isRequired,
  typeChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};
Filter.propTypes = propTypes;
export default Filter;
