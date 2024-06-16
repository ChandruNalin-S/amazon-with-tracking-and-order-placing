import { calculateCartQuantity, cart } from "../../data/cart.js"; 
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary(){
  let productPriceCents = 0;
  let ShippingPriceCents = 0;
  
  cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents*cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    ShippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTaxCents*0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  //console.log(totalCents);
  //console.log(productPriceCents);
  //console.log(ShippingPriceCents);
  //console.log(totalBeforeTaxCents);

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money js-payment-summary-money">
      $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">
      $${formatCurrency(ShippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-totalprice">
      $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

/*



below lines of code is to-> we are sending cart data to the backend using 'https://supersimplebackend.dev/orders' by fetch method.

-> the request we are using is "POST"

note: The are 4 type of requests:
    ->GET = get something from the backend -> "issue"-> GET requests don't really let us send data to the backend.

    ->POST = create something from the backend and lets us send data to the backend.

    ->PUT = update something from the backend
    ->DELETE = delete something from the backend

note:{
 PROCEDURE:

    ->when we are using "POST" request then we have to add object to the fetch method/function.

    ->inside the object we have to give additional information about the data.

    -> In body property it contains the data to send to the backend. inside the body "cart" is a property which was provide in documentation from the supersimpledev. 

    -> the cart data is converted into json format because In headers property the content-type must be "json".

    ->we used async await error handling method to get response from the backend and store the response in a variable called "response" and the response must be a "promise" with attachment of orders data.

    ->
}
*/

/*
 important-note: this below code is used for sending data of cart to the backend and get the orders data. the(https://supersimplebackend.dev/orders) backend will automattically generate the orders data through the cart data.

*/
  document.querySelector('.js-place-order').addEventListener('click', async ()=>{
    try{
      const response = await fetch('https://supersimplebackend.dev/orders',{
        method:'POST',
        headers:{// additional information of data type, we are going to send.
          'Content-Type': 'application/json'
        },
        // we are convert the javascript array object into json object because the backend get the data only in json format.

        body:JSON.stringify({// In body property , we have to place the data to send to the backend. 
          cart: cart// cart is a data and the type of data is javascript array object.
        })

      });
  
      const order = await response.json()//wait for order response by using "await" and response.json is used for convert the json format into javascript array object.

      addOrder(order);// it is a function use to store the order data in orders array.

    }catch (error){
      console.log('Unexpected error. Try again later.');
    }
     
    //console.log(order);

    window.location.href = 'orders.html';// it is a object and used to navigate from one html file to another html file.

  });

}

