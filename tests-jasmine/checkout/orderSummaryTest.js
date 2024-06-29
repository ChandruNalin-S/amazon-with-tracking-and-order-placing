import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStroage ,cart} from "../../data/cart.js";

import {loadProducts,loadProductsFetch} from "../../data/products.js";
/*
INTEGRATION TEST: TEST MANY UNITS/PIECES OF CODE WORKING TOGETHER. 

renderOrderSummary function create a part of the checkout page, note:"when we testing the renderOrdersummary" 2 things to test:->How the page looks and ->How the page behaves.
*/

/*
note:"if when we make some changes to our code, then just open the testing page and it will re-run all our tests."

"HERE A PROCESS THAT WE DO WHEN WE WRITE TO TEST CODE"

1->MAKE CHANGES TO CODE.
2->RE-RUN THE TESTS.
3->SAVE TO GIT.

*/

describe('test suite: renderOrderSummary',()=>{
  
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  //"hooks: A hooks, let us run some code for each test.jasmine provide many hooks like beforeEach, afterEach, beforeAll, afterAll etc.."

  // afterEach()-> runs code after each test.

  // beforeAll()-> runs code before all tests.

  // afterAll()-> runs code after all tests.

  // note: Jasmine has a feature for waiting for some code to finish called "Done function"

/*
  beforeAll((done)=>{// this code is to, we have to load the loadproducts once not twice that's why we used beforeAll.
    loadProducts(()=>{// loadproducts is a asynchronous code, so it will send the request to backend but didn't wait for the response.
      done();// done(), lets us control when to go to the next step.
    });
  });
*/

  // note:"hooks->" this is used for sharing the setup code to test case and removing duplicate of setup code in each test case.

  //beforeEach hook is a function and it is used for setup the code that we want test, before the each test.

  beforeAll(async()=>{
    await loadProductsFetch();
  });

  


  beforeEach(()=>{//runs code before each test.
    spyOn(localStorage,'setItem');// mock the localStroage then only it cannot modify/effect the original data in cart.

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `
    
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity:2,
        deliveryOptionId:'1'
      }, {
        productId: productId2,
        quantity:1,
        deliveryOptionId:'2'
      }]);
    });
    loadFromStroage();

    renderOrderSummary();// this code didn't work properly and the test case will fail because we didn't load products from the backend , that's why we loaded loadproduct function and wait for the response to run the all test case.
  });

  
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML ='';// this code might is used for remove the html from the page due to lot space taken by the html and this code will work, when the above code is satisfied/ the test result is correct.
  })
  
  
  
  it('displays the cart',()=>{// testing the setup code in hook.
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);//this code gives us an array of elements. so only we used length.

    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');// toContain method is, one the method of expect for get innerText in the html.
    
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');

    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');

  }); 
  
  it('removes a product',()=>{// testing the setup code in hook
    document.querySelector(`.js-delete-link-${productId1}`).click();//click is method is used to click the link.

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);// not property is used for opposite the statement.

    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('updates the delivery option',()=>{
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);

    expect(cart.length).toEqual(2);

    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');

    expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$14.98');

    expect(document.querySelector('.js-payment-summary-totalprice').innerText).toEqual('$63.50');
  });
});







