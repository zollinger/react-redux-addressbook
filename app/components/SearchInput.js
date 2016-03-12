import React, { Component, PropTypes } from 'react'


export default class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    this.refs.input.focus()
  }

  handleKeyPress(e) {
    this.props.onChange(this.refs.input.value)
  }

  render() {
    return (
      <input
        ref="input"
        className="form-control character-input"
        value={this.props.value}
        onChange={this.handleKeyPress} />
    )
  }
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}
