// Slider Tour Detail
var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: imagesThumb,
  },
});
// End Slider Tour Detail

const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success]");
  if (elementAlert) {
    elementAlert.classList.remove("alert-hidden");

    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);

    const closeAlert = elementAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
      elementAlert.classList.add("alert-hidden");
    });
  }
};

// Carts

// Nếu chưa có giỏ hàng trong localStorage thì tạo giỏ hàng mới cho người dùng
const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Hiển thị SL sản phẩm vào mini-cart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if (miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    miniCart.innerHTML = totalQuantity;
  }
};

showMiniCart();

// Thêm tour vào giỏ hàng
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();

    const quantity = parseInt(event.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));

    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const indexExitsTour = cart.findIndex((item) => item.tourId == tourId);

      if (indexExitsTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity,
        });
      } else {
        cart[indexExitsTour].quantity =
          cart[indexExitsTour].quantity + quantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alertAddCartSuccess();

      showMiniCart();
    }
  });
}

// End Carts
