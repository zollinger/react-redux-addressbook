import React, { Component, PropTypes } from 'react'

export default class RoboHashImage extends Component {

  constructor(props) {
    super(props)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.state = {
      spin: false
    }
  }

  onMouseOut() {
    this.setState({
      spin: false
    })
  }

  onMouseOver() {
    this.setState({
      spin: true
    })
  }

  imageSource(token, width, height) {
    let pixelRatio = window.devicePixelRatio
    return `//robohash.org/${token}?set=set1&size=${width * pixelRatio}x${height * pixelRatio}`
  }

  render() {
    let {token, width, height} = this.props
    let className = this.state.spin ? 'robo-spin' : ''
    let imgSrc = this.imageSource(token, width, height)
    let style = {
      width,
      height
    }
    return token ? <img
      onMouseOver={this.onMouseOver}
      onMouseOut={this.onMouseOut}
      className={className}
      src={imgSrc}
      style={style}
      /> : <span style={style} className="robo-hash-placeholder" ></span>

  }
}

RoboHashImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  token: PropTypes.string
}

