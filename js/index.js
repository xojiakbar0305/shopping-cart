let carts = document.querySelectorAll('.add-cart');
let productContainer = document.querySelector(".products");

let products = [
  {
    name: 'Grey Tshirt',
    tag: 'cost',
    price: 15,
    inCart: 0,
  },
  {
    name: 'Grey Hoddie',
    tag: 'fazo',
    price: 20,
    inCart: 0,
  },
  {
    name: 'Black Tshirt',
    tag: 'ranglar',
    price: 10,
    inCart: 0,
  },
  {
    name: 'Black Hoddie',
    tag: 'taom',
    price: 25,
    inCart: 0,
  }
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totolCost(products[i]);
  })
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  
  productNumbers = parseInt(productNumbers);
  
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  }
  else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if(cartItems !== null) {

    if (cartItems[product.tag] === undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }

    cartItems[product.tag].inCart += 1; 
  }
  else {
    product.inCart = 1;

    cartItems = {
      [product.tag]: product
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totolCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  
  if (cartCost !== null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  }
  else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class="product">
          <ion-icon class="close-icon" name="close-circle-outline" id="${ item.tag }"></ion-icon>
          <img src="./img/${ item.tag }.png" width="50" height="50"/>
          <span>${ item.name }</span>
        </div>

        <div class="price">$${ item.price },00</div>

        <div class="quantity">
          <ion-icon name="caret-back-circle-outline"></ion-icon>
          <span>${ item.inCart }</span>
          <ion-icon name="caret-forward-circle-outline"></ion-icon>
        </div>

        <div class="total">$${ item.inCart * item.price },00</div>
      `;
    });
    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <button class="clear-button">Clear Basket</button>
        <h4 class="basketTotalTitle">
          Basket Total
        </h4>
        <h4 class="basketTotal">
          $${cartCost},00
        </h4>
      </div>
    `;
  }
}

onLoadCartNumbers();
displayCart();