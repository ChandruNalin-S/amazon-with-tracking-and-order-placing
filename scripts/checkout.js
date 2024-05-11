import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary} from  './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';

import {loadProducts} from '../data/products.js';
//import '../data/cart-class.js';

//import '../data/car.js';

//import '../data/backend-pratice.js';

loadProducts(()=>{// using callback or function run in the future. that's why we used function.
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})



