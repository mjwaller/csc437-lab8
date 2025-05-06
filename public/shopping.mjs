const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];

/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */

const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");

function renderProductCard(product) {
    const article = document.createElement("article");
    article.innerHTML = `
      <img src="${product.imageSrc}" alt="${product.name}" />
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <div>
          <button class="buy-button">Add to cart</button>
          <span class="num-in-cart">${
            product.numInCart ? `${product.numInCart} in cart` : ""
          }</span>
        </div>
      </div>
    `;
  
    article.querySelector(".buy-button").addEventListener("click", () => {
      product.numInCart++;
      rerenderAllProducts();
      rerenderCart();
    });
  
    return article;
  }
  
  function clearChildren(el) {
    el.innerHTML = "";
  }
  
  const productList = document.querySelector(".product-list");
  
  function shouldProductBeVisible(product) {
    const minStr = minPriceInput.value;
    const maxStr = maxPriceInput.value;
    const min = minStr === "" ? -Infinity : Number.parseFloat(minStr);
    const max = maxStr === "" ?  Infinity : Number.parseFloat(maxStr);
    return product.price >= min && product.price <= max;
  }
  
  function rerenderAllProducts() {
    clearChildren(productList);
  
    const heading = document.createElement("h2");
    heading.textContent = "Search results";
    productList.append(heading);
  
    for (const product of PRODUCTS) {
      if (shouldProductBeVisible(product)) {
        productList.append(renderProductCard(product));
      }
    }
  }
  
  const cartSection = document.querySelector(".cart");
  const cartItemsDiv = cartSection.querySelector(".cart-items");
  
  function rerenderCart() {
    clearChildren(cartItemsDiv);
  
    const headerP = document.createElement("p");
    headerP.textContent = "Item";
    const headerBtn = document.createElement("p");
    headerBtn.textContent = "Action";
    headerP.className = headerBtn.className = "cart-items-header";
    cartItemsDiv.append(headerP, headerBtn);
  
    for (const product of PRODUCTS) {
      if (product.numInCart > 0) {
        const itemP = document.createElement("p");
        itemP.textContent = `${product.name} x${product.numInCart}`;
  
        const rmBtn = document.createElement("button");
        rmBtn.className = "remove-button";
        rmBtn.textContent = "Remove";
        rmBtn.addEventListener("click", () => {
          if (product.numInCart > 0) product.numInCart--;
          rerenderAllProducts();
          rerenderCart();
        });
  
        cartItemsDiv.append(itemP, rmBtn);
      }
    }
  }
  
  minPriceInput.addEventListener("change", rerenderAllProducts);
  maxPriceInput.addEventListener("change", rerenderAllProducts);
  
  rerenderAllProducts();
  rerenderCart();
