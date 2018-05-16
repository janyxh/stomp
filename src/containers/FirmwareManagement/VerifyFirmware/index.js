import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Input, Button, Radio, Form, Icon, Select, Col, Row, } from 'antd';
import { Title } from '../../../components';
import { getFirmwarByUID, updateDevFirmware, getFirmware,getFirmwarListByUID } from '../../../actions/firmware';
import { FilterFirmware, FirmwareInfo } from '../../../components/FirmwareManagement';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
class VerifyFirmware extends PureComponent {
  constructor(context, props) {
    super(context, props);
    this.onSearch = this.onSearch.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      disabled: false,
      firmwareInfo: null,
      value: '',
      list: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getFirmwareId() {
    const router = this.context.router;
    return router.params.id;
  }
  getData() {
    this.props.actions.getFirmware(this.getFirmwareId()).then((res) => {
      this.setState({
        data: res.data,
      });
    });
  }
  async onSearch() {
    const uid = this.props.form.getFieldValue('uid').trim();
    if (!uid) {
      return;
    }
    const firmwareId = this.state.data.id;
    const res = await getFirmwarByUID(uid, {
      firmwareId
    });

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
      } else {
        if (res.data.deviceFirmwareMatch == '1') {
          this.setState({
            firmwareInfo: res.data,
            disabled: false,
          });
        } else {
          this.props.form.setFields({
            uid: {
              value: uid,
              errors: [new Error('当前固件不适用于此类型的设备，请更换设备')],
            },
          });
          this.setState({
            firmwareInfo: res.data,
            disabled: true,
          });
        }

      }
    } else {
      alert(res.message);
    }
  }
  upgrade() {
    const firmware = this.state.data;
    const firmwareInfo = this.state.firmwareInfo;
    const type = firmware.types;
    const data = {
      uid: firmwareInfo.deviceUid,
      firmwareId: firmware.id,
      modelId: firmwareInfo.modelId,
      type,
      zhijiaAccount: firmwareInfo.zhijiaAccount,
      hardwareVersion: firmwareInfo.hardwareVersion,
      uidCommonFlag: firmwareInfo.uidCommonFlag,
    };
    switch (type) {
      case '0':
        data.appFirmwareVersion = firmwareInfo.appFirmwareVersion;
        break;
      case '1':
        data.coordinatorFirmwareVersion = firmwareInfo.coordinatorFirmwareVersion;
        break;
      case '2':
        data.systemFirmwareVersion = firmwareInfo.systemFirmwareVersion;
        break;
      case '3':
        data.mcuFirmwareVersion = firmwareInfo.mcuFirmwareVersion;
        break;
    }


    updateDevFirmware(data).then(res => {
      if (res.code == '000000') {
        const router = this.context.router;
        router.push('/Content/UpgradeLogs?flag=1');
      } else {
        alert(res.message);
      }
    })
  }

  handleChange(value) {
    this.setState({
      value,
      list: [],
      fetching: false,
    });
    getFirmwarListByUID({
      uid: value
    }).then(res => {

      this.setState({
        list: res.data,
        fetching: false,
      })
    });
  }
  render() {

    const {getFieldDecorator} = this.props.form;
    const options = this.state.list.map(d => <Option key={d}>{d}</Option>);
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };
    if (!this.state.data) {
      return <div></div>;
    }
    return (
      <div>

     <Title text="指定设备" />
           <div className="view-content">
           <div className="fc mt30">
             为了确保固件（{this.state.data.originName}）可用，正式发布前，请先指定设备进行固件测试
           </div>
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
            message: '请输入设备的Mac地址',
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
      <div>
                 <div className="firmwareInfo">

                <FirmwareInfo data={ this.state.firmwareInfo } />
           </div>

           <div className="view-content mt30">
          <Button disabled={this.state.disabled} onClick={this.upgrade} type="primary" size="large">升级</Button>
           </div>
              </div>
      )
      }


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
    actions: bindActionCreators(
      {
        getFirmware,
      }, dispatch),

  };
}
VerifyFirmware.contextTypes = {
  router: React.PropTypes.object,
};
VerifyFirmware = Form.create({})(VerifyFirmware);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyFirmware);
