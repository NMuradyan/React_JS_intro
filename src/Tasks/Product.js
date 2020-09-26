import React from "react";
import Price from "./Price";
import Name from "./Name";
import Description from "./Description";

class Product extends (Price, Name, Description){

    render() {
        return (
        <div>
            <p>{this.props.name}</p>
            <p>{this.props.price}</p>
            <p>{this.props.description}</p>
        </div>
        );
    }
}

export default Product;