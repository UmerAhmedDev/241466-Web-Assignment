import CardWrapper from "./CardWrapper";

function InventoryMetrics({ totalProducts, activeProducts, totalUnits, totalValue, lowCount }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <CardWrapper title="Total Products">
        <p>{totalProducts}</p>
      </CardWrapper>
      <CardWrapper title="Active Products">
        <p>{activeProducts}</p>
      </CardWrapper>
      <CardWrapper title="Total Units">
        <p>{totalUnits}</p>
      </CardWrapper>
      <CardWrapper title="Stock Value">
        <p>${totalValue}</p>
      </CardWrapper>
      <CardWrapper title="Low Stock Items">
        <p>{lowCount}</p>
      </CardWrapper>
    </div>
  );
}

export default InventoryMetrics;
