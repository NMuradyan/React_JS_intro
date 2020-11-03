import React from "react";
import "./App.css";
// import Product from "./Tasks/Product";
import ToDo from "./Components/ToDo";

function App() {
  return (
    <div className="App">
      {/* <Product
      name = {"React_JS"}
      description = "For more functional programing"
      price = "1$"
      rate = {485}
      /> */}
      <ToDo />
    </div>
  );
}

export default App;