'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    check: false,
    color: {
      r: '225',
      g: '105',
      b: '0',
      a: '100',
    },
  };

  // handleClick = () => {
  //   this.setState({ displayColorPicker: !this.props.displayColorPicker })
  // };

  // handleClose = () => {

  //   this.setState({
  //     displayColorPicker: false,
  //     check: true,
  //      })

  // };

  // handleChange = (color) => {
  //   this.setState({ color: color.rgb })
  // };

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '30px',
          height: '30px',
          borderRadius: '4px',
          float: 'left',
          //display: 'none',
          background: `rgba(${ this.props.color.r }, ${ this.props.color.g }, ${ this.props.color.b }, ${ this.props.color.a })`,
        },
              check: {
        fill: '#fff',
        marginLeft: '3px',
        display: 'none',
        marginTop: '3px',
      },
              text: {
        background: '#fff',
        height: '30px',
        width: '60px',
        fontSize:'12px',
        boxShadow: 'inset 0 0 0 1px #F0F0F0',
        borderRadius: '4px 0 0 4px',
        float: 'left',
        color: '#98A1A4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:'6px',
      },

        swatch: {
          // padding: '5px',
          // background: '#fff',
          // borderRadius: '1px',
          // boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
           display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
       'active': {
      check: {
        display: 'block',
      },
      color: {
         display: 'block',
      }
    },
    },

    {active: this.props.check})
    return (
      <div>
        <div style={ styles.swatch } onClick={ this.props.handleClick }>
          <div style={ styles.color } >
            <div style={ styles.check }>
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
      </div>
          </div>
           <div style={ styles.text } >自定义</div>
        </div>

        { this.props.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.props.handleClose } />
          <SketchPicker color={ this.props.color } onChange={ this.props.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default SketchExample
