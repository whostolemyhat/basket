import React, { Component } from 'react';
import './App.css';
import Product from './Product';
import Basket from './Basket';

const products = [
  {
    id: 1000,
    title: 'Apple',
    unitPrice: 105
  },
  {
    id: 1001,
    title: 'Bread',
    unitPrice: 65
  },
  {
    id: 1005,
    title: 'Milk',
    unitPrice: 165
  },
  {
    id: 1100,
    title: 'Sausages',
    unitPrice: 80
  }
];

const offers = [
  {
    id: 2000,
    discount: 10,
    productId: 1000,
    title: '10% off apples'
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      selected: [],
      discount: 0,
      appliedOffers: new Set()
    }
  }

  componentWillMount() {
    this.setState({ products });
  }

  renderProduct = (product, i) => {
    return <Product { ...product } handleClick={ this.onProductClick } />;
  }

  onProductClick = (product) => {
    const { selected } = this.state;
    selected.push(product);

    let discount = 0;
    let appliedOffers = this.state.appliedOffers;
    offers.forEach(offer => {
        if (offer.productId) {
            const inBasket = selected.filter(product => product.id === offer.productId);
            if (inBasket.length) {
                appliedOffers.add(offer.id);

                inBasket.forEach(product => {
                    const discountNormalised = offer.discount / 100;
                    discount += parseInt(product.unitPrice * discountNormalised, 10);
                });
            }
        }
    });

    this.setState({ selected, appliedOffers, discount });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Lovely Shop</h1>
        </header>

        <Basket
          products={ this.state.selected }
          offers={ this.state.offers }
          discount={ this.state.discount }
          offers={ offers }
          appliedOffers={ this.state.appliedOffers } />
        { this.state.products.map(this.renderProduct) }
      </div>
    );
  }
}

export default App;
