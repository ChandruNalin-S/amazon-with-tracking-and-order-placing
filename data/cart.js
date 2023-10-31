export let cart = [{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2,

}, {
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1
}];// now the cart variable can be use in any other files without naming conflicts, through by export module.


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
        quantity:quantitySelector
      });
    }
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
}