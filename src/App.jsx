import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/functional/Header";
import InventoryMetrics from "./components/functional/InventoryMetrics";
import ProductForm from "./components/functional/ProductForm";
import ProductList from "./components/functional/ProductList";
import AuditLogger from "./components/class/AuditLogger";
import useDocumentTitle from "./hooks/useDocumentTitle";
import { getStatus } from "./utils/stockStatus";

const categories = ["Electronics", "Tools", "Accessories", "Office"];

const startProducts = [
  { id: 1, name: "Digital Multimeter", category: "Tools", stock: 25, price: 45 },
  { id: 2, name: "Oscilloscope", category: "Electronics", stock: 3, price: 299 },
  { id: 3, name: "Soldering Iron", category: "Tools", stock: 0, price: 25 },
  { id: 4, name: "USB Cable", category: "Accessories", stock: 60, price: 5 },
  { id: 5, name: "Office Chair", category: "Office", stock: 8, price: 120 },
];

function AppContent() {
  const { theme } = useTheme();
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("inventory");
    return saved ? JSON.parse(saved) : startProducts;
  });
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [event, setEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(products));
  }, [products]);

  const visibleProducts = useMemo(() => {
    return products.filter(
      (p) =>
        (categoryFilter === "All" || p.category === categoryFilter) &&
        (statusFilter === "All" || getStatus(p.stock) === statusFilter)
    );
  }, [products, categoryFilter, statusFilter]);

  const metrics = useMemo(() => {
    return {
      totalProducts: products.length,
      activeProducts: products.filter((p) => p.stock > 0).length,
      totalUnits: products.reduce((sum, p) => sum + p.stock, 0),
      totalValue: products.reduce((sum, p) => sum + p.stock * p.price, 0),
      lowCount: products.filter((p) => getStatus(p.stock) === "Low Stock").length,
    };
  }, [products]);

  useDocumentTitle(`Inventory (${metrics.activeProducts} active products)`);

  const addProduct = useCallback((data) => {
    const newProduct = { id: Date.now(), ...data };
    setProducts((current) => [...current, newProduct]);
    setEvent({ id: newProduct.id, message: `Product added: ${data.name}` });
  }, []);

  const changeStock = useCallback((id, name, amount) => {
    setProducts((current) =>
      current.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + amount) } : p))
    );
    setEvent({ id: Date.now(), message: `Stock updated for ${name}: ${amount > 0 ? "+" : ""}${amount}` });
  }, []);

  const deleteProduct = useCallback((id, name) => {
    setProducts((current) => current.filter((p) => p.id !== id));
    setEvent({ id: Date.now(), message: `Item deleted: ${name}` });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: theme === "dark" ? "#1b1b1b" : "#f4f4f4",
        color: theme === "dark" ? "white" : "#222",
      }}
    >
      <Header title="Inventory and Stock Dashboard" />
      <InventoryMetrics {...metrics} />
      <ProductForm categories={categories} onAdd={addProduct} />
      <div style={{ padding: "10px" }}>
        <label>
          Category:{" "}
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>{" "}
        <label>
          Status:{" "}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </label>
      </div>
      <ProductList products={visibleProducts} onChangeStock={changeStock} onDelete={deleteProduct} />
      <AuditLogger event={event} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
