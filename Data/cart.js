export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: '1',
  quantity: 1
},{
  productId: '2',
  quantity: 1
}]

export function saveToStorage() {
   localStorage.setItem('cart', JSON.stringify(cart))
}