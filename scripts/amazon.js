import {cart, addtoCart, calculateCartQuantity} from '../data/cart.js';// import a cart variable from other file through the import module and file path and we can use multiple variable or function in one file and one import at same file.
import {products} from '../data/products.js';// here we didn't use (as give different variable in import module) because we didn't create a same variable that was import by import module. 
import { formatCurrency } from './utils/money.js';


// const cart = []; this will also create a naming conflicts,because if we use same variable like cart then the javascript code won't work on webpage, so module have another benefits to avoid naming conflicts by give different name in import {cart as mycart} so no longer conflict with this cart variable name or some other name that we import from other files.

/* Main use of javascript is,
  first is save the data / information like products;
  second is a generating html;
  third is make it interactive;
*/

// save the data 
// below this code are organized through data structure by the help of array with object.

/*const products = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',// save this as a string
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents:1090
},{
  image : 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating:{
    stars:4.0,
    count: 127
  },
  priceCents:2095
},{
  image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name:'Adults Plain Cotton T-Shirt - 2 Pack',
  rating:{
    stars:4.5,
    count: 56
  },
  priceCents: 799
},{
  image:'images/products/black-2-slot-toaster.jpg',
  name:'2 Slot Toaster - Black',
  rating:{
    stars:5,
    count:2197
  },
  priceCents:1899
}];
*/



// Generating HTML into the webpage through by javascript instead of writing copying html code pasting over and over again in html file.


let productsHtml = '';
products.forEach((product)=>{
  // the below variable productsHtml is a accumalator pattern it is used to store the result.
  // toFixed is a special method (number method) it is used for, to convert a number into string, inside the brakets how many decimal as u want.
  productsHtml += `        
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars*10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${formatCurrency(product.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" 
    data-product-name="${product.name}" 
    data-product-id="${product.id}"
    >
      Add to Cart
    </button>
  </div>
  `;
});

// in above code we used Data Attribute, this is the another type of html attribute which is allow us to attach any information to an html element and we can give own attribute name ,like ' data-product-name="${product.name}"'


/* syntax rule for a data attribute
  -is just an html attribute.
  -have to always start with "data-".
  -then give it any name as we want.
  -then attribute name should seperate by - which means/known as kebab case
*/
document.querySelector('.js-products-grid').innerHTML = productsHtml;


// update the cartQuantity/total of Quantity
function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();
    //console.log(cart);
    document.querySelector('.js-cartQuantity').innerHTML = cartQuantity ;
}

// special effect when we click the add-to-cart button it show added in webpage.
function EffectAdded(productId){
  const added =  document.querySelector(`.js-added-to-cart-${productId}`);
    /*if(added.classList.contains('visible-added')){
      setTimeout(()=>{
        added.classList.remove('visible-added');
      },2000);
    }
    else{
      added.classList.add('visible-added');
    }*/


    // We're going to use an object to save the timeout ids.
    // The reason we use an object is because each product
    // will have its own timeoutId. So an object lets us
    // save multiple timeout ids for different products.
    // For example:
    // {
    //   'product-id1': 2,
    //   'product-id2': 5,
    //   ...
    // }
    // (2 and 5 are ids that are returned when we call setTimeout).

    const addedMessageTimeouts = {};

    added.classList.add('visible-added');

    setTimeout(()=>{
       // Check if there's a previous timeout for this
      // product. If there is, we should stop it.

      const previousTimeoutId = addedMessageTimeouts[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        added.classList.remove('visible-added');
      }, 2000);
    });
    
    // Save the timeoutId for this product
      // so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeoutId;
}

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId = button.dataset.productId;// dataset is a property ,it basically give's us all data attribute that are attached to the element and it just work as a object so we can access the object by the help of propertyName and then propertyName is convert from kabeb case into Camel case.
    
    addtoCart(productId);// calling a function for add products into the cart.

    updateCartQuantity();

    EffectAdded(productId);

  });  
});


