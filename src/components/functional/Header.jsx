import { useTheme } from "../../context/ThemeContext";

function Header({ title }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px" }}>
      <h1>{title}</h1>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </header>
  );
}

export default Header;
