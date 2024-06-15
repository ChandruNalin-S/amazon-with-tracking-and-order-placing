import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary} from  './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';

import {loadProducts,loadProductsFetch} from '../data/products.js';
//import '../data/cart-class.js';

//import '../data/car.js';

//import '../data/backend-pratice.js';

import { loadCart } from '../data/cart.js';

/*

Async Await-> even better way to handle asynchronous code.

note: Use async await, over promise and callbacks because it much cleaner. 

note: it is a alternative of promises and callbacks to overcome lines of code.

note: Async await is a shortcut for promises.

feature: async lets us use "await".

await-> lets us wait for a promise to finish before going to the next line.

important:"async await can only be used with promise".


"important": await cannot be used in normal function, so we have to convert normal function into async function then only we can use await inside the function.

note: Error handling in Async await by using try/catch.

note: we can use try/catch to catch errors in normal code and whenever we get an error, it will skip the rest of the code. 

Important: Why don't we use try/catch everywhere?-> it's meant to handle unexpected errors(code is correct, outside our control).


note: We can manually create errors by using "throw"

note: In throw we can give any type of value like string and number.

*/

async function loadPage(){// makes a function return a promise.

  try{
   //throw 'error1';// manual created error.



    await loadProductsFetch();// lets us write asynchronous code like normal code. 

  // note: we can only use await,inside an async function also closest function has to be async and "async await can only be used with promise".


  /*
   note: if we are using promises, there are 2 ways to manually create an error.

   note: if we await a promise instead of going into catch, it's going to go inside catch. 
  
  */
  const value = await new Promise((resolve,reject)=>{// if we need to create an error in the future then we can use this "reject" function.

    //throw 'error2';// it throws an error and it goes to inside the catch, if the throw inside the await promise and the code becomes a synchronous or normal code.

    // throw does not work in the future that's why throw does not use in inside the loadcart function because if the loadCart function get the response then the inside code is going to generate/work that's why is called a future work.

    loadCart(()=>{
      //reject('error3')//reject is a function and lets us create an error in the future for asynchronous.
      resolve('value2');
    });
  });

  } catch (error){
    console.log('unexpected error. please try again later');
  }
  

  /*
  
  instead of using then function, we just written a function below line for to render or display the data into the page.

  And it's looks like normal code to understand the 
  step by step process.


  */

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();



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

/*
Promise.all([
  loadProductsFetch(),
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

*/

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


