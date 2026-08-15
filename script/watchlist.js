import { getMatchingProduct, products } from "../Data/products.js";
import {  removeFromWatchlist, watchlist } from "../Data/cart.js";

function renderWatchList() {

  let watchListHTML = '';

  watchlist.forEach((item) => {
    

   const matchingProduct = getMatchingProduct(item.productId)
    

  watchListHTML += `
    <div class="watchlist-card js-watchlist-${matchingProduct.id}" >
      <div class="watchlist-image js-watchlist-image" data-id="${matchingProduct.id}">
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
          <button class="contact-seller-btn js-contact-seller"
          data-product-id="${matchingProduct.id}">
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

  document.querySelector('.js-checklist-count').innerHTML = `(${watchlist.length} Items)`;

  gotoLocationPage();
  contactSeller();

  document.querySelectorAll(".js-remove-item").forEach((button) => {
    button.addEventListener('click', () => {

      const productId = button.dataset.productId;

      removeFromWatchlist(productId)

      const watchlistListContainer = document.querySelector(`.js-watchlist-${productId}`)
      watchlistListContainer.remove();

      renderWatchList();  
      updateWatchlistSummary();
      calculateListingValue();
    
      
    });
  })


  if (watchlist.length === 0) {
    document.querySelector('.js-saved-items').innerHTML = `
      
        <h2 class="empty-watchlist">Your Watchlist is Empty</h2>

        <a class="see-more" href="products-page.html">
          Browse Products
          <img src="images/icons/right-arrow.png" alt="">
        </a>
    `;
  }
};
renderWatchList();

function gotoLocationPage() {
  document.querySelectorAll('.js-watchlist-image').forEach((card) => {
    card.addEventListener('click', () => {

      const productId = card.dataset.id;
      window.location.href = `product-details.html?id=${productId}`;
    });
  });
}

 function contactSeller() {
  document.querySelectorAll('.js-contact-seller').forEach(button => {
  button.addEventListener('click', () => {

    const matchingProduct = getMatchingProduct(button.dataset.productId)
    
    alert(`Contact ${matchingProduct.seller}`);
  });
});
}


function updateWatchlistSummary() {
  let phonesQuantity = 0;
  let vehicleQuantity = 0;
  let fashionQuantity = 0;
  let propertyQuantity = 0;
  let elecronicsQuantoty = 0;
  let homeQuantity = 0;

 


  watchlist.forEach(Item => {
    const matchingProduct = getMatchingProduct(Item.productId);

    if (matchingProduct.category === 'Phones and Tablet') {
      phonesQuantity ++ 
    } else if (matchingProduct.category === 'Vehicles') {
      vehicleQuantity ++;
    } else if (matchingProduct.category === 'Fashion') {
      fashionQuantity ++;
    } else if (matchingProduct.category === 'Real Estate') {
      propertyQuantity ++;
    }else if (matchingProduct.category === 'Electronics') {
      elecronicsQuantoty ++;
    } else if (matchingProduct.category === 'Home') {
      homeQuantity ++;
    }
    
  })
  document.querySelector('.js-saved-items-count').innerHTML = watchlist.length;

  document.querySelector('.js-phone-count').innerHTML = phonesQuantity;
  document.querySelector('.js-vehicle-count').innerHTML = vehicleQuantity;
  document.querySelector('.js-fashion-count').innerHTML = fashionQuantity;
  document.querySelector('.js-property-count').innerHTML = propertyQuantity;
  document.querySelector('.js-electronics-count').innerHTML = elecronicsQuantoty;
  document.querySelector('.js-home-count').innerHTML = homeQuantity;

 
 
}
updateWatchlistSummary();

function calculateListingValue() {

  const combinedValue = watchlist.reduce((total, watchlistItem) => {
  const matchingProduct = getMatchingProduct(watchlistItem.productId)

  return total + matchingProduct.price;
}, 0)

document.querySelector('.js-combined-value').innerHTML =
  `₦${combinedValue.toLocaleString()}`;
}
calculateListingValue();

const recentlyAdded = watchlist.reduce((latestItem, watchListItem) => {
  if (watchListItem.dateAdded > latestItem.dateAdded) {
    return watchListItem;
  }

  return latestItem;
});
const matchingProduct = getMatchingProduct(recentlyAdded.productId);

document.querySelector('.js-last-added').innerHTML =
  matchingProduct.title;