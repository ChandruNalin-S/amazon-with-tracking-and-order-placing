export const cart = [];// now the cart variable can be use in any other files without naming conflicts, through by export module.


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