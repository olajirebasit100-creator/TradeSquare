import { products } from "../Data/products.js";


let currentSearch = '';
let currentSort = 'featured'
function renderProducts() {
  
  const url = new URL(window.location.href);

  const selectedCategory = url.searchParams.get('category')

  let filteredProducts = products;
  

  if (selectedCategory) {
    filteredProducts = products.filter((product) => {
      return product.category === selectedCategory
    });
  };

  filteredProducts = applySearchFilter(filteredProducts);
  filteredProducts = applySort(filteredProducts);


  let productsCardHTML = '';
  filteredProducts.forEach((product) => {
productsCardHTML += `
  <div class="product-card js-product-card" data-id="${product.id}">
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}">
    </div>

    <div class="product-info">
      <span class="product-category">${product.category}</span>

      <h3 class="product-title">
        ${product.title}
      </h3>

      <p class="product-price">₦${product.price.toLocaleString()}</p>

      <div class="product-meta">
        <span>${product.location}</span>
        <span>${product.condition}</span>
      </div>
    </div>
  </div>
`;
  });
  document.querySelector('.js-product-grid').innerHTML = productsCardHTML;

  addProductCardEvents();
 
}
renderProducts();

function addProductCardEvents() {
  
  document.querySelectorAll(".js-product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const productId = card.dataset.id;

    window.location.href = `product-details.html?id=${productId}`;
    console.log(productId)
  });
});
}



  document.querySelector('.js-available-product').innerHTML = products.length


// search filter 
const searchIput = document.getElementById('search');

searchIput.addEventListener('input', () => {
  currentSearch = searchIput.value;

   renderProducts();
 
});

function applySearchFilter(products) {
  if (currentSearch === '') {
    return products
  }

  const search = currentSearch.toLowerCase();
  
  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.location.toLowerCase().includes(search)
    );
  });
}

// sort filter
document.querySelector('.js-sort').addEventListener('change', (event) => {
  currentSort = event.target.value
  renderProducts();
});

function applySort(products) {

  if (currentSort === 'featured') {
    return products.filter((product) => {
      return product.featured;
    });
  }

  const sortedProducts = [...products];

  if (currentSort === 'low-high') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (currentSort === 'high-low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (currentSort === 'high-low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts
};