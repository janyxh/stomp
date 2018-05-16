import React from 'react'
import reactCSS from 'reactcss'

export const Swatch = ({ color, style, onClick, title = color, active }) => {
  const styles = reactCSS({
    'default': {
      swatch: {
        background: color,
        height: '100%',
        width: '100%',
        cursor: 'pointer',
      },
      check: {
        fill: '#fff',
        marginLeft: '3px',
        display: 'none',
        marginTop: '3px',
      },
    },
    'active': {
      check: {
        display: 'block',
      },
    },
    'custom': {
      swatch: style,
    },
  }, 'custom',{active})
  const handleClick = (e) => onClick(color, e)
  return (
    <div style={ styles.swatch } onClick={ handleClick } title={ title } >
    <div style={ styles.check }>
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
      </div>
    </div>
  )
}

export default Swatch
