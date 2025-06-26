// xử lý khi thay đổi số lượng sản phẩm trong giỏ hàng


const inputQuantity = document.querySelectorAll('input[name="quantity"]');
if (inputQuantity.length > 0) {
  inputQuantity.forEach((input) => {
    input.addEventListener("change", (event)=> {
      const productId = input.getAttribute("item-id");
      const quantity = event.target.value;

      window.location.href = `/cart/update/${productId}/${quantity}`;
    })
  })

}