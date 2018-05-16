import React, { PureComponent } from 'react';
import { Button, Table, Icon } from 'antd';
import { Link } from 'react-router';
import { Filter } from '../';



class VendorList extends PureComponent {

  constructor(context, props) {
    super(context, props);
    this. columns = [{
      title: '厂商名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '帐号名',
      dataIndex: 'accountName',
      key: 'accountName',
    }, {
      title: '联系人',
      dataIndex: 'linkmanName',
      key: 'linkmanName',
    },
      {
        title: '联系人电话',
        dataIndex: 'linkmanMobile',
        key: 'linkmanMobile',
      },
      {
        title: '联系人邮箱',
        dataIndex: 'linkmanEmail',
        key: 'linkmanEmail',
      },
      {
        title: '产品数量',
        dataIndex: 'productCount',
        key: 'productCount',
      },
      {
        title: '当前状态',
        dataIndex: 'offlineFlag',
        key: 'offlineFlag',
        render: (text, record) => {
          return text == "0" ? "上线" : "下线";
        }
      },
      {
        title: '创建人',
        dataIndex: 'createAccountName',
        key: 'createAccountName',
      },

    ];
  }
  componentDidMount() {
    // 编辑权限
    this.props.editAuthority && this.columns.push(
      {
        title: '操作',
        key: 'id',
        dataIndex: 'id',
        render: (text, record) => (
        <span className="action">
      <Link className="" to={`/Content/VendorManagement/AddOrEdit/${text}`}>编辑</Link>
    </span>
        ),
      }
    )


  }

  render() {

    let data = this.props.vendorList;
    data = data.map((item, index) => {
      item['key'] = index;
      return item;
    });

    return (
      <div>
      <div>
      <Filter onSearch={this.props.onSearch} addAuthority={this.props.addAuthority} selectChange={this.props.selectChange} />
      </div>
      <div className="ml48">
     <Table columns={this.columns} dataSource={data}  pagination = {this.props.pagination}  />  
      </div></div>
      );
  }
}
export default VendorList;