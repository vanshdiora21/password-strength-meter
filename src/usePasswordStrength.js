// src/usePasswordStrength.js
import { useMemo } from "react";

export function usePasswordStrength(password) {
  const result = useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const score =
      (hasMinLength ? 1 : 0) +
      (hasLower ? 1 : 0) +
      (hasUpper ? 1 : 0) +
      (hasNumber ? 1 : 0) +
      (hasSpecial ? 1 : 0);

    let strengthLabel = "";
    if (!password) {
      strengthLabel = "";
    } else if (score <= 2) {
      strengthLabel = "Weak";
    } else if (score <= 4) {
      strengthLabel = "Medium";
    } else if (score === 5) {
      strengthLabel = "Strong";
    }

    const strengthPercent = (score / 5) * 100;

    const getBarColor = () => {
      if (score <= 2) return "#e74c3c"; // red
      if (score <= 4) return "#f1c40f"; // yellow
      return "#2ecc71"; // green
    };

    return {
      hasMinLength,
      hasLower,
      hasUpper,
      hasNumber,
      hasSpecial,
      score,
      strengthLabel,
      strengthPercent,
      barColor: getBarColor(),
    };
  }, [password]);

  return result;
}
