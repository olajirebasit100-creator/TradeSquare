import { products } from "../Data/products.js";

function renderProducts() {
  
  const url = new URL(window.location.href);

  const selectedCategory = url.searchParams.get('category')

  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = products.filter((product) => {
      return product.category === selectedCategory
    });
  };


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

      <p class="product-price">₦${product.price}</p>

      <div class="product-meta">
        <span>${product.location}</span>
        <span>${product.condition}</span>
      </div>
    </div>
  </div>
`;
  });
  document.querySelector('.js-product-grid').innerHTML = productsCardHTML;
 
}
renderProducts();



  document.querySelector('.js-available-product').innerHTML = products.length

  document.querySelectorAll(".js-product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const productId = card.dataset.id;

    window.location.href = `product-details.html?id=${productId}`;
    console.log(productId)
  });
});
// search filter
const searchIput = document.getElementById('search');

let currentSearch = '';

searchIput.addEventListener('input', () => {
  currentSearch = searchIput.value;
 
});

function applySearchFilter(products) {
  if (currentSearch === '') {
    return products
  }

  const search = currentSearch.toLocaleLowerCase();
  
  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.location.toLowerCase().includes(search)
    );
  });
}


applySearchFilter(products);