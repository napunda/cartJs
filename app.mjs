import products from "./data.mjs";

let cart = [];
let productosSelect = [];

products.forEach(({ id, title, description, weight, price, img }) => {
  const productHtml = `
<div class="products-card-description">
   <h2>${title}</h2>
    <span class="description">${description}</span>
    <span class="weight">${weight}</span>
    <span class="price">R$ ${String(price.toFixed(2)).replace(".", ",")}</span>
    <button data-idProduct="${id}" class="addCartButton">Adicionar</button>
</div>
${img ? `<img src="${img}" alt="${title}">` : ``}
`;
  const container = document.querySelector(".products-container");
  const product = document.createElement("div");
  product.classList.add("products-card");
  product.innerHTML = productHtml;
  container.appendChild(product);
});

const buttons = document.querySelectorAll(".addCartButton");
buttons.forEach((item) => {
  item.addEventListener("click", () => {
    item.textContent === "Remover"
      ? (item.textContent = "Adicionar")
      : (item.textContent = "Remover");
    item.classList.toggle("selected");
    productosSelect = [...productosSelect, Number(item.dataset.idproduct)];
    addProductsCart(products, Number(item.dataset.idproduct));
    addProductCartHtml();
    getCartTotalPrice();
  });
});

const addProductsCart = (products, id) => {
  if (!cart.find((element) => element.id === id)) {
    const product = products.find((element) => element.id === id);
    product.amount = 1;
    cart = [...cart, product];
  } else {
    const newCart = cart.filter((element) => element.id != id);
    cart = newCart;
  }
};

//Cart section
const cartFloat = document.querySelector(".cart-products");

const addProductCartHtml = () => {
  if (cart.length) {
    cartFloat.parentNode.classList.remove("hidden");
  } else {
    cartFloat.parentNode.classList.add("hidden");
  }
  cartFloat.innerHTML = "";
  cart.forEach((item) => {
    const itemHtml = document.createElement("div");
    itemHtml.classList.add("product-cart");
    itemHtml.innerHTML = `
    <div class="info-product">
    <span class="title">${item.title}</span>
    <span class="price">R$ ${String(item.price.toFixed(2)).replace(
      ".",
      ","
    )}</span>
    </div>
    <div>
    Quantitade: ${item.amount}
    </div>`;
    cartFloat.appendChild(itemHtml);
  });
};

const getCartTotalPrice = () => {
  const price = document.querySelector(".send-order .price");

  const totalPrice = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );

  price.textContent = String(totalPrice.toFixed(2)).replace(".", ",");

  return totalPrice;
};

const sendOrder = () => {
  let templateString = `Olá, boa noite. Segue abaixo a lista do meu pedido e demais informações: `;
  cart.forEach((item) => {
    templateString += ` Nome de Pedido: ${item.title} `;

    templateString += `Valor: R$ ${String(item.price.toFixed(2)).replace(
      ".",
      ","
    )} `;
  });
  templateString += ` *Preço total do pedido: R$ ${String(
    getCartTotalPrice().toFixed(2)
  ).replace(".", ",")}*`;
  window.open(`https://wa.me/+5566996291876?text=${templateString}`);
};

const sendOrderButton = document.querySelector(".send-order button");
sendOrderButton.addEventListener("click", sendOrder);

const closeCartBtn = document.querySelector(".cancel-order button");
closeCartBtn.addEventListener("click", () => {
  cartFloat.parentNode.classList.add("hidden");
});
