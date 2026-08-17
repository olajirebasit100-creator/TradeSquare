import { products, heroCategories } from "../Data/products.js";
import { watchlist } from "../Data/cart.js";

 
  function renderVerifiedSection(products) {

     let verifiedSectionHTML = '';

    products.forEach((product) => {
    verifiedSectionHTML +=  `
      <div class="product-card js-product-card" data-id="${product.id}">
        <div class="image-wrapper">
          <img src="${product.image}">
          <span class="badge verified">
            <i class="fa-solid fa-circle-check"></i>
            Verified Seller
          </span>
        </div>
        <div class="product-info">
          <h3>${product.title}</h3>
          <h4>₦${product.price.toLocaleString()}</h4>
          <div class="location">
            <i class="fa-solid fa-location-dot"></i>
            ${product.location}
          </div>
        </div>
      </div>
      
    `
  });
   document.querySelector('.js-product-container').innerHTML = verifiedSectionHTML;

   document.querySelector('.js-location-change').innerHTML = locationText.innerHTML

   document.querySelector('.js-cart-count').innerHTML = `${watchlist.length}`;

   document.querySelectorAll(".js-product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.dataset.id;

      window.location.href = `product-details.html?id=${productId}`;
      
    });
  });
  }
 

  
function generateHeroSection() {
  let heroSectionHTML = '';

  heroCategories.forEach((category) => {
    heroSectionHTML += `
      <div class="category js-category" data-category="${category.title}">
        <img src="${category.image}" alt="Phones">
        <h3>${category.title}</h3>
      </div>
    `
  });

  document.querySelector('.js-categories').innerHTML = heroSectionHTML

  document.querySelectorAll('.js-category')
  .forEach((card) => {
    card.addEventListener('click', () => {
      const category = encodeURIComponent(card.dataset.category);

      window.location.href = `products-page.html?category=${category}`;
    });
  });
 
}
generateHeroSection();


function renderBudgetProducts(products) {
  let html = "";

  products.forEach((product) => {
    
    html += `
      <div class="product-card " >
        <div class="budget-card js-budget-card" data-id="${product.id}">
          <img src="${product.image}" alt="">
          <div class="card-info">
            <h3>${product.title}</h3>
            <h4>₦${product.price.toLocaleString()}</h4>
            <div class="location">
              <i class="fa-solid fa-location-dot"></i>
              <span>${product.location}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
  });
  document.querySelector(".js-budget-products").innerHTML = html;

  if (products.length === 0) {
  document.querySelector(".js-budget-products").innerHTML =
    "<p>No products found in this budget.</p>";
  return;
}

  document.querySelectorAll(".js-budget-card").forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.dataset.id;

      window.location.href = `product-details.html?id=${productId}`;
    });
  });
}


// LOCATION SEARCH  
 let currentLocation = "";

const locationButton = document.querySelector('.js-location-btn');
const locationDropdown = document.querySelector('.js-location-dropdown');
const locationText = document.querySelector('.location-text');

locationButton.addEventListener('click', () => {
    locationDropdown.classList.toggle('show');
});

const locationOptions = document.querySelectorAll('.js-location-dropdown button');

locationOptions.forEach((button) => {
    button.addEventListener('click', () => {
      currentLocation = button.dataset.location 

        locationText.innerHTML = currentLocation;
        locationDropdown.classList.remove('show');

        console.log(currentLocation)

        updateHomePage();
    });
});

function applyLocationFilter(products) {
    if (currentLocation === "") {
        return products;
    }

    return products.filter((product) => {
        return product.location.includes(currentLocation);
    });
}

       //SEARCH BY BUDGET

  let currentBudget = null;

const buttons = document.querySelectorAll(".budget-buttons button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {

    const min = Number(button.dataset.min);
    const max =
      button.dataset.max === "Infinity"
        ? Infinity
        : Number(button.dataset.max); 

      if (currentBudget && currentBudget.min === min &&
          currentBudget.max === max
      ) {
        currentBudget = null;
        buttons.forEach(btn => btn.classList.remove("active"));

      } else {
         currentBudget = { min, max };

    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active"); 

   
      }

       updateHomePage();
  });
});


// search function
const searchInput = document.getElementById("search");


let currentSearch = "";

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value;
  updateHomePage();
});


function applySearchFilter(products) {
    if (currentSearch === "") {
        return products;
    }

    const search = currentSearch.toLowerCase();

    return products.filter((product) => {
        
        return (
            product.title.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        );
    });
}


function updateHomePage() {
  let filteredProducts = applySearchFilter(products);
  


  if (currentBudget !== null) {
    filteredProducts = filteredProducts.filter(product => {
      return (
        product.price >= currentBudget.min &&
        product.price <= currentBudget.max
      );
    });
  }

  filteredProducts = applyLocationFilter(filteredProducts)

  renderVerifiedSection(filteredProducts.slice(0, 3));
  renderBudgetProducts(filteredProducts.slice(0, 6));
}

updateHomePage();