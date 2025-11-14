import React from "react";
import BugTracker from "./components/BugTracker";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">MERN Bug Tracker</h1>
      <ErrorBoundary>
        <BugTracker />
      </ErrorBoundary>
    </div>
  );
}

export default App;
