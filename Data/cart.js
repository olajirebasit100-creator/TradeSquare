export let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [{
  productId: '1',
  quantity: 1
},{
  productId: '2',
  quantity: 1
}]

export function saveToStorage() {
   localStorage.setItem('watchlist', JSON.stringify(watchlist))
} 

export function removeFromWatchlist(productId) {
  watchlist = watchlist.filter((item) => {
    return item.productId !== productId
  });
  saveToStorage();
}