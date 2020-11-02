import React from "react";

class Price extends React.Component{
    constructor(props){
        super(props);

        this.state={
            price: props.price,
            rate: props.rate
        };
    }

    buttonClick = ()=>{
        let {price, rate} = this.state;
        let sign = price[price.length-1];
        if(sign === "$"){
            let amd = parseFloat(price) * rate + "€";
            this.setState({
                price: amd
            });
        }else if(sign === "€"){
            let usd = parseFloat(price) / rate + "$";
            this.setState({
                price: usd
            });
        }
    };

    render() {
        return (
        <>
        <p>Price: {this.state.price}</p>
        <button onClick={this.buttonClick}>
            Exchange
        </button>
        </>
        );
    }
}

export default Price;