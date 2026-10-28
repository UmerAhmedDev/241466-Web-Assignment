import { useTheme } from "../../context/ThemeContext";

function CardWrapper({ title, children }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        border: theme === "dark" ? "1px solid #666" : "1px solid gray",
        background: theme === "dark" ? "#2b2b2b" : "white",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        width: "220px",
      }}
    >
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

export default CardWrapper;
