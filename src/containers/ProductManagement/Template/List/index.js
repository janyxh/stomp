import React, { PureComponent } from 'react';
import { Button, Table, Icon } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as templateActions from '../../../../actions/template';
import { Link } from 'react-router';


class List extends PureComponent {

  constructor(context, props) {
    super(context, props);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.state = {
      pagination: {
        // total: 0,
        current: 1,
        pageSize: 20,
        showQuickJumper:true,
        //onChange: this.onPageChange.bind(this),
      }
    }
    this.columns = [{
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '模板ID',
      dataIndex: 'templateId',
      key: 'templateId',
    }, {
      title: '大小端',
      dataIndex: 'endian',
      key: 'endian',
      render: (text, record) => {
        return text == "0" ? "小字节序" : "大字节序";
      }
    },
      {
        title: '是否转发',
        dataIndex: 'forwardFlag',
        key: 'forwardFlag',
        render: (text, record) => {
          return text == "0" ? "不转发" : "转发";
        }
      },
      {
        title: '数据保存类型',
        dataIndex: 'storageType',
        key: 'storageType',
        render: (text, record) => {
          if (text == "0") {
            return "不保存数据";
          } else if (text == "1") {
            return "只保存最后一条数据";
          } else {
            return "保存全部数据";
          }
        }
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
      },
      ];
  }
  componentDidMount() {
    const id = this.getProductId()
    this.props.actions.getAllTemplate(id);
  }
  deleteTemplate(id) {
    this.props.actions.deleteTemplate(id).then(() => {
      this.props.actions.getAllTemplate();
    });
  }
  getProductId() {
    const router = this.context.router;
    return router.params.id;
  }
  render() {
    if (!this.props.templateList.loaded) {
      return <div></div>;
    }
    let data = this.props.templateList.data || [];
    data = data.map((item, index) => {
      item['key'] = index;
      return item;
    })
    const id = this.getProductId();
    return (
      <div> <Link to={`/Content/ProductManagement/Template/AddOrEdit?productId=${id}`}>
      <button className="btn fr addTemplate">新增</button>
     </Link>
      <div className="clearfix"></div>
      <div className="ml48">
     <Table columns={this.columns} dataSource={data} pagination = {
      this.state.pagination
      } />
      </div></div>
      );
  }
}

List.contextTypes = {
  router: React.PropTypes.object,
}
function mapStateToProps(state) {
  return {
    templateList: state.templateList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(templateActions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
