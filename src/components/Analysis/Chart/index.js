import React, { PureComponent, Component } from 'react';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';
const houers = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
  // const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

class Chart extends Component {
  constructor(context, props) {
    super(context, props);
    this.option = {
      title: {
        text: '用户新增趋势',
      },
      color: ["#48a9f0"],
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: false,
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: houers
        }
      ],
      yAxis: [
        {
          type: 'value',
        }
      ],
      grid: {
        left: 50,

      },
      series: [
        {
          name: '新增',
          type: 'line',
          symbolSize: 10,
          data: [200, 400, 10, 800, 150, 500, 1400],
          markPoint: {
            data: [
              {
                type: 'max',
                name: '最大值'
              },
              {
                type: 'min',
                name: '最小值'
              }
            ]
          },
          markLine: {
            data: [
              {
                type: 'average',
                name: '平均值'
              }
            ]
          }
        }
      ]
    };
  }
  // 计算横坐标
  getXAxis() {
    const {beginDate, endDate, list} = this.props;
    const a = moment(endDate);
    const b = moment(beginDate);
    if (a.diff(b, 'days') == 1) {
      return houers;
    }
    if (a.diff(b, 'days') < 10) {
      const data = [];
      data.push(b.format('YYYY-MM-DD'))
      for (let i = 0; i < 8; i++) {
        data.push(a.add(1, 'days').format('YYYY-MM-DD'));
      }
      data.push(a.format('YYYY-MM-DD'))
      return data;
    }
    if (a.diff(b, 'days') >= 10) {
      const data = [];
      data.push(b.format('YYYY-MM-DD'))
      const diff = a.diff(b, 'days');
      const length = diff % 10;
      let dur = null;
      if (length >= 5) {
        dur = diff / 10 + 1;
      } else if (length > 0 && length <= 5) {
        dur = diff / 10 - 1;
      } else {
        dur = diff / 10;
      }
      for (let i = 0; i < 8; i++) {
        data.push(a.add(dur, 'days').format('YYYY-MM-DD'));
      }
      data.push(a.format('YYYY-MM-DD'))
      return data;
    }
  }
  createXAxis(list) {}
  componentWillReceiveProps(nextProps) {}
  render() {
    const {title, list} = this.props;
    this.option.title.text = title;


    if (list) {
      const countList = list.map((item, index) => {
        return item.count;
      })
      const keyList = list.map((item, index) => {
        return item.key;
      })

      this.option.xAxis[0].data = keyList;
      this.option.series[0].data = countList;
    }

    return (
      <ReactEcharts
      option={this.option}
      notMerge={true}
      lazyUpdate={true}
      theme={"macarons"}
      style={{
        height: 400,
        width: '100%'
      }}
      />);
  }
}
export default Chart;
