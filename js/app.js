let elClose = document.querySelector('.close-icon');
// let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

//local update
var updateStorage = () => {
  let cartItems = localStorage.getItem("productsInCart");
  localStorage.setItem("productsInCart", cartItems);
};

productContainer.addEventListener('click', (evt) => {
  if (evt.target.matches('.clear-button')) {
    localStorage.clear();
    updateStorage();
  }
})