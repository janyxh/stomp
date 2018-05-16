import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
class ListItem extends PureComponent {

  constructor(context, props) {
    super(context, props);
  }
  componentDidMount() {}
  render() {
    const {id, productTypeParentName, name, model, internalModel, brandName, manufName, updateTime} = this.props;
    return (
      <div className="productItem">
        <div className="productItem-name">
        {name}
        </div>
        <div className="productItem-content">
        <div className="productItem-label">
          <div className="productItem-title">
        产品类别 :
        </div>
        <div className="productItem-context clearfix">
        {productTypeParentName}
        </div>
        <div className="clearfix"></div>
        </div>
        <div className="productItem-label" >
          <div className="productItem-title">
        所属公司 :
        </div>
        <div className="productItem-context">
        {manufName}
        </div>
         <div className="clearfix"></div>
        </div>
         <div className="productItem-label">
          <div className="productItem-title">
        所属品牌 :
        </div>
        <div className="productItem-context">
        {brandName}
        </div>
         <div className="clearfix"></div>
        </div>
         <div className="productItem-label">
          <div className="productItem-title">
        产品型号 :
        </div>
        <div className="productItem-context">
        {model}
        </div>
         <div className="clearfix"></div>
        </div>
          <div className="productItem-label">
          <div className="productItem-title">
        内部型号 :
        </div>
        <div className="productItem-context">
        {internalModel || '无'}
        </div>
         <div className="clearfix"></div>
        </div>
          <div className="productItem-label">
          <div className="productItem-title">
        最近修改时间 :
        </div>
        <div className="productItem-context">
        {moment(updateTime).format('YYYY/MM/DD  HH:mm:ss') }
        </div>
         <div className="clearfix"></div>
        </div>
        <div className="productItem-ation">
   

        {
          this.props.viewAuthority && 
          <Link className="fl" to={`/Content/ProductManagement/View/${id}?currentPage=${this.props.currentPage}`}>
        <button className="btn-product ">查看详情</button>
        </Link>
      }
      {

        this.props.templeteAuthority &&  
        <Link  className="fr" to={`/Content/ProductManagement/Template/List/${id}`}>
        <button className="btn-product">
       参数模板
        </button>
        </Link>
      }
        
        <div className="clearfix"></div>
        </div>
        </div>        
      </div>
      );
  }
}
export default ListItem;