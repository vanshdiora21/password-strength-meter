/**
 * usePasswordStrength.js
 * Custom React hook to calculate password strength (rules, score, label, bar data).
 * Author: Vansh Diora
 *
 * This hook encapsulates all password-related logic:
 * - Evaluates five rules (length, lowercase, uppercase, number, special char).
 * - Returns a numeric score from 0–5.
 * - Maps the score to a label ("Weak", "Medium", "Strong").
 * - Computes a percentage and color for the strength bar.
 *
 * It uses useMemo (slightly beyond intro React) so the calculation only runs
 * again when the password changes, instead of on every re-render.
 */

import { useMemo } from "react";

export function usePasswordStrength(password) {
  // useMemo caches the result until `password` changes. This is an optimization
  // pattern often used when deriving values from state in React.[web:8][web:16]
  const result = useMemo(() => {
    // ----- RULE CHECKS -----
    // These are the five rules we use to judge password strength.
    const hasMinLength = password.length >= 8;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password); // any non‑alphanumeric char

    // ----- SCORE CALCULATION -----
    // Each rule contributes 1 point to the score if it passes (0–5 total).
    const score =
      (hasMinLength ? 1 : 0) +
      (hasLower ? 1 : 0) +
      (hasUpper ? 1 : 0) +
      (hasNumber ? 1 : 0) +
      (hasSpecial ? 1 : 0);

    // Convert score into a human‑readable label.
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

    // Percentage for the fill of the strength bar (used by the UI component).
    const strengthPercent = (score / 5) * 100;

    // Map score to a color: red → yellow → green, similar to common UI meters.[web:17][web:18]
    const getBarColor = () => {
      if (score <= 2) return "#e74c3c"; // red
      if (score <= 4) return "#f1c40f"; // yellow
      return "#2ecc71"; // green
    };

    // Return all derived values so the UI component can stay focused on layout/UX.
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
  }, [password]); // Recompute only when `password` changes.

  return result;
}
