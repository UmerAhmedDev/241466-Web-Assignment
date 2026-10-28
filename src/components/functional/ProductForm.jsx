import { useEffect, useRef, useState } from "react";

function ProductForm({ categories, onAdd }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "" || stock === "" || price === "") {
      return;
    }
    onAdd({ name: name.trim(), category, stock: Number(stock), price: Number(price) });
    setName("");
    setStock("");
    setPrice("");
    nameRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: "15px", margin: "10px", border: "1px solid gray", borderRadius: "8px" }}>
      <h2>Add Product</h2>
      <input
        ref={nameRef}
        type="text"
        placeholder="Product Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>{" "}
      <input
        type="number"
        min="0"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />{" "}
      <input
        type="number"
        min="0"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />{" "}
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
