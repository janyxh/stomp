import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { Input, Select, Table, Col, Row } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
class FilterFirmware extends PureComponent {

  constructor(context, props) {

    super(context, props);
    this.columns = [
      {
        title: '固件名称',
        dataIndex: 'originName',
        key: 'originName',
        width:300,
      }, {
        title: '固件版本',
        dataIndex: 'version',
        key: 'version',
        width:260,
      },
      {
        title: '发布时间',
        dataIndex: 'publishTime',
        key: 'publishTime',

        render: (text) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      },

    ];
  }
  componentDidMount() {}

  render() {

    const {list, selectedRowKeys, onSelectChange} = this.props;

    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
      type: 'radio'
    };
    return (
      <div>

       <Table rowSelection={rowSelection} columns={this.columns} dataSource={ list } pagination={false} scroll={{
        y: 240
      }} footer = {() => {
        return <span>
          没找到合适的固件？ <Link to="/Content/FirmwareManagement?flag=1">点击这里</Link> 查看更多或新增固件
        </span>
      }} />
      </div>
      );
  }
}
export default FilterFirmware;
