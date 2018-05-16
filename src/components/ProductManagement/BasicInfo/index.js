import React, { PureComponent } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Radio,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  message
} from "antd";
import { Link } from "react-router";
import { Title } from "../../";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class BasicInfo extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.productTypeChange = this.productTypeChange.bind(this);
    this.productTypeChildChange = this.productTypeChildChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.once = true;
    this.state = {
      productType: [],
      childType: [],
      seclectType: null,
      vendorList: [],
      data: {
        assortment: "",
        productName: "",
        productCategory: "",
        internalModel: "",
        brandName: "",
        company: "",
        summary: "",
        coordinatorFirmware: "",
        systemFirmware: "",
        scheme: "",
        applicationFirmware: "",
        modelID: "",
        lastModified: ""
      }
    };
  }
  componentDidMount() {
    this.init();
  }
  doAction(values) {
    const product = values;
    if (this.isUpdate()) {
      product.productId = this.getProductId();
      return this.props.actions.updateProduct(product);
    } else {
      return this.props.actions.addProduct(product);
    }
  }
  goBack() {
    const router = this.context.router;
    router.goBack();
  }
  productTypeChange(value) {
    this.props.GetChildProductType(value).then(res => {
      this.setState({
        childType: res.data
      });
      // 编辑 只执行一次
      if (this.isUpdate()) {
        !this.once &&
          this.props.form.setFieldsValue({
            productTypeId: res.data[0].id
          });
        this.once = false;
      } else {
        this.once &&
          this.props.form.setFieldsValue({
            productTypeId: res.data[0].id
          });
      }
    });
  }
  productTypeChildChange(value) {
    this.setState({
      seclectType: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = values;
        this.doAction(data).then(res => {
          if (res.code == "000000") {
            // this.props.form.resetFields();
            if (!this.isUpdate()) {
              this.props.onShowSecond(res.data.id);
              return;
            }
            message.success("保存成功");
            // 保存成功
            // const router = this.context.router;
            // router.push('/Content/ProductManagement/List');
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
  onStatusChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  init() {
    if (this.isUpdate()) {
      this.props.getProduct(this.getProductId()).then(() => {
        this.props.getVendorList().then(res => {
          this.setState({
            vendorList: res.data
          });
        });
        this.props
          .GetProductType()
          .then(res => {
            this.setState({
              productType: res.data
            });
          })
          .then(() => {
            const id = this.props.product.data.productTypeParentId;
            this.productTypeChange(id);
          });
      });
    } else {
      this.props.getVendorList().then(res => {
        this.setState({
          vendorList: res.data
        });
      });
      this.props.GetProductType().then(res => {
        this.setState({
          productType: res.data
        });
      });
    }
  }
  doAction(values) {
    const product = values;

    if (this.isUpdate()) {
      product.id = this.getProductId();
      return this.props.updateProduct(product);
    } else {
      return this.props.addProduct(product);
    }
  }
  getProductId() {
    const router = this.context.router;
    return router.params.id;
  }
  isUpdate() {
    const productId = this.getProductId();
    if (typeof productId != "undefined") {
      return true;
    }
    return false;
  }
  render() {
    let data = null;
    if (this.isUpdate()) {
      if (!this.props.product.loaded) {
        return <div />;
      } else {
        data = this.props.product.data;
      }
    } else {
      data = this.state.data;
    }
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    };
    if (this.state.productType.length <= 0) {
      return <div />;
    }
    const vendorListOptions = this.state.vendorList.map((item, index) => {
      return <Option key={item.id}>{item.name}</Option>;
    });
    const productTypeOptions = this.state.productType.map((item, index) => {
      return <Option key={item.id}>{item.name}</Option>;
    });
    const childTypeOptions = this.state.childType.map((item, index) => {
      return <Option key={item.id}>{item.name}</Option>;
    });
    const text = (
      <span>
        <div>
          完全托管：厂商不参与软件研发，不能自行新增产品以及自定义参数模板，适合无软件研发团队的厂商
        </div>
        <div>
          半托管：厂商可参与软件研发，可自行新增产品或自定义参数模板，适合有软件研发团队对接的厂商
        </div>
      </span>
    );
    return (
      <div>
        <Title text="基本信息" />
        <div className="view-content">
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="产品类别">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("productTypeParentId", {
                    initialValue: data.productTypeParentId,
                    rules: [
                      {
                        required: true,
                        message: "请选择分类!"
                      }
                    ]
                  })(
                    <Select
                      placeholder="请选择分类"
                      onChange={this.productTypeChange}
                    >
                      {productTypeOptions}
                    </Select>
                  )}

                </Col>
                <Col span={12}>
                  {getFieldDecorator("productTypeId", {
                    initialValue: data.productTypeId,
                    rules: [
                      {
                        required: true,
                        message: "请选择分类!"
                      }
                    ]
                  })(
                    <Select
                      placeholder="请选择分类"
                      onChange={this.productTypeChildChange}
                    >
                      {childTypeOptions}
                    </Select>
                  )}
                </Col>
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="产品名称">
              {getFieldDecorator("name", {
                initialValue: data.name,
                rules: [
                  {
                    required: true,
                    message: "请输入产品名称!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="产品型号">
              {getFieldDecorator("model", {
                initialValue: data.model,
                rules: [
                  {
                    required: true,
                    message: "请输入产品型号!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="内部型号">
              {getFieldDecorator("internalModel", {
                initialValue: data.internalModel
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="品牌名称">
              {getFieldDecorator("brandName", {
                initialValue: data.brandName,
                rules: [
                  {
                    required: true,
                    message: "请输入品牌名称!"
                  }
                ]
              })(<Input type="text" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="所属公司">
              {getFieldDecorator("manufId", {
                initialValue: data.manufId,
                rules: [
                  {
                    required: true,
                    message: "请输入所属公司!"
                  }
                ]
              })(
                <Select placeholder="请输入所属公司">
                  {vendorListOptions}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品简介">
              {getFieldDecorator("introduction", {
                initialValue: data.introduction,
                rules: [
                  {
                    required: false,
                    message: "请输入产品简介!"
                  }
                ]
              })(<Input type="textarea" rows={8} />)}
            </FormItem>
            <FormItem {...formItemLayout} label=" ">
              <span className="mr60">
                <Button type="primary" htmlType="submit" size="large">
                  {this.props.second ? "保存" : "保存 , 下一步"}
                </Button>
              </span>
              <Button type="ghost" onClick={this.goBack} size="large">
                返回
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
BasicInfo.contextTypes = {
  router: React.PropTypes.object
};
BasicInfo = Form.create({})(BasicInfo);

export default BasicInfo;
