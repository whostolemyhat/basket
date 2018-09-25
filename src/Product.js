import React, { Component } from 'react';

export default class Product extends Component {
    render () {
        return <li><a onClick={ () => this.props.handleClick(this.props) }>{ this.props.title }: £{ parseFloat(this.props.unitPrice / 100).toFixed(2) }</a></li>
    }
}