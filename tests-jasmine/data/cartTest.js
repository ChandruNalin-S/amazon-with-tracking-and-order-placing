import { addtoCart, cart , loadFromStroage} from "../../data/cart.js";


/*

note: Best practice-> Test each condition of an if-statement. 

"test coverage:" how much of the code, the code is being tested.(try to maximize test coverage).

"Flaky test:" test that sometimes passes and sometimes fails.

"Mocks:"it is a jasmine feature and it replace a method with a fake version.

note:"a mock only lasts for 1 test. once that test is finished, the method is no longer mocked."

"SPYON have a another features it records every time a method is used. "
*/


describe('test suite: addToCart', ()=>{
  it('adds an exixting product to the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId:1
      }]);
    });
    loadFromStroage();

    addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
   
  });

  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'setItem');//first argument is object and second argument is to method and it must given in '' or "" like in string.
  spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });// to create a mock by spyon function/ object so we can use property & method and it takes two parameter. first parameter should be object and second parameter should be method which is given in the form of string or "";
    //console.log(localStorage.getItem('cart'));
    loadFromStroage();
    addtoCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);// toHaveBeenCalledTimes method checks how many times local stroage setItem was called in the code above
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});

