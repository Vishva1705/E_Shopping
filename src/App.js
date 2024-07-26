import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
 
const App = () => (
<Provider store={store}>
<Router>
<Header />
<Switch>
<Route path="/" exact component={HomePage} />
<Route path="/category/:categoryName" component={ItemsPage} />
<Route path="/item/:itemId" component={ItemDetailPage} />
<Route path="/cart" component={CartPage} />
<Route path="/orders" component={OrdersPage} />
</Switch>
</Router>
</Provider>
);
 
export default App;