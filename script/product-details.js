import { products } from "../Data/products.js";
import { watchlist, saveToStorage } from "../Data/cart.js";


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
<div class="breadcrumb">
  <a href="NexMart.html">Home</a>
  <span>›</span>
  <a href="products-page.html">Products</a>
  <span>›</span>
  <a href="products-page.html?category=${product.category}">${product.category}</a>

  <span>›</span>
  <p>${product.title}</p>
</div>

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

    <div class='cart-buttons-container'>
      <button class='add-cart js-add-watchlist' data-product-id="${product.id}">Add to Watchlist</button>

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


 
function addToWatchlist() {
  document.querySelector(".js-add-watchlist").addEventListener('click', () => {

    document.querySelector('.js-add-watchlist').innerHTML = 'Wachlist Added'
  const productId = event.target.dataset.productId;

  const matchingItem = watchlist.find((item) => {
      
    return item.productId === productId
    });
    if (matchingItem) {
     
    } else {
      watchlist.push({
        productId: productId,
        dateAdded: Date.now()
      })
    }
   saveToStorage();
   updateWatchlistQuantity();

  const notification = document.querySelector('.js-watchlist-notification');

  notification.classList.add('show');

  setTimeout(() => {
      notification.classList.remove('show');
  }, 3000);

});
}
addToWatchlist();

function checkWatchlist() {
  const productId = document.querySelector('.js-add-watchlist').dataset.productId

  const matchingItem = watchlist.find((Item ) => {
    return Item.productId === productId
  });

  if (matchingItem) {
    document.querySelector('.js-add-watchlist').innerHTML = 'Wachlist Added'
  } else {
     document.querySelector('.js-add-watchlist').innerHTML = 'Add to Watchlist'
  }
  saveToStorage();
addToWatchlist();
};
checkWatchlist();

function updateWatchlistQuantity() {
 
  document.querySelector('.js-watchlist-count').innerHTML = `(${watchlist.length} items)`
}
updateWatchlistQuantity();



