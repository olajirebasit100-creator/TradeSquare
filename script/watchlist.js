import { products } from "../Data/products.js";
import { cart, removeFromCart } from "../Data/cart.js";

function renderWatchList() {

  let watchListHTML = '';

  cart.forEach((cartItem) => {

   const matchingProduct = products.find((product) => {
      return product.id === Number(cartItem.productId)
         
    });
    

  watchListHTML += `
    <div class="watchlist-card js-watchlist-cart-${matchingProduct.id}">
      <div class="watchlist-image">
        <img src="${matchingProduct.image}" alt="${matchingProduct.title}">
      </div>
      <div class="watchlist-details">

          <h3>${matchingProduct.title}</h3>
          <p class="price">
            ₦${matchingProduct.price.toLocaleString()}
          </p>
          <p>Seller: ${matchingProduct.seller}</p>
          <p>Location: ${matchingProduct.location}</p>
          <p>Condition: ${matchingProduct.condition}</p>

        <div class="watchlist-actions">
          <button class="contact-seller-btn">
            Contact Seller
          </button>
          <button class="remove-btn js-remove-item"
            data-product-id="${matchingProduct.id}">
              Remove
          </button>

        </div>
      </div>
    </div>
`;
  });
  document.querySelector('.js-saved-items').innerHTML = watchListHTML;

  document.querySelectorAll(".js-remove-item").forEach((button) => {
  button.addEventListener('click', () => {
   const productId = button.dataset.productId

    removeFromCart(productId)
    const watchlistListContainer = document.querySelector(`.js-watchlist-cart-${productId}`)
    watchlistListContainer.remove();
    renderWatchList();  
    console.log(cart)
  })
})
};
renderWatchList();


