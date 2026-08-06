import { products } from "../Data/products.js";
import { cart, saveToStorage } from "../Data/cart.js";


const url = new URL(window.location.href);

const productId = Number(url.searchParams.get('id'));

const product = products.find((product) => {
  return product.id === productId;
});


  let specificationsHTML = '';

for (const key in product.specifications) {
  specificationsHTML += `
    <div class='spec-row'>
      <span>${key}</span>
      <p>${product.specifications[key]}</p>
    </div>
  `;
}

let productDetailsHTML = '';

productDetailsHTML = `
<div class="product-top">
  <div class='product-gallery'>
    <div class='main-image'>
      <img src='${product.image}' alt='${product.title}'>
    </div>
  </div>

  <div class='product-info'>
    <h1>${product.title}</h1>

    <p class='price'>₦${product.price.toLocaleString()}</p>

    <div class='rating'>
      ★★★★★
      <span>(4.8 • 126 Reviews)</span>
    </div>

    <div class='product-meta'>
      <p><strong>Condition:</strong> ${product.condition}</p>
      <p><strong>Location:</strong> ${product.location}</p>
      <p><strong>Seller:</strong> ${product.seller}</p>
      <p><strong>Availability:</strong> In Stock</p>
    </div>

    <div class='quantity'>
      <button class='decrease-btn js-decrease-btn'>-</button>

      <span class='quantity-value js-quantity-value'>1</span>
      <button class='increase-btn js-increase-btn'>+</button>
    </div> 

    <div class='cart-buttons-container'>
      <button class='add-cart js-add-cart' data-product-id="${product.id}">Add to Cart</button>

      <button class='add-cart'>Contact Seller</button>
    </div>
  </div>
</div>

<div class="product-bottom">
  <div class="description">
      <h2>Description</h2>
      <p>${product.description}</p>
  </div>

  <div class='specifications'>
    <h2>Specifications</h2>

    ${specificationsHTML}
    
  </div>
</div>
`;

document.querySelector('.js-product-details').innerHTML = productDetailsHTML;

 let quantity = 1 

 function updateQuantity() {
  document.querySelector('.js-quantity-value').innerHTML = quantity
 }


document.querySelector('.js-increase-btn').addEventListener('click', () => {
 if (quantity < 10) {
  quantity++
 } else {
  alert('cannot add more product')
 }
 updateQuantity();
 console.log(quantity)
})

document.querySelector('.js-decrease-btn').addEventListener('click', () => {
 

  if (quantity > 1) {
    quantity--
  } else {
    alert('cannot reduce more quantity')
  }
  updateQuantity();
});

 
  ;
 
 
function addCart() {
  document.querySelector(".js-add-cart").addEventListener('click', () => {

  const productId = event.target.dataset.productId;
  
  
  const matchingItem = cart.find((item) => {
      
    return item.productId === productId
    });
    if (matchingItem) {
      matchingItem.quantity += quantity
    } else {
      cart.push({
        productId: productId,
        quantity: quantity
      })
    }
   saveToStorage();
   updateCartQuantity();
   console.log(cart);
});
}
addCart();


function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  });
  console.log(cartQuantity);
  document.querySelector('.js-cart-count').innerHTML = `(${cartQuantity} items)`
}
updateCartQuantity();



