/**
 * App.js
 * Root component that renders the Password Strength Meter feature.
 * Authors: Jannhya Chheda & Vansh Diora
 *
 * This file wires the feature into the main app so it can be demoed
 * for the Show and Tell assignment:
 * - Shows a title and short description.
 * - Renders the <PasswordStrength /> component in the center of the page.
 */

import "./App.css";
import PasswordStrength from "./PasswordStrength";

function App() {
  return (
    <div className="App" style={{ padding: "32px", textAlign: "center" }}>
      {/* Page title */}
      <h1>React Password Strength Meter</h1>

      {/* Brief explanation of what the feature does. */}
      <p style={{ maxWidth: "500px", margin: "0 auto 16px" }}>
        Type a password to see its strength based on length, lowercase,
        uppercase, numbers, and special characters.
      </p>

      {/* Main feature component composed into the app. */}
      <PasswordStrength />
    </div>
  );
}

export default App;
