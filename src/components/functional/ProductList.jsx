import ProductCard from "./ProductCard";

function ProductList({ products, onChangeStock, onDelete }) {
  return (
    <div>
      {products.length === 0 ? (
        <p>No products found. Add a product to get started.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onChangeStock={onChangeStock}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
