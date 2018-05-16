import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Input, Select, Table, Col, Row } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
class LanuageSelect extends PureComponent {

  constructor(context, props) {

    super(context, props);
    this.columns = [
      {
        title: '语言',
        dataIndex: 'name',
        key: 'name',
        render: (text ,item) => {
          return <span>
            {text}<br/>
            {item.enName}
          </span>
        }
      },
    ];
  }
  componentDidMount() {}

  render() {

    const {selectedRowKeys, onSelectChange} = this.props;

    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: onSelectChange,
    };
    console.log(this.props.list)
    return (
      <div>

            <div className="fl mr30">
       <Search
      className="searchProduct"
      onSearch={this.props.onSearch} placeholder=""

      />
          </div>

      <div className="clearfix"></div>
       <Table
        className="language"
       pagination={false}
      showHeader={false}

      rowSelection={rowSelection}
      columns={this.columns}

      dataSource={this.props.list}

    />
      </div>
      );
  }
}
export default LanuageSelect;
