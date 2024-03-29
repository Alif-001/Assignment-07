// api fetch

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product", "m-3", "py-3");
    div.innerHTML = `
    <div class="single-product m-1 py-5 card-color w-100">
        <div >
          <div class = 'card-img-color'>
             <div>
                <img class="product-image" src=${image}></img>
          </div>
          </div>
          <h3  class='fs-1 m-4'>${product.title}</h3>
          <p class='fs-3'>Category : ${product.category}</p>
          <p class="fs-3">Ratings : ( ${product.rating.rate} )</p>
          <p class="fs-3">Reviews by : ${product.rating.count}</p>
          <h2 class='mb-3 text-danger'>Price : $ ${product.price}</h2>
        </div>
       <div class= 'card-btn '>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary btn-lg p-3 fs-4">Add to cart</button>
          <button id="details-btn" class="btn btn-outline-danger  btn-lg
          p-3 fs-4">Details</button>
        </div>
    </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};

// call functions
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText =
    parseFloat(grandTotal).toFixed(2);
};
