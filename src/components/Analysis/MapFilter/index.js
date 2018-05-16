import React, { PureComponent } from 'react';

const options = [{
  key: 1,
  name: "世界范围"
}, {
  key: 2,
  name: "中国省份"
}, {
  key: 3,
  name: "中国城市"
}
]
class MapFilter extends PureComponent {
  constructor(context, props) {
    super(context, props);

  }
  render() {
    let text = "";
    const comp = options.map((item, index) => {
      let className = "";
      if (this.props.area == item.key) {
        className = "selected";
        text = item.name
      }
      return <li className={className} onClick={this.props.selectChangeMap.bind(null, item.key)} >{item.name}</li>
      })
      return (<div>
      <div className="map-select-title">
        <ul>
          {comp}
        </ul>

        <div className="clearfix"></div>
         <div ></div>
      </div>
      <div className="mt10">
       <sapn className="ml30" style={{fontSize:16}} >></sapn> <span className="ml10"> { this.props.selectedCondition }</span> <span className="ml30" >{ this.props.time}</span> <span className="ml30" > {text}</span>
      </div>
    </div>)
    }
  }
  export default MapFilter;