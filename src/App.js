import React from "react";
import "./App.css";
import Product from "./Tasks/Product";

function App() {
  return (
    <div className="App">
      <Product name="React_JS" price="priceless" description="For more functional programing" />
    </div>
  );
}

export default App;