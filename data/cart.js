export let cart = JSON.parse(localStorage.getItem('cart'));// getItem is used for get the item from the localstorage when we saved a value/item in the localstorage through the setItem. 

// parse is method and it's used for to convert string into orginal form/ html form. because localstorage only store/save string value.

// if the user use the site first time, there will no any item/data in the localstorage. so defaulty we save data/item in the cart through the below code. 


if(!cart){// it is the truthy statement that if the cart is null then default value/item should be display in page and the data/item are store in cart.
 cart = [{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2,
  deliveryOptionId:'1'
}, {
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
  deliveryOptionId:'2'
}];
}

// now the cart variable can be use in any other files without naming conflicts, through by export module.

// saving a cart in the localstorage

/* 
whenever we update the cart, we need to save it to localStorage, so it doesn't get refresh when we reload the page.
*/
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));//localstorage can only save strings. so we convert the cart into string. 
}


// the below function is for adding products into the cart.
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


// remove an item from the cart; 
/*
steps to remove the cartItem from the cart;
1-> create a new array.
2-> loop through the cart.
3-> Add each product to the new Array, expect for this productId.

*/
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

export function calculateCartQuantity(){
  let cartQuantity = 0;

    cart.forEach((cartItem)=>{
      cartQuantity+= cartItem.quantity;
    });

    return cartQuantity;
}


export function updateQuantity(productId,newQuantity){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity= newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;// undefined 

    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem =cartItem;
      }
    });
    
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}
