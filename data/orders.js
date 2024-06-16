export const orders = JSON.parse(localStorage.getItem('orders'))|| [];

export function addOrder(order){
  orders.unshift(order);// unshift is a method use to push the data into top vise in the array objects. 
  saveToStroage();
}


function saveToStroage(){
localStorage.setItem('orders',JSON.stringify(orders));
}