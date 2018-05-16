import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Input, Select, Table, Col, Row } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
class FilterProduct extends PureComponent {

  constructor(context, props) {

    super(context, props);
    this.columns = [
      {
        title: '所属公司',
        dataIndex: 'manufactureName',
        key: 'manufactureName',
        width:300,
      }, {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
 width:300,
      },
      {
        title: 'Model ID',
        dataIndex: 'modelId',
        key: 'modelId',

      },

    ];
  }
  componentDidMount() {}

  render() {

    const {companyList, selectedRowKeys, onSelectChange} = this.props;
    const companyOptions = companyList.map((item, index) => {
      return <Option key={item.id}>{item.name}</Option>
    });
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
    };
    return (
      <div>

      <div className="fl mr30">
      <Select defaultValue="all" style={{
        width: 170,
        height: 40
      }} onChange={this.props.companyChange}  defaultValue="all">
          <Option key="all">全部厂商</Option>
     {companyOptions}
    </Select>
      </div>
            <div className="fl mr30">
 <Search
      className="searchProduct"
      onSearch={this.props.onSearch} placeholder="搜索产品名称或Model ID"

      />
          </div>

      <div className="clearfix"></div>
       <Table rowSelection={rowSelection} columns={this.columns} pagination={false} dataSource={this.props.list}  scroll={{
        y: 240
      }} />
      </div>
      );
  }
}
export default FilterProduct;
