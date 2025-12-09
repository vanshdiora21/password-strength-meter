// src/App.js
import "./App.css";
import PasswordStrength from "./PasswordStrength";

function App() {
  return (
    <div className="App" style={{ padding: "32px", textAlign: "center" }}>
      <h1>React Password Strength Meter</h1>
      <p style={{ maxWidth: "500px", margin: "0 auto 16px" }}>
        Type a password to see its strength based on length, lowercase,
        uppercase, numbers, and special characters.
      </p>
      <PasswordStrength />
    </div>
  );
}

export default App;
