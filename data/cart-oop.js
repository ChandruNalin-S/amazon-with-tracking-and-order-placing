import { getDeliveryOption } from "./deliveryOptions.js"


function Cart(localStorageKey){
  const cart = {// inside the object we cannot use export keyword. because it only works property and method.

    cartItems:undefined,
  
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
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));// getItem is used for get the item from the localstorage when we saved a value/item in the localstorage through the setItem. 
    
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
    },
  
    saveToStorage(){ // we written shortcut instead of this -> saveToStroage: function(){}
  
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));//localstorage can only save strings. so we convert the cart into string. 
    },
  
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
    },
  
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
    },
  
    calculateCartQuantity(){
      let cartQuantity = 0;
    
        this.cartItems.forEach((cartItem)=>{
          cartQuantity+= cartItem.quantity;
        });
    
        return cartQuantity;
    },
  
    updateQuantity(productId,newQuantity){
      let matchingItem;
    
      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
    
      matchingItem.quantity= newQuantity;
    
      this.saveToStorage();
    },
  
  
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
  
  };

  return cart;
}

// through the function we can generate multiple object easily, each and every local stroage key have different data that can store. for example below code.

const cart = Cart('cart-oop');// passing localStroagekey;

const businessCart = Cart('cart-business');



//export let cart = undefined; // it is shortcut for: let cart;

cart.loadFromStroage();

businessCart.loadFromStroage();


console.log(cart);
console.log(businessCart);




// now the cart variable can be use in any other files without naming conflicts, through by export module.

// saving a cart in the localstorage

/* 
whenever we update the cart, we need to save it to localStorage, so it doesn't get refresh when we reload the page.
*/

/*
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));//localstorage can only save strings. so we convert the cart into string. 
}
*/


// the below function is for adding products into the cart.
/*
export function addtoCart(productId){
  let matchingItem;// undefined 

    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem =cartItem;
      }
    });

    
    const quantitySelector = Number(document.querySelector(
      `.js-quantity-selector-${productId}`
    ).value);
    
    

    if(matchingItem){
      matchingItem.quantity+=1;
      matchingItem.quantity+=quantitySelector;
    }
    else{
      cart.push({
        productId:productId,
        quantity:1,
        quantity:quantitySelector,
        deliveryOptionId:'1'
      });
    }

    saveToStorage();
}
*/


// remove an item from the cart; 
/*
steps to remove the cartItem from the cart;
1-> create a new array.
2-> loop through the cart.
3-> Add each product to the new Array, expect for this productId.

*/

/*
export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  // replace the old cart with the new Cart.
  cart=newCart;

  saveToStorage();
}

*/


/* "The above code is called a procedural programming 

  Procedure =  a set of step-by-step instructions and this is basically a function.


  "Object-Oriented Programming (OOP) = Organize our code into objects."

"*/





//export let cart = undefined; // it is shortcut for: let cart;



