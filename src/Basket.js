import React, { Component } from 'react';
import './Basket.css';

export default class Basket extends Component {
    renderProduct(product, i) {
        return <div key={ `selected-${i}` }>{ product.title } (£{ parseFloat(product.unitPrice / 100).toFixed(2) })</div>;
    }

    getSubtotal(formatted = true) {
        const total = this.props.products.reduce((acc, item) => {
            return acc + parseInt(item.unitPrice, 10);
        }, 0);

        if (formatted) {
            return (total / 100).toFixed(2);
        }
        return total;
    }

    getTotal() {
        const subtotal = this.getSubtotal(false);
        if (!this.props.products.length) {
            return (subtotal / 100).toFixed(2);
        }

        return ((subtotal - this.props.discount) / 100).toFixed(2);
    }


    renderOffers = (offer, i) => {
        const offerDetails = this.props.offers.filter(o => o.id === offer).pop();
        return <div key={ `offer-${i}` } className='basket__offer'>{ offerDetails.title } {`(-£${(this.props.discount/100).toFixed(2)})`}</div>
    }

    render() {
        if (this.props.products.length === 0) {
            return <div className='basket'><p>Basket is empty</p></div>;
        }

        return (
            <div className='basket'>
            { this.props.products.map(this.renderProduct) }
            <p>Subtotal: { `£${this.getSubtotal()}` }</p>
            { [...this.props.appliedOffers].map(this.renderOffers) }
            <div>Total: { `£${this.getTotal()}` }</div>
            </div>
        );
    }
}