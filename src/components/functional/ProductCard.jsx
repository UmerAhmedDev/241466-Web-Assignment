import { memo } from "react";
import CardWrapper from "./CardWrapper";
import { getStatus } from "../../utils/stockStatus";

function ProductCard({ product, onChangeStock, onDelete }) {
  const { id, name, category, stock, price } = product;
  const status = getStatus(stock);

  let badgeColor;
  if (status === "In Stock") {
    badgeColor = "green";
  } else if (status === "Low Stock") {
    badgeColor = "orange";
  } else {
    badgeColor = "red";
  }

  return (
    <CardWrapper title={name}>
      <p>Category: {category}</p>
      <p>Price: ${price}</p>
      <p>Stock: {stock}</p>
      <span style={{ background: badgeColor, color: "white", padding: "2px 8px", borderRadius: "4px" }}>
        {status}
      </span>
      {stock === 0 && <p style={{ color: "red" }}>Restock needed</p>}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onChangeStock(id, name, 1)}>+1</button>
        <button onClick={() => onChangeStock(id, name, -1)} disabled={stock === 0}>
          -1
        </button>
        <button onClick={() => onDelete(id, name)}>Delete</button>
      </div>
    </CardWrapper>
  );
}

export default memo(ProductCard);
