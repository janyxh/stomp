import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getFirmwarByUID, getFirmwarListByProduct, updateDevFirmware, getFirmwarListByUID } from '../../actions/firmware';
import { Input, Button, Radio, Form, Modal, Col, Row, Select, Spin } from 'antd';
import { Title } from '../../components';
import { FilterFirmware, FirmwareInfo } from '../../components/FirmwareManagement';
import keyboardImg from './keyboard.svg';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class Keyboard extends PureComponent {
  render() {
    return <img src={keyboardImg} width="32"  />;
  }
}

class FirmwareUpgrade extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.handleCancel = this.handleCancel.bind(this);
    this.upGradeFirmware = this.upGradeFirmware.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.changeType = this.changeType.bind(this);
    this.handleChange = this.handleChange.bind(this);

     this.lastFetchId = 0;
    this.state = {
      visible: false,
      disabled: true,
      list: [],
      value: '',
      data: [],
      newRandomKey: +new Date(),
      firmwareInfo: null,
    };
  }

  componentDidMount() {}

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);

      }
    });
  }
  changeType(e) {

    this.clear();
  }

  clear() {

    this.props.form.setFieldsValue({
      data: '',
    });
    this.setState({
      selectedRowKeys: null,
      disabled: true,
    })
  }
  async onSearch() {
    const uid = this.props.form.getFieldValue('uid').trim();
    if (!uid) {
      return;
    }
    const res = await getFirmwarByUID(uid);
    if (res.code == '000000') {
      if (!res.data.deviceUid) {
        this.props.form.setFields({
          uid: {
            value: uid,
            errors: [new Error('查找不到设备，请核对输入信息或检查设备是否在线')],
          },
        });
        this.setState({
          firmwareInfo: null,
        });
        this.clear();
      } else {
        this.setState({
          firmwareInfo: res.data,
          disabled: true,
        });
      }
    } else {
      alert(res.message);
    }


  }
  onSelectChange(selectedRowKeys) {
    const data = this.state.productFirmwareList.find(item => {
      return item.id == selectedRowKeys[0];
    })
    this.props.form.setFieldsValue({
      data: data.originName,

    });

    this.setState({
      selectedRowKeys,
      disabled: false,
      visible: false,
    })
  }
  showModal() {
    if (!this.state.firmwareInfo) {
      this.props.form.setFields({
        uid: {
          value: null,
          errors: [new Error('查找不到设备，请核对输入信息或检查设备是否在线')],
        },
      })
      return;
    }
    const {productId, modelId, hardwareVersion, mcuFirmwareVersion, appFirmwareVersion, coordinatorFirmwareVersion, systemFirmwareVersion} = this.state.firmwareInfo;
    const type = this.props.form.getFieldValue('type');
    const filterCondition = {
      type,
      hardwareVersion,
      modelId,
      pageNo: 1,
      pageSize: 100000,
    };
    switch (type) {
      case '0':
        filterCondition.hardwareVersion = appFirmwareVersion || 'null';
        break;
      case '1':
        filterCondition.hardwareVersion = coordinatorFirmwareVersion || 'null';
        break;
      case '2':
        filterCondition.hardwareVersion = systemFirmwareVersion || 'null';
        break;
      case '3':
        filterCondition.hardwareVersion = mcuFirmwareVersion || 'null';
        break;
    }
    getFirmwarListByProduct(modelId, filterCondition).then(res => {
      let list = res.data.rows;
      list = list.map(item => {
        item.key = item.id;
        return item;
      })
      if (res.code == '000000') {
        this.setState({
          productFirmwareList: list,
        });
      } else {
        alert(res.message);
      }
    })
    // 加载固件列表
    this.setState({
      visible: true,
      newRandomKey: +new Date(),
    });
  }
  handleCancel() {
    //this.refs.VerifyCode.clear()
    this.setState({
      visible: false,
    });
  }
  upGradeFirmware() {
    const firmware = this.state.firmwareInfo;
    const firmwareInfo = this.state.productFirmwareList.find(item => {
      return item.id == this.state.selectedRowKeys[0];
    })
    const type = this.props.form.getFieldValue('type');
    const data = {
      uid: firmware.deviceUid,
      firmwareId: firmwareInfo.id,
      modelId: firmware.modelId,
      type,
      zhijiaAccount: firmware.zhijiaAccount,
      hardwareVersion: firmware.hardwareVersion,
      uidCommonFlag: firmware.uidCommonFlag,
    };
    switch (type) {
      case '0':
        data.appFirmwareVersion = firmware.appFirmwareVersion || 'null';
        break;
      case '1':
        data.coordinatorFirmwareVersion = firmware.coordinatorFirmwareVersion || 'null';
        break;
      case '2':
        data.systemFirmwareVersion = firmware.systemFirmwareVersion || 'null';
        break;
      case '3':
        data.mcuFirmwareVersion = firmware.mcuFirmwareVersion || 'null';
        break;
    }

    updateDevFirmware(data).then(res => {
      if (res.code == '000000') {
        const router = this.context.router;
        router.push('/Content/UpgradeLogs?logs=0');
      } else {
        alert(res.message);
      }
    })
  }
  getData() {
    // const productId = 'eda26c33ab62494798fbb81ddc46da7a';
    // this.filterCondition = {
    // };
    // this.filterCondition.pageSize = 100000;
    // this.props.actions.getProductFirmware(productId, this.filterCondition).then(res => {
    //   this.setState({
    //     list: res.data.rows,
    //   });
    // });

  }

  handleChange (value){
    this.setState({
      value,
      data: [],
      fetching: false,
    });
    getFirmwarListByUID({
      uid: value
    }).then(res => {

      this.setState({
      data: res.data,
      fetching: false,
    })});
  }
  render() {
    const data = {};
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    const options = this.state.data.map(d => <Option key={d}>{d}</Option>);
    return (
      <div>

    <Modal
      key={this.state.newRandomKey}
      title="选择固件"
      visible={this.state.visible}
      onCancel={this.handleCancel}
      footer=""
      width='900'
      >
     <FilterFirmware
      list = {this.state.productFirmwareList || []}
      selectedRowKeys = {this.state.selectedRowKeys}
      onSelectChange = {this.onSelectChange}
      />
    </Modal>

     <Title text="选择设备" />
           <div className="view-content">
        <Form>
         <FormItem
      {...formItemLayout}
      label="Mac地址"

      >
          <Row gutter={20}>
            <Col span={16}>
             {getFieldDecorator('uid', {
        rules: [
          {
            required: true,
            message: '请输入设备Mac地址',
          }],
      })(
       <Select
        combobox= {true}
        value={this.state.value}


         notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
        style={{
          height: 40,

        }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
         onChange={this.handleChange}
        >
        {options}
      </Select>
      )}
            </Col>
            <Col>
              <Button type="primary" onClick = {this.onSearch} >查询</Button>
            </Col>
            </Row>

        </FormItem>
        </Form>


           </div>
          {
      this.state.firmwareInfo &&
      (
      <div className="firmwareInfo">

                <FirmwareInfo data = {this.state.firmwareInfo} />

           </div>
      )
      }


             <Title text="选择固件" />
           <div className="view-content">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
      {...formItemLayout}
      label="固件类型"

      >
          {getFieldDecorator('type', {
        initialValue: data.type || "0",
        rules: [
          {
            required: true,
            message: '请输入固件类型',
          }],
      })(
        <RadioGroup onChange={this.changeType} >
        <Radio value={"0"}>应用固件</Radio>
        <Radio value={"1"}>协调器固件</Radio>
        <Radio value={"2"}>系统固件</Radio>
        <Radio value={"3"}>第三方MCU固件</Radio>
      </RadioGroup>
      )}
        </FormItem>
                 <FormItem
      {...formItemLayout}
      label="选择固件"

      >
          {getFieldDecorator('data', {
        rules: [
          {
            required: true,
            message: '请选择固件',
          }],
      }
      )(
        <Input onClick={this.showModal} suffix={<Keyboard />} readOnly />
      )}
        </FormItem>

        <FormItem
      {...formItemLayout}
      label=" "

      >
      <span className ="mr60">
          <Button type="primary" disabled={this.state.disabled} onClick={ this.upGradeFirmware } size="large">升级</Button>
        </span>

        </FormItem>
        </Form>
           </div>
    </div>
      );
  }
}

function mapStateToProps(state) {
  return {

  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getFirmwarByUID
    }, dispatch),
  };
}
FirmwareUpgrade.contextTypes = {
  router: React.PropTypes.object,
};
FirmwareUpgrade = Form.create({})(FirmwareUpgrade);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FirmwareUpgrade);
