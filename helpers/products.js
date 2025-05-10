module.exports.priceNewProducts = (products)=> {
  const newProducts = products.map(item => {
      item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
      return item;
  })
  return newProducts;
}


module.exports.priceNew = (product) => {
  if (product && typeof product.price === 'number' && typeof product.discountPercentage === 'number') {
    const priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
    return parseFloat(priceNew); // Chuyển về kiểu số để dễ sử dụng
  } else {
    // Xử lý trường hợp product không có giá hoặc discountPercentage hợp lệ
    console.error("Lỗi: Đối tượng product không có thuộc tính price hoặc discountPercentage hợp lệ.");
    return null; // Hoặc bạn có thể trả về giá gốc hoặc một giá trị mặc định khác
  }
};