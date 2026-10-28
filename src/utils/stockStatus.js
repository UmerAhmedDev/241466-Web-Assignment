export function getStatus(stock) {
  if (stock === 0) {
    return "Out of Stock";
  } else if (stock <= 5) {
    return "Low Stock";
  } else {
    return "In Stock";
  }
}
