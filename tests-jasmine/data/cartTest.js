import { addtoCart, cart , loadFromStroage, removeFromCart, updateDeliveryOption} from "../../data/cart.js";




/*

note: Best practice-> Test each condition of an if-statement. 

"test coverage:" how much of the code, the code is being tested.(try to maximize test coverage).

"Flaky test:" test that sometimes passes and sometimes fails.

"Mocks:"it is a jasmine feature and it replace a method with a fake version.

note:"a mock only lasts for 1 test. once that test is finished, the method is no longer mocked."

"SPYON have a another features it records every time a method is used. "
*/


/*

UNIT TESTS: TESTING 1 PIECE OF THE CODE. like we did formatCurrency and addToCart.

*/

describe('test suite: addToCart', ()=>{

  beforeEach(()=>{
    spyOn(localStorage,'setItem');//first argument is object and second argument is to method and it must given in '' or "" like in string.
  });

  it('adds an exixting product to the cart',()=>{
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
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
   
  });

  it('adds a new product to the cart',()=>{
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


/*note:"expect has another method we can use: .toHavebeenCalledWith() this checks what values a mocked method received. for example:

expect(localStroage.setItem).toHavebeenCalledWith('cart','[]');

checks if the code called localstroage.setItem('cart','[]'); at some point


"
*/
describe('test suite: removeFromCart',()=>{
  
  
  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  
  
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
  });
  
  
  it('remove an existing item from the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:productId1,
        quantity:1,
        deliveryOptionId:'1'
      }]);
    });
    
    loadFromStroage();

    removeFromCart(productId1);

    expect(cart.length).toEqual(0);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));// checks whether the mocked cart is empty.

  });


  it('does nothing if product is not in the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:productId1,
        quantity:1,
        deliveryOptionId:'1'
      }]);
    });
    loadFromStroage();

    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

    expect(cart.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:productId1,
      quantity:1,
      deliveryOptionId:'1'
    }]));
  });
});


describe('test suite: updateDeliveryOption',()=>{
  
  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';


  beforeEach(()=>{//hooks it runs before each test
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:productId1,
        quantity:1,
        deliveryOptionId:'1'
      }]);
    });

    loadFromStroage();
  });
  
  it('updating a delivery option to the productID',()=>{
    updateDeliveryOption(productId1,'2');

    expect(cart[0].deliveryOptionId).toEqual('2');
    
    expect(cart[0].productId).toEqual(productId1);
    

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  });


  it('checking the updateDeliveryOption for giving productId which is not in the cart',()=>{
     updateDeliveryOption(productId2,'3');

     expect(cart[0].productId).toEqual(productId1);

     expect(cart[0].deliveryOptionId).toEqual('1');

     expect(cart[0].quantity).toEqual(1);

     expect(cart.length).toEqual(1);

     expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('checking the updateDeliveryOption for giving deliveryOptionId which is not in the cart array ',()=>{
    updateDeliveryOption(productId1,'2')
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('2')
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
});



