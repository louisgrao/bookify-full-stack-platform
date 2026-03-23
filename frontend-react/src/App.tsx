import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [item, setItem] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((data) => data.json())
      .then((data) => setItem(data.id));
  }, []);

  return (
    <div>
      <h2>Data from FastAPI: {item}</h2>
    </div>
  );
}

export default App;
