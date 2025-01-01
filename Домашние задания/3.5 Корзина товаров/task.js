const productList = document.querySelector('.product-list');
const cart = document.getElementById('cart');
const cartHeader = document.getElementById('cart-header');


function updateCartVisibility() {
    cart.style.display = cart.children.length > 0 ? 'block' : 'none';
    cartHeader.style.display = cart.children.length > 0 ? 'block' : 'none';
}

function adjustQuantity(event, productId, adjust = 1) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const quantityElement = productElement.querySelector('.product__quantity-value');
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity = Math.max(1, currentQuantity + adjust);
    quantityElement.textContent = currentQuantity;
}

function getProductDetails(productElement) {
    const productId = productElement.dataset.id;
    const productImage = productElement.querySelector('.product__image').src;
    const productQuantity = parseInt(productElement.querySelector('.product__quantity-value').textContent);
    return { productId, productImage, productQuantity };
}

function createCartItem(productId, productImage, productQuantity) {
    const cartProduct = document.createElement('div');
    cartProduct.classList.add('cart__product');
    cartProduct.dataset.id = productId;

    cartProduct.innerHTML = `
        <img class="cart__product-image" src="${productImage}">
        <div class="cart__product-count">${productQuantity}</div>
        <span class="cart__product-remove">x</span>
    `;

    return cartProduct;
}

function moveImageToCart(productImage, cartProduct) {
    const imgClone = productImage.cloneNode();
    imgClone.classList.add('cart__product-image-clone');

    const startRect = productImage.getBoundingClientRect();
    const cartRect = cartProduct.getBoundingClientRect();

    imgClone.style.left = `${startRect.left}px`;
    imgClone.style.top = `${startRect.top}px`;
    document.body.appendChild(imgClone);

        imgClone.style.transition = 'left 0.5s, top 0.5s';
       
     setTimeout(() => {

           imgClone.style.left = `${cartRect.left}px`;
           imgClone.style.top = `${cartRect.top}px`;
     
          setTimeout(() => {
                imgClone.remove();
            }, 500);
     }, 0);
}

productList.addEventListener('click', function(event) {
  const target = event.target;
    if (target.classList.contains('product__quantity-control_inc')) {
        const productId = target.closest('.product').dataset.id;
        adjustQuantity(event, productId);
    }
     if (target.classList.contains('product__quantity-control_dec')) {
        const productId = target.closest('.product').dataset.id;
        adjustQuantity(event, productId, -1);
    }
    if (target.classList.contains('product__add-to-cart')) {
        const productElement = target.closest('.product');
        const { productId, productImage, productQuantity } = getProductDetails(productElement);

        let cartItem = cart.querySelector(`.cart__product[data-id="${productId}"]`);
        if (cartItem) {
            const cartCountElement = cartItem.querySelector('.cart__product-count');
            cartCountElement.textContent = parseInt(cartCountElement.textContent) + productQuantity;
        } else {
            cartItem = createCartItem(productId, productImage, productQuantity);
            cart.appendChild(cartItem);
            moveImageToCart(productElement.querySelector('.product__image'), cartItem);
        }
        updateCartVisibility();
    }
});

cart.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart__product-remove')) {
         const cartItem = event.target.closest('.cart__product');
          cartItem.remove();
          updateCartVisibility();
    }
});
