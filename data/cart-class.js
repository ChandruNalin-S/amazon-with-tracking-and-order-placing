import { getDeliveryOption } from "./deliveryOptions.js"

// CLASS is a object generater and it is specifically designed for generating objects.


/* 
Note:"Use PascalCase for things that generate objects."

CLASS-> Also have property and method to generate objects.


*/

class Cart {
  cartItems;//property and cartItems = indefined;

  localStorageKey;
  
  
  // Constructor is run some setup code after creation of object and it will automatically generate the inside code or inside in the function.

  // the constructor cannot return any value.
  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;// "this" points to the object that we generate. whatever object that we generate, we are going tp get its localstroageKey and set it.
    this.loadFromStroage();
  }

  loadFromStroage(){// function inside in object is also called method.
      
    /* method in object is, but we cannot use arrow function in object. so we have to use normal function here. 
    
    property: function(){

    }
    */

    /* if we change the object name like cart into some other name , then no longer the below will work, so that's why javascript provide some feature called "this".
    
    This is a keyword and it gives us the object that contains this function, so it gives us this outer object up here.
    
    the below is changed-> cart.cartItems into this.cartItems
    

    we changed some cart into cart-oop inside in the local stroage because we don't want to effect the orginal cart from the cart.js.
    */
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));// getItem is used for get the item from the localstorage when we saved a value/item in the localstorage through the setItem. 
  
  // parse is method and it's used for to convert string into orginal form/ html form. because localstorage only store/save string value.
  
  // if the user use the site first time, there will no any item/data in the localstorage. so defaulty we save data/item in the cart through the below code. 
  
  
  if(!this.cartItems){// it is the truthy statement that if the cart is null then default value/item should be display in page and the data/item are store in cart.
   this.cartItems = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:'1'
  }, {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:'2'
  }];
  }
  }

  saveToStorage(){ // we written shortcut instead of this -> saveToStroage: function(){}
  
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));//localstorage can only save strings. so we convert the cart into string. 
  }

  addtoCart(productId){
    let matchingItem;// undefined 
  
      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem =cartItem;
        }
      });
  
      
      /*
      const quantitySelector = Number(document.querySelector(
        `.js-quantity-selector-${productId}`
      ).value);

      */
      
      
  
      if(matchingItem){
        matchingItem.quantity+=1;
        //matchingItem.quantity+=quantitySelector;
      }
      else{
        this.cartItems.push({
          productId:productId,
          quantity:1,
         // quantity:quantitySelector,
          deliveryOptionId:'1'
        });
      }
  
      this.saveToStorage();
  }

  removeFromCart(productId){
    const newCart = [];
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    // replace the old cart with the new Cart.
    this.cartItems=newCart;
  
    this.saveToStorage();
  }

  calculateCartQuantity(){
    let cartQuantity = 0;
  
      this.cartItems.forEach((cartItem)=>{
        cartQuantity+= cartItem.quantity;
      });
  
      return cartQuantity;
  }

  updateQuantity(productId,newQuantity){
    let matchingItem;
  
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity= newQuantity;
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;// undefined 
  
      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem =cartItem;
        }
      });
  
      if(!matchingItem){
        return;
      }  //if no item is found with that id then we do nothing and exit the function.
      
      const deliveryOption = getDeliveryOption(deliveryOptionId);// getting a delivery Option. 
  
      if(!deliveryOption){
        return;
      } // if the delivery option is not available in our array of options we also do nothing and exit the function.
  
      matchingItem.deliveryOptionId = deliveryOptionId;
  
      this.saveToStorage();
  }
}


// we can pass argument to the constructor while creating object.

const cart = new Cart('cart-oop');// this statement of code generate new object from the class. so this new object have same property and method.

const businessCart = new Cart('cart-business');// this object is also called a instance, which means this object was generated from this Cart class.

/*
cart.localStorageKey = 'cart-oop';

businessCart.localStorageKey = 'cart-business';

//export let cart = undefined; // it is shortcut for: let cart;

cart.loadFromStroage();//loading the cart from the stroage.

businessCart.loadFromStroage();//loading the businessCart from the stroage.

*/


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);// the object is generated by this Cart class.







