import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../../../actions/product';
import { GetProductType, getVendorList } from '../../../actions';
import { ListItem } from '../../../components/ProductManagement';
import { Select, Input, Pagination } from 'antd';
const Search = Input.Search;
const Option = Select.Option;
class List extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onCompanyChange = this.onCompanyChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.filterCondition = {
      pageSize:12,
    };
    this.state = {
      current: 1,
      companyList: [],
      productTypeList: [],
    }
  }
  componentDidMount() {
    this.getData().then(()=>{
          const router = this.context.router;
     let currentPage =  router.location.query.currentPage;
     if (currentPage) {
      currentPage = parseInt(currentPage)
      this.onPageChange(currentPage);
     }
    })
    GetProductType().then((res) => {
      this.setState({
        productTypeList: res.data,
      });
    });
    getVendorList().then((res) => {
      this.setState({
        companyList: res.data,
      });
    
    });

  }

  componentWillReceiveProps(){
    
  }
  onSearch(value) {
    const keyword = value.trim();
    this.filterCondition.productName = keyword;
    this.onPageChange(1);
  }
  onCompanyChange(value) {
    const companyId = value;
    this.filterCondition.manufId = companyId;
    this.onPageChange(1);
  }
  onPageChange(page) {
    this.filterCondition.pageNo = page;
    this.setState((state, props) => { 
      return {
        current: page,
      }
    },()=>{
         
    this.getData();
    });
 
  }
  onCategoryChange(value) {
    const categoryId = value;

    this.filterCondition.productTypeId = categoryId;
    this.onPageChange(1);
  }
  getData() {
    for (let i in this.filterCondition) {
      if (this.filterCondition[i] == "all" || this.filterCondition[i] == null) {
        delete this.filterCondition[i];
      }
    }
   return  this.props.actions.getAllProduct(this.filterCondition);
  }
  addAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "04000001020000"
    })
  }

  viewAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "04000001010000"
    })
  }
  templeteAuthority(){
   return this.props.auth.currUser.authorityVOList.find((item)=>{
      return item.number == "04000001040000"
    })
  }
  render() {
    if (!this.props.productList.loaded) {
      return <div></div>;
    }
    const comp = this.props.productList.data.rows.map((item, index) => {
      return <ListItem {...item} templeteAuthority= {this.templeteAuthority()} currentPage={this.state.current} viewAuthority={this.viewAuthority()}  />;
    });
    const companyListOptions = this.state.companyList.map((item, index) => {
      return <Option key={item.id} >{item.name}</Option>
      });
      const productListOptions = this.state.productTypeList.map((item, index) => {
        return <Option key={item.id} >{item.name}</Option>
        });
        return (<div>
    <div className="productFilter">
    <div className="filterTitle" >所属公司 : </div>
      <Select className="small-select" defaultValue="all" onChange={this.onCompanyChange} >
        <Option value="all">全部</Option>
        {companyListOptions}
      </Select>
       <div className="filterTitle ml41">产品类别 : </div>

      <Select className="small-select" defaultValue="all" onChange={this.onCategoryChange} >
        <Option value="all">全部</Option>
        {productListOptions}
      </Select>
      <div className="fl searchProductBtn">

      
      <Search
          className="searchProduct"
          onSearch={this.onSearch} placeholder="搜索产品名称关键字"

          />
 </div>
        {

          this.addAuthority() &&   <Link to="/Content/ProductManagement/AddOrEdit" className="fr addProductBtn"  > <button className="btn  mr60 ml30" >新增产品</button></Link>
        }  

   
    </div>
       <div className="clearfix"></div>
    <div className="productList">
    {comp}
    </div>
    <div className="clearfix"></div>
    <div className="tc mt50">

    <Pagination
          onChange={this.onPageChange}
          style={{
            display: 'inline-block'
          }}
          showQuickJumper 
          current={this.state.current}
          pageSize={12}
          total={this.props.productList.data.total}

          />
    </div>
    </div>);
      }
    }
    List.contextTypes = {
  router: React.PropTypes.object
}
    function mapStateToProps(state) {
      return {
        productList: state.productList,
        auth: state.auth,
      };
    }
    function mapDispatchToProps(dispatch) {
      return {
        actions: bindActionCreators(productActions, dispatch),
      };
    }
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(List);

