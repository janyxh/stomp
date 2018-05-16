import React, { PureComponent } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, message, Button, TreeSelect } from 'antd';
import { Link } from 'react-router';
import { Title } from '../../'

const FormItem = Form.Item;
const Option = Select.Option;

message.config({
  top: 80,
  duration: 2,
});

class HostInfo extends PureComponent {

  constructor(context, props) {
    super(context, props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeType = this.changeType.bind(this);
    this.technicalTypeChange = this.technicalTypeChange.bind(this);
    this.checkModelId = this.checkModelId.bind(this);
    this.goBack = this.goBack.bind(this);
    this.changeChildTechnicalType = this.changeChildTechnicalType.bind(this);
    this.checkLength = this.checkLength.bind(this);
    this.state = {
      selectTechnicalType: "d499c7d2f8d811e6bdedeca86b8eca77",
      technicalTypeList: [],
      childTechnicalType: [],
      data: {
        //technicalSchemeParentId: "",
      },
      render: true,
    };
    this.BigDev = {
      applicationFirmware: 0,
      coordinatorFirmware: 1,
      systemFirmware: 2,
    };
    this.smallDev = {
      applicationFirmware: 5,
      coordinatorFirmware: 1,
      systemFirmware: 6,
    }
    this.other = {
      applicationFirmware: null,
      coordinatorFirmware: null,
      systemFirmware: null,
    }
  }

  componentDidMount() {
    this.init()
  }

  doAction(values) {
    const product = values;
    if (this.isUpdate() && this.isHostInfoUpdata()) {
      product.productId = this.getProductId();
      product.id = this.props.product.data.techinqueInfo.id;
      return this.props.updateTechniqueInfo(product);
    } else {
      product.productId = this.getProductId();
      return this.props.addTechniqueInfo(product);
    }
  }
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        if (!this.isUpdate()) {
          values.productId = this.props.id;
          this.props.addTechniqueInfo(values).then((res) => {
            if (res.code == '000000') {
              const router = this.context.router;
              router.push('/Content/ProductManagement/List');
            } else {
              alert(res.message);
            }
          })
          return;
        }
        this.doAction(values).then((res) => {
          if (res.code == "000000") {
            message.success('保存成功');

          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  error() {
    message.error('请先添加基本信息！');
  }
  init() {
    if (this.isUpdate()) {
      this.props.getProduct(this.getProductId()).then((res) => {
        this.props.GetTechnicalType().then((res) => {
          this.setState({
            technicalTypeList: res.data,
          })
        }).then((res) => {
          if (!this.isHostInfoUpdata()) {
            return;
          }
          // 把默认值赋值到 state上
          if (this.props.product.data.techinqueInfo) {

            let {applicationFirmware, coordinatorFirmware, systemFirmware, technicalSchemeParentId, modelId} = this.props.product.data.techinqueInfo;
            if (this.props.product.data.techinqueInfo.technicalSchemeParentId == '' || this.props.product.data.techinqueInfo.technicalSchemeParentId == null) {
              technicalSchemeParentId = this.props.product.data.techinqueInfo.technicalSchemeId;
            } else {
              const id = this.props.product.data.techinqueInfo.technicalSchemeParentId;
              if (id == "d499c7d2f8d811e6bdedeca86b8eca77") {

                const newState = {
                  ...this.state.data,...{
                        applicationFirmware: 4,
                  }
                };
                this.setState({
                  render: false,
                  data: newState,
                }, () => {
                  this.setState({
                    render: true
                  })
                }
                );
              // return;
              }
              this.props.GetChildTechnicalType(id).then((res) => {
                res.data && this.setState({
                  childTechnicalType: res.data,
                  selectTechnicalType: id,
                });
                if (this.props.product.data.techinqueInfo.technicalSchemeId) {
                  this.props.form.setFieldsValue({
                    technicalSchemeId: this.props.product.data.techinqueInfo.technicalSchemeId
                  })
                }
                //this.changeChildTechnicalType(this.props.product.data.techinqueInfo.technicalSchemeId);

              })

            }
            const newState = {
              ...this.state.data,...{
                    applicationFirmware,
                    coordinatorFirmware,
                    systemFirmware,
                    modelId,
                    technicalSchemeParentId
              }
            };
            this.setState({
              data: newState,
            })
          }


        })
      })
    }
    this.props.GetTechnicalType().then((res) => {
      this.setState({
        technicalTypeList: res.data,
      })
    })
  }

  getProductId() {
    const router = this.context.router;
    return router.params.id;
  }
  isHostInfoUpdata() {
    return (typeof this.props.product.data != "undefined") && this.props.product.data.techinqueInfo != null && (typeof this.props.product.data.techinqueInfo != "undefined")
  }
  isUpdate() {
    const productId = this.getProductId();
    if (typeof productId != 'undefined') {
      return true;
    }
    return false;
  }
  technicalTypeChange(id) {

    // 类型wifi 时，改变默认值
    if (id == "d499c7d2f8d811e6bdedeca86b8eca77") {

      const newState = {
        ...this.state.data,...{
              applicationFirmware: 4,
        }
      };
      this.setState({
        render: false,
        data: newState,
      }, () => {
        this.setState({
          render: true
        })
      }
      );
    // return;
    }
    this.props.GetChildTechnicalType(id).then((res) => {
      res.data && this.setState({
        childTechnicalType: res.data,
        selectTechnicalType: id,
      })
      if (res.data && res.data[0] && res.data[0].id) {
        this.props.form.setFieldsValue({
          technicalSchemeId: res.data[0].id
        })
        this.changeChildTechnicalType(res.data[0].id);
      }

    })
  }
  checkLength(rule, value, callback) {
    if (value && value.length > 2) {
      callback('长度不超过两位');
    }
    callback();
  }
  changeChildTechnicalType(value) {
    let data = {};
    if (value == "d499ddc9f8d811e6bdedeca86b8eca77") {
      data = {
        ...this.state.data,...this.BigDev
      };

    } else if (value == "d499e5c1f8d811e6bdedeca86b8eca77") {
      data = {
        ...this.state.data,...this.smallDev
      };
    } else {
      data = {
        ...this.state.data,...this.other
      };
    }
    this.setState({
      selecedItem: value,
      data,
      render: false,
    }, () => {
      this.setState({
        render: true,
      })
    })
  }
  checkModelId(rule, value, callback) {
    if (value) {
      this.props.checkModelId(value).then((res) => {

        if (res.code == '050021') {
          callback('ModelId不存在');
        } else {
          callback();
        }
      })
    } else {
      callback();
    }

  }
  changeType(value) {
    this.setState({
      type: value,
    });

  }


  render() {


    let data = null;

    if (this.state.technicalTypeList.length <= 0) {
      return <div></div>;
    }
    if (this.isUpdate()) {
      if (!this.props.product.loaded) {
        return <div></div>;
      }

    }
    data = this.state.data;
    const technicalTypeOptions = this.state.technicalTypeList.map((item, index) => {
      return <Option key={item.id}>{item.name}</Option>;
    });
    const childTechnicalTypeOptions = this.state.childTechnicalType.map((item, index) => {
      return <Option key={item.id}>{item.name}</Option>;
    });

    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    let comp = null;
    let selComp = null;


    if (this.state.selectTechnicalType != "d499c7d2f8d811e6bdedeca86b8eca77") {
      selComp = (
        <Col span={12}>
               {getFieldDecorator('technicalSchemeId', {
          initialValue: data.technicalSchemeId,
          rules: [{
            required: true,
            message: '请选择分类!',
          }],
        })(
          <Select
          onChange={this.changeChildTechnicalType}
          placeholder="请选择分类"
          >
      {childTechnicalTypeOptions}
    </Select>
        )}
              </Col>
      )

      comp = this.state.render && (
        <div>
     <FormItem
      style={{
              display:'none'
            }}
        {...formItemLayout}
        label="协调器固件"

        >
          {getFieldDecorator('coordinatorFirmware', {
          initialValue: data.coordinatorFirmware,
          rules: [{
            required: true,
            message: '请输入协调器固件,长度不超过2位!',
          // max: 2,
          },
            {

              validator: this.checkLength,
            }

          ],
        })(
          <Input type="text"  />
        )}
        </FormItem>
                   <FormItem
                    style={{
              display:'none'
            }}
        {...formItemLayout}
        label="系统固件"

        >
          {getFieldDecorator('systemFirmware', {
          initialValue: data.systemFirmware,
          rules: [{
            required: true,
            message: '请输入系统固件,长度不超过2位!',
          // max: 2,
          },
            {

              validator: this.checkLength,
            }

          ],
        })(
          <Input type="text" />
        )}
        </FormItem>
        </div>
      )
    }
    return (
      <div>
      <Title text="技术信息" />
      <div className="view-content">
      <Form onSubmit={this.handleSubmit}>
            <FormItem
      {...formItemLayout}
      label="技术方案"

      >
            <Row gutter={8}>
            <Col span={12}>
             {getFieldDecorator('technicalSchemeParentId', {
        initialValue: data.technicalSchemeParentId,
        rules: [{
          required: true,
          message: '请选择技术方案!',
        }],
      })(
        <Select
        onChange={this.technicalTypeChange}
        placeholder="请选择技术方案"
        >
      {technicalTypeOptions}
    </Select>
      )}
             </Col>
             {

      selComp
      }
              
              </Row>
        </FormItem>
        {

      (() => {
        if (this.state.render) {

          return (
            <FormItem
            style={{
              display:'none'
            }}
            {...formItemLayout}
            label="应用固件"
            >
          {getFieldDecorator('applicationFirmware', {
              initialValue: data.applicationFirmware,
              rules: [{
                required: true,
                message: '请填写应用固件,最大长度为2',

              },
                {

                  validator: this.checkLength,
                }

              ],
            })(
              <Input type="text" />
            )}
        </FormItem>

          )
        }


      })()

      }
     
             {comp}
          <FormItem
      {...formItemLayout}
      label="Model ID"

      >
          {getFieldDecorator('modelId', {
        initialValue: data.modelId,
        rules: [{
          required: true,
          message: '请输入modelID!',
        },
          {
            validator: this.checkModelId,
          }
        ],
      })(
        <Input type="text"  />
      )}
        </FormItem>
        <FormItem {...formItemLayout}  label=" "
      >
      <span className ="mr60">
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </span>
          <Button type="ghost" onClick={this.goBack} size="large">返回</Button>
        </FormItem>
      </Form>
      </div>
      </div>
      );
  }
}
HostInfo.contextTypes = {
  router: React.PropTypes.object
}
HostInfo = Form.create({})(HostInfo);



export default HostInfo;