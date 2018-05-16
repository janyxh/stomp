import React, { PureComponent } from 'react';
import { Form, Input, Select, Button, Radio } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as templateActions from '../../../../actions/template';
import { Title } from '../../../../components';
import { TemplateParameter } from '../../../../components/ProductManagement';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class AddOrEdit extends PureComponent {

  constructor(context, props) {
    super(context, props);
    this.saveTemplate = this.saveTemplate.bind(this);
    this.addParameter = this.addParameter.bind(this);
    this.removeParameter = this.removeParameter.bind(this);
    this.goBack = this.goBack.bind(this);

    this.data = {
      IsForward: true,
    };
    this.state = {
      paramsList: [],
    }
  }
  componentDidMount() {
    this.init()
  }
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  // 保存模板
  saveTemplate(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = values;
        data.paramVOJson = JSON.stringify(this.state.paramsList);
        this.doAction(data).then((res) => {
          if (res.code == "000000") {
            const router = this.context.router;
            const id = this.getProductId();
            router.push(`/Content/ProductManagement/Template/List/${id}`);
          } else {
            alert(res.message);
          }
        })
      }
    });
  }
  init() {
    if (this.isUpdate()) {
      this.props.actions.getTemplate(this.getTemplateId())
    }
  }
  doAction(values) {
    const template = values;

    if (this.isUpdate()) {
      template.templateId = this.getTemplateId();
      return this.props.actions.updateTemplate(template);
    } else {
      template.productId = this.getProductId();
      return this.props.actions.addTemplate(template);
    }
  }
  getProductId() {
    const location = this.context.router.location;
    return location.query.productId;
  }
  getTemplateId() {
    const router = this.context.router;
    return router.params.id;
  }
  isUpdate() {

    const role = this.getTemplateId();
    if (typeof role != 'undefined') {
      return true;
    }
    return false;
  }
  addParameter(value) {

    const list = [...this.state.paramsList];
    const isExtis = list.find((item) => {
      return value.name == item.name;
    });
    if (isExtis) {
      return;
    }
    list.push(value)
    this.setState({
      paramsList: list,
    });

  }
  removeParameter(value) {

    let list = [...this.state.paramsList];
    list = list.filter((item, index) => {
      return value.name != item.name
      })
      this.setState({
        paramsList: list,
      })
    }
    render() {

      let data = null;
      if (this.isUpdate()) {
        if (!this.props.template.loaded) {
          return <div></div>;
        } else {
          data = this.props.template.data;
        }
      } else {
        data = this.data;
      }
      const {getFieldDecorator} = this.props.form;
      const formItemLayout = {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 14
        },
      };

      return (
        <div>
      <Title text="基础信息" />
      <div className="view-content">
      <Form >
              <FormItem
        {...formItemLayout}
        label="模板名称"
        
        >
          {getFieldDecorator('name', {
          initialValue: data.name,
          rules: [{
            required: true,
            message: '请输入模板名称!',
          }],
        })(
          <Input type="text"  />
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="大小端"
        
        >
          {getFieldDecorator('endian', {
          initialValue: data.endian,
          rules: [{
            required: true,
            message: '请选择大小端!',
          }],
        })(
          <Select placeholder="请选择分类">
              <Option value="0">小字节序</Option>
              <Option value="1">大字节序</Option>
            </Select>
        )}
        </FormItem>
             <FormItem
        {...formItemLayout}
        label="是否转发"
        
        >
          {getFieldDecorator('forwardFlag', {
          initialValue: data.forwardFlag,
          rules: [{
            required: true,
            message: '请选择是否转发!',
          }],
        })(
          <RadioGroup >
        <Radio value="1">转发</Radio>
        <Radio value="0">不转发</Radio>
      </RadioGroup>
        )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="数据保存类型"
        
        >
          {getFieldDecorator('storageType', {
          initialValue: data.storageType,
          rules: [{
            required: true,
            message: '请选择数据保存类型!',
          }],
        })(


          <Select placeholder="请选择分类">
              <Option value="0">不保存数据</Option>
              <Option value="1">只保存最后一条数据</Option>
              <Option value="2">保存全部数据</Option>
            </Select>

        )}
  
              </FormItem>
      </Form>

 
      </div>
       <Title text="参数信息" />
          <TemplateParameter
        ref="templateParameter"
        paramsList={this.state.paramsList}
        addParameter={this.addParameter}
        removeParameter = {this.removeParameter}
        />
             <Form  onSubmit={this.saveTemplate}>
       <FormItem {...formItemLayout}  label=" "
        >
      <span className ="mr60">
          <Button type="primary" htmlType="submit" size="large">创建</Button>
        </span>
          <Button type="ghost" onClick={this.goBack} size="large">取消</Button>
   
      
           </FormItem>
      </Form>
      </div>
        );

    }
  }
  AddOrEdit.contextTypes = {
    router: React.PropTypes.object
  }
  AddOrEdit = Form.create({})(AddOrEdit);
  function mapStateToProps(state) {
    return {
      template: state.template,
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
  )(AddOrEdit);