import React, { PureComponent } from 'react';
import { Form, Input, Select, Table, Button, Radio, Col, Row } from 'antd';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as templateActions from '../../../actions/template';
import { Title } from '../../';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;




class TemplateParameter extends PureComponent {

  constructor(context, props) {
    super(context, props);

    this.saveParameter = this.saveParameter.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      isString: true,
    }
    this.data = {
      IsForward: true,
    }
    this.columns = [{
      title: '参数名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      render:(text,record)=>{
        switch(text){
          case "6":
          return "string";
          case "0":
          return "int8";
          case "1":
          return "uint8";
           case "2":
          return "int16";
           case "3":
          return "uint16";
           case "4":
          return "int32";
            case "5":
          return "uint32";
        }
      }
    }, {
      title: '数据长度',
      dataIndex: 'length',
      key: 'length',
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
        <span>
      <a  onClick={this.props.removeParameter.bind(null, text)} >删除</a>
    </span>
        ),
      }

    ];
  }
  componentDidMount() {
    this.init()
  }


  // 保存模板对应的参数
  saveParameter(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        this.props.addParameter(values);
        this.props.form.resetFields();
        console.log('Received values of form: ', values);
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
      this.props.actions.updateTemplate(template);
    } else {
      this.props.actions.addTemplate(template);
    }
  }
  getTemplateId() {
    const router = this.context.router;
    return router.params.id;
  }
  onSelect(value) {
    console.log(value)
    if (value == "6") {
      this.setState({
        isString: true,
      })
    } else {

      this.setState({
        isString: false,
      })
    }
  }
  isUpdate() {

    const role = this.getTemplateId();
    if (typeof role != 'undefined') {
      return true;
    }
    return false;
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

             <div className="view-content">
              <Form style={{
        marginLeft: 0
      }} onSubmit={this.saveParameter} > 
             
             <FormItem
      {...formItemLayout}
      label="参数名称"
      
      >

      <Row gutter={12}>
        <Col span={23}>
           {getFieldDecorator('name', {
        initialValue: data.name,
        rules: [{
          required: true,
          message: '请输入参数名称!',
        }],
      })(
        <Input type="text" className="ant-input-lg"  />

      )}
        </Col>
             <Col span={1}>
             <Button style={ {
        position: 'absolute',
        marginLeft: 10,
      }
      } type="primary" htmlType="submit" size="large">创建</Button>
             </Col>
      </Row>
       
        </FormItem>
              
             <FormItem
      {...formItemLayout}
      label="数据类型"
      
      >
          {getFieldDecorator('type', {
        initialValue: data.type,
        rules: [{
          required: true,
          message: '请选择数据类型!',
        }],
      })(

        <Select placeholder="请选择分类" onChange={this.onSelect} >
              <Option value="6">string</Option>
              <Option value="0">int8</Option>
              <Option value="1">uint8</Option>
              <Option value="2">int16</Option>
              <Option value="3">uint16</Option>
              <Option value="4">int32</Option>
              <Option value="5">uint32</Option>
            </Select>
      )}
        </FormItem>
                 {

      (() => {
        if (this.state.isString) {
          return (
            <FormItem
            {...formItemLayout}
            label="数据长度"
            
            >
          {getFieldDecorator('length', {
              initialValue: data.length,
              rules: [{
                required: true,
                message: '请输入数据长度!',

              }],
            })(
              <Input type="text"   />
            )}
        </FormItem>
            )
        }
      })()

      }
                      <FormItem
      {...formItemLayout}
      label=" "

      >
          {getFieldDecorator('model')(

        <Table columns={this.columns} dataSource={this.props.paramsList} />

      )}
        </FormItem>

              </Form>
      </div>
      </div>
      );

  }
}
TemplateParameter.contextTypes = {
  router: React.PropTypes.object
}
TemplateParameter = Form.create({})(TemplateParameter);
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
)(TemplateParameter)