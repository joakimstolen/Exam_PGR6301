//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/client/book.jsx

import React from "react";
import {Link, withRouter} from 'react-router-dom'

export class AuctionItemBid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name ? this.props.name : "",
            description: this.props.description ? this.props.description : "",
            startingPrice: this.props.startingPrice ? this.props.startingPrice : "",
            highestBid: this.props.highestBid ? this.props.highestBid : "",
            userId: this.props.userId ? this.props.userId : this.props.userId,
            available: this.props.available ? this.props.available : true

        };

        this.ok = this.props.ok ? this.props.ok : "Ok"

    }


    onFormSubmit2 = async (event) => {
        event.preventDefault();

        if (this.state.highestBid > this.props.highestBid && this.state.highestBid > this.props.startingPrice){
            const completed = await this.props.okCallback(
                this.props.name,
                this.props.description,
                this.props.startingPrice,
                this.state.highestBid,
                this.props.itemId,
                this.state.available,
                this.state.userId
            );


            console.log(this.props.name);
            if (completed) {
                this.props.history.push('/items');
            } else {
                alert("Failed to bid on item")
            }
        } else {
            alert("Too low bid. Your bid must be greater than the starting price and the current highest bid.")
        }


    };


    onHighestBidChange = (event) => {
        this.setState({highestBid: event.target.value})
    };


    render() {

        return (

            <div className="menuWrapper">


                <form onSubmit={this.onFormSubmit2}>

                    <h1 className={"info"}>{this.props.name}</h1>
                    <h3 className={"info"}>Current bid: {this.props.highestBid}</h3>
                    <h3 className={"info"}>Starting Price: {this.props.startingPrice}</h3>
                    <div className="inputBid">Your bid:</div>
                    <input
                        placeholder={"Type your bid for this auction item"}
                        onChange={this.onHighestBidChange}
                        type="number"
                        className="itemInput"
                        id="itemHighestBid"
                    />


                    <button type="submit" className={"submitBtn"}>{this.ok}</button>
                    <Link to={"/items"}>
                        <button className={"btn"}>Cancel</button>
                    </Link>

                </form>

            </div>

        )
    }


}


export default withRouter(AuctionItemBid);