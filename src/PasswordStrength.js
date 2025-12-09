/**
 * PasswordStrength.js
 * React component that renders:
 * - Password input with show/hide toggle.
 * - Confirm password input with match/mismatch messages.
 * - Strength meter bar and rule checklist.
 * Author: Jannhya Chheda
 *
 * This component focuses on UI/UX:
 * - It calls the custom hook `usePasswordStrength` to get strength data.
 * - It shows real‑time feedback as the user types.
 * - It includes confirm-password validation to simulate a real signup form.
 */

import { useState } from "react";
import { usePasswordStrength } from "./usePasswordStrength";

function PasswordStrength() {
  // Main password and visibility toggle
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Confirm password field
  const [confirmPassword, setConfirmPassword] = useState("");

  // Destructure all the derived values from the custom hook.
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

  // Confirm password logic:
  // - `hasConfirm` tracks if the user has typed anything.
  // - `passwordsMatch` becomes true only when both fields are non‑empty and equal.
  const hasConfirm = confirmPassword.length > 0;
  const passwordsMatch = hasConfirm && confirmPassword === password;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
      {/* MAIN PASSWORD FIELD */}
      <label
        htmlFor="password"
        style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}
      >
        Password
      </label>

      {/* Input + Show/Hide toggle wrapped in a relative container */}
      <div style={{ position: "relative", marginBottom: "4px" }}>
        <input
          id="password"
          // Switch input type between "password" and "text" based on toggle.
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 70px 8px 8px", // extra right padding to make room for button
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          placeholder="Type a password..."
        />

        {/* Show/Hide password button (type="button" so it does not submit forms). */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "4px 8px",
            fontSize: "0.8rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#f8f8f8",
            cursor: "pointer",
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Short helper text to guide users toward creating a strong password. */}
      <p style={{ fontSize: "0.8rem", marginTop: "4px", color: "#666" }}>
        Use at least 8 characters including upper/lowercase, numbers, and
        symbols.
      </p>

      {/* CONFIRM PASSWORD FIELD */}
      <label
        htmlFor="confirm-password"
        style={{
          display: "block",
          marginTop: "16px",
          marginBottom: "4px",
          fontWeight: "bold",
        }}
      >
        Confirm Password
      </label>

      <input
        id="confirm-password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        placeholder="Re-type your password..."
      />

      {/* Match / mismatch messages:
          - Only show once the user starts typing in the confirm field. */}
      {hasConfirm && !passwordsMatch && (
        <p
          style={{
            color: "#e74c3c",
            fontSize: "0.85rem",
            marginTop: "4px",
          }}
        >
          Passwords do not match.
        </p>
      )}

      {hasConfirm && passwordsMatch && (
        <p
          style={{
            color: "#2ecc71",
            fontSize: "0.85rem",
            marginTop: "4px",
          }}
        >
          Passwords match.
        </p>
      )}

      {/* Only show strength meter UI when there is some input in the main password. */}
      {password && (
        <>
          {/* Strength label and numeric score for clarity. */}
          <p style={{ margin: "12px 0 4px", fontWeight: "bold" }}>
            Strength: {strengthLabel} ({score}/5)
          </p>

          {/* Background bar container. */}
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
            {/* Filled portion of the bar, width/color based on hook output. */}
            <div
              style={{
                height: "100%",
                width: `${strengthPercent}%`,
                backgroundColor: barColor,
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          </div>

          {/* Checklist of individual rules with pass/fail color coding. */}
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
