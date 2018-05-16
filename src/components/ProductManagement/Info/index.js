import React, { PureComponent } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TreeSelect } from 'antd';
import { Link } from 'react-router';
import  { Title }  from '../../'
const FormItem = Form.Item;
const Option = Select.Option;


class Info extends PureComponent {

  constructor(context, props) {
    super(context, props);

  }
  render() {

    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    const data = this.props.data;
    return (
      <div>
      <Title text="基本信息" />
      <div className="view-content">
      <Form onSubmit={this.handleSubmit}>
        <FormItem
      {...formItemLayout}
      label="产品类别"
      
      >
        <span className="ml30 fc">
           {data.productTypeParentName}
           </span>
        </FormItem>
        <FormItem
      {...formItemLayout}
      label="产品名称"
      
      >
      <span className="ml30 fc">
         {data.name}
         </span>
        </FormItem>
             <FormItem
      {...formItemLayout}
      label="产品型号"
      
      >
        <span className="ml30 fc">
         { data.model }
         </span>
        </FormItem>
                   <FormItem
      {...formItemLayout}
      label="内部型号"
      
      >
       <span className="ml30 fc">
         { data.internalModel || '无'}
          </span>
        </FormItem>
          <FormItem
      {...formItemLayout}
      label="品牌名称"
      
      >
      <span className="ml30 fc">
       {
      data.brandName

      }
      </span>
           
         
        </FormItem>
        <FormItem
      {...formItemLayout}
      label="所属公司"
      
      >
          <span className="ml30 fc">
            {data.manufName}
            </span>
        </FormItem>
             <FormItem
      {...formItemLayout}
      label="产品简介"
      
      >
          <span className="ml30 fc">
            {
      data.introduction || "无"
      }
      </span>
        </FormItem>
      </Form>
      </div>

          <div>
      <Title text="技术信息" url={`/Content/ProductManagement/AddOrEdit/${data.id}`} />
      <div className="view-content">
      <Form onSubmit={this.handleSubmit}>
            <FormItem
      {...formItemLayout}
      label="技术方案"
      
      >
       <span className="ml30 fc">
        { (data.techinqueInfo && data.techinqueInfo.technicalSchemeName) || "无"}
        </span>
        </FormItem>
        <FormItem
      {...formItemLayout}
      label="应用固件"
      
      >
      <span className="ml30 fc">
          { (data.techinqueInfo && data.techinqueInfo.applicationFirmware) || '无'}
          </span>
        </FormItem>

        {

          (()=>{
            if (data.techinqueInfo && data.techinqueInfo.technicalSchemeName != "WiFi") {

              return (
                <div>
                 <FormItem
      {...formItemLayout}
      label="协调器固件"
      
      >
            <span className="ml30 fc">
            { data.techinqueInfo && data.techinqueInfo.coordinatorFirmware}
            </span>
        </FormItem>
                   <FormItem
      {...formItemLayout}
      label="系统固件"
      
      >
      <span className="ml30 fc">
            { data.techinqueInfo &&   data.techinqueInfo.systemFirmware}
            </span>
        </FormItem>
</div>
                )

            }


          })()


        }
          
          <FormItem
      {...formItemLayout}
      label="Model ID"
      
      >
      <span className="ml30 fc">
          {  (data.techinqueInfo &&  data.techinqueInfo.modelId) || '无'}
          </span>
        </FormItem>
        <FormItem  >
        {
        this.props.editAuthority && 
          <Link to={`/Content/ProductManagement/AddOrEdit/${data.id}`} style={{marginLeft:70}}>
        <button className="btn">编辑</button>
        </Link>
        }
      
      {

      this.props.deleteAuthority && 
               <button className="btn ml30 fc" onClick={this.props.deleteProduct} style={{

        backgroundColor: 'red',
        color: '#fff'
      }}>删除</button>
      }
 
         <Link to={`/Content/ProductManagement/?currentPage=${this.props.currentPage}`} className="ml30 fc">
        <button className="btn">返回</button>
        </Link>


        </FormItem>
      </Form>
      </div>
      </div>
          
      </div>
      );
  }
}

Info = Form.create({})(Info);

export default Info;
