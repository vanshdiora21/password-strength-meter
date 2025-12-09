// src/PasswordStrength.js
import { useState } from "react";
import { usePasswordStrength } from "./usePasswordStrength";

function PasswordStrength() {
  const [password, setPassword] = useState("");

  const {
    hasMinLength,
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
    score,
    strengthLabel,
    strengthPercent,
    barColor,
  } = usePasswordStrength(password);

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
      <label
        htmlFor="password"
        style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}
      >
        Password
      </label>

      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        placeholder="Type a password..."
      />

      <p style={{ fontSize: "0.8rem", marginTop: "4px", color: "#666" }}>
        Use at least 8 characters including upper/lowercase, numbers, and
        symbols.
      </p>

      {password && (
        <>
          <p style={{ margin: "8px 0 4px", fontWeight: "bold" }}>
            Strength: {strengthLabel} ({score}/5)
          </p>

          <div
            style={{
              height: "8px",
              width: "100%",
              backgroundColor: "#eee",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${strengthPercent}%`,
                backgroundColor: barColor,
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          </div>

          {score <= 2 && (
            <p
              style={{
                color: "#e74c3c",
                fontSize: "0.85rem",
                margin: "4px 0",
              }}
            >
              This password is quite weak. Try adding more variety or length.
            </p>
          )}

          <ul
            style={{
              paddingLeft: "18px",
              marginTop: "4px",
              fontSize: "0.9rem",
              lineHeight: 1.4,
            }}
          >
            <li style={{ color: hasMinLength ? "green" : "red" }}>
              At least 8 characters
            </li>
            <li style={{ color: hasLower ? "green" : "red" }}>
              At least one lowercase letter
            </li>
            <li style={{ color: hasUpper ? "green" : "red" }}>
              At least one uppercase letter
            </li>
            <li style={{ color: hasNumber ? "green" : "red" }}>
              At least one number
            </li>
            <li style={{ color: hasSpecial ? "green" : "red" }}>
              At least one special character
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default PasswordStrength;
