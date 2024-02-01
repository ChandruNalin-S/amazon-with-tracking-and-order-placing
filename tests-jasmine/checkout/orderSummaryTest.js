import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStroage ,cart} from "../../data/cart.js";
/*
INTEGRATION TEST: TEST MANY UNITS/PIECES OF CODE WORKING TOGETHER. 

renderOrderSummary function create a part of the checkout page, note:"when we testing the renderOrdersummary" 2 things to test:->How the page looks and ->How the page behaves.
*/

describe('test suite: renderOrderSummary',()=>{
  
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  //"hooks: A hooks, let us run some code for each test.jasmine provide many hooks like beforeEach, afterEach, beforeAll, afterAll etc.."

  // afterEach()-> runs code after each test.

  // beforeAll()-> runs code before all tests.

  // afterAll()-> runs code after all tests.

  // note:"hooks->" this is used for sharing the setup code to test case and removing duplicate of setup code in each test case.

  //beforeEach hook is a function and it is used for setup the code that we want test, before the each test.

  
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

    renderOrderSummary();
  })
  
  
  it('displays the cart',()=>{// testing the setup code in hook.
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);//this code gives us an array of elements. so only we used length.

    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');// toContain method is, one the method of expect for get innerText in the html. 


    document.querySelector('.js-test-container').innerHTML ='';// this code might is used for remove the html from the page due to lot space taken by the html and this code will work, when the above code is satisfied/ the test result is correct.
  }); 
  
  it('removes a product',()=>{// testing the setup code in hook
    document.querySelector(`.js-delete-link-${productId1}`).click();//click is method is used to click the link.

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);// not property is used for opposite the statement.

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector('.js-test-container').innerHTML ='';// this code might is used for remove the html from the page due to lot space taken by the html and this code will work, when the above code is satisfied/ the test result is correct.
  });
});
