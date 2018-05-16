
import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Row, Col, Icon } from 'antd';
import moment from 'moment';
import upImg from './up.svg';
import downImg from './down.svg';
import successImg from './success.svg';
import failImg from './fail.svg';
import  { loadTest } from '../../../actions/test';

class View extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.showMore = this.showMore.bind(this);
    this.state = {
      show: false,
    }
    this.columns = [
      {
        title: '测试项目',
        dataIndex: 'testProject',
        key: 'testProject',
      },
      {
        title: '最小值',
        dataIndex: 'minValue',
        key: 'minValue',
      }, {
        title: '实测值',
        dataIndex: 'actualValue',
        key: 'actualValue',
      },
      {
        title: '最大值',
        dataIndex: 'maxValue',
        key: 'maxValue',
      },

      {
        title: '判定结果',
        key: 'result',
        dataIndex: 'result',
        // render: (text) => (
        // text == '0' ? '成功' : '失败'
        // ),
      }];
  }
  showMore() {

    this.setState({
      show: !this.state.show,
    });
  }
  getTestId() {
    const router = this.context.router;
    return router.params.id;
  }
  componentDidMount() {
    const id = this.getTestId();
    this.props.actions.loadTest(id);
  }
  render() {
    const data = this.props.test.data || {};
    return (
      <div className="ml50 mt20">

<div  style={{
        width: 1000,
        color: '#32323b',
      }}>


<Row type="flex" className="lh30" >
  <Col span={8} >
  时间: {moment(data.testDatetime).format('YYYY/MM/DD  HH:mm:ss')}
  </Col>
  <Col span={8} >
  测试产品: {data.productName}
  </Col>
  <Col span={8} >
  条码: {data.code}
  </Col>

 </Row>
 <Row type="flex" className="lh30" >
 <Col span={8} >
  MAC地址: {data.macAddress}
  </Col>
  <Col span={8} >
  工单: {data.orderForWork}
  </Col>
  <Col span={8} >
  程序版本: {data.version}
  </Col>
    </Row>

  {(() => {
        return this.state.show ?
          <div>
      <Row type="flex" className="lh30" >
  <Col span={8} >
  场地: {data.site}
  </Col>

  <Col span={8} >
  部门: {data.department}
  </Col>
  <Col span={8} >
  产线: {data.place}
  </Col>
  </Row>
  <Row type="flex" className="lh30" >
   <Col span={8} >
  工程名: {data.projectName}
  </Col>
   <Col span={8} >
  工位号: {data.cardNumber}
  </Col>
   <Col span={8} >
  作业员: {data.operator}
  </Col>
   </Row>
   <Row type="flex" className="lh30" >
   <Col span={8} >
  管理员: {data.administrator}
  </Col>
   <Col span={8} >
  管理员2: {data.administrator1}
  </Col>
   <Col span={8} >
  工程师: {data.engineer}
  </Col>
  </Row>
  <Row type="flex" className="lh30" >
   <Col span={8} >工程师2: {data.engineer1}</Col>
 </Row>
    </div> :
          null
      })()}

  <Row className="mt20 mb20 cp" type="flex" align="middle">
  <Col span={11} >
  <div  style={{
        height: "1",
        borderBottom: "1px solid #e8e8e8"
      }} />
  </Col>
  <Col span={2} >
  {(() => {
        return this.state.show ?
          <Row type="flex" justify="center"  onClick={this.showMore} >
  <Col>
     <img src={upImg} width="16" />
  </Col>
  <Col className="fc48">
收起更多
  </Col>
  </Row> :
          <Row type="flex" justify="center"  onClick={this.showMore} >
  <Col>
   <img src={downImg} width="16" />
  </Col>
  <Col className="fc48">
查看更多
  </Col>
  </Row>
      })()}


  </Col>
  <Col span={11} >
  <div  style={{
        height: "1",
        borderBottom: "1px solid #e8e8e8"
      }} />
  </Col>
  </Row>
 </div>
 <div>
 <div className="mb20">

 {
   data.resultFlag == '1' ? <Row type="flex"> <Col><img width="18" src={successImg} alt=""/> </Col> <Col> <h3>测试通过</h3></Col> </Row> : <Row type="flex"> <Col><img  width="18" src={failImg} alt=""/>    </Col><Col><h3>测试不通过</h3></Col> </Row>
 }

 </div>

 </div>
  <Table className="view-table" columns={this.columns} bordered = {true} dataSource={data.proTestRecordVOList} pagination = {false} />
      </div>
      );
  }
}
const propTypes = {

};
View.propTypes = propTypes;
View.contextTypes = {
  router: React.PropTypes.object,
};
function mapStateToProps(state) {
  return {
    test: state.test.test,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ loadTest }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(View);
