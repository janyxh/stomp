import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
class LogsFilter extends PureComponent {

  constructor(context, props) {

    super(context, props);

  }
  componentDidMount() {}


  render() {

    const { peopleList} = this.props;

      const peopleListOptions = peopleList.map((item, index) => {
        return <Option key={item}>{item}</Option>
        })
        return (
          <div>
            <div className="fl ml60 search-label mr10" >操作人 : </div>
      <div className="fl mr30">
      <Select
      defaultValue={this.props.defaultValue}
      style={{
            width: 170,
            height: 40
          }} onChange={this.props.peopleChange} >
          <Option key="all">全部</Option>
     {peopleListOptions}
    </Select>
      </div>
      <div className="fl mr30">
     <Search
          className="searchProduct"
          placeholder="请输入帐号或者设备MAC地址"
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
    export default LogsFilter;
