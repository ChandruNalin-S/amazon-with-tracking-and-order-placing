import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary} from  './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';

import {loadProducts} from '../data/products.js';
//import '../data/cart-class.js';

//import '../data/car.js';

//import '../data/backend-pratice.js';

import { loadCart } from '../data/cart.js';

/*
PROMISE
->better way to handle asynchronous code.
->it similar to jasmine done() function.
->let us wait for some code to finish before going to the next step.

note: Promise is a built-in-class in javascript.

Important:-> promise class allows Javascript to do multiple things at the same time.

syntax: inside the promise must have a function and the function will run immediately.

Note: Why we use promises?-> to solve multiple callbacks cause a lot of nesting.


note: Use promise instead if callbacks and keep our code more flat.
*/

/*

Promise.all is a another feature of promise and used to run mulitple promise simultaneously/at same time after calling each and every resolve function and then move to next step of code to run in the  "then function" inside code to render or display data.

note:Promise.all looks like array of promise to run multiple promise simultaneously. 

purpose: instead of waiting for each promise one by one to complete. it will run all the promise at the same time.
*/

Promise.all([

  new Promise((resolve)=>{
    loadProducts(()=>{
      resolve('value1');// In resolve function we can give argument such as string and it goes to the "then" function parameter.
    });
  }),

  new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value2');
    });
  })

]).then((values)=>{// if resolve function pass argument then the value is store in then((parameter/values)).
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})


/*
new Promise((resolve)=>{// resolve is a function and it is similar to done() function in jasmine.purpose-> lets us control when to go to the next step.
  loadProducts(()=>{// it is a asynchronous code/function. 
    resolve();// when the asynchronous code like loadproducts is load or get responses then the resolve function will control and move to the next step of code in inside the "then function". 
  });

}).then(()=>{//-> this next step is separate from the rest of the code.
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  }); 

}).then(()=>{
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

*/

/*
loadProducts(()=>{// using callback or function run in the future. that's why we used function.
  loadCart(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/


