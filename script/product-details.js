import { products } from "../Data/products.js";


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
<div class='product-gallery'>
  <div class='main-image'>
    <img src='${product.image}' alt='${product.title}'>
  </div>
</div>

<div class='product-info'>
  <h1>${product.title}</h1>

  <p class='price'>₦${product.price}</p>

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
    <button class='decrease-btn'>-</button>

    <span class='quantity-value'>1</span>

    <button class='increase-btn'>+</button>
  </div>

  <div class='cart-buttons-container'>
    <button class='add-cart'>Add to Cart</button>

    <button class='add-cart'>Contact Seller</button>
  </div>
</div>

<div class='product-specifications'>
  <h2>Specifications</h2>

  ${specificationsHTML}
  </div>
</div>
`;

document.querySelector('.js-product-details').innerHTML = productDetailsHTML;