import React from "react";
import {Link, withRouter} from 'react-router-dom'

export class AuctionItemBid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name ? this.props.name : "",
            description: this.props.description ? this.props.description : "",
            startingPrice: this.props.startingPrice ? this.props.startingPrice : "",
            highestBid: this.props.highestBid ? this.props.highestBid : ""
        };

        this.ok = this.props.ok ? this.props.ok : "Ok"

    }


    onFormSubmit2 = async (event) => {
        event.preventDefault();

        const completed = await this.props.okCallback(
            this.props.name,
            this.props.description,
            this.props.startingPrice,
            this.state.highestBid,
            this.props.itemId

        );

        console.log(this.props.name);
        if(completed) {
            this.props.history.push('/items');
        } else {
            alert("Failed to bid on item")
        }
    };





    onHighestBidChange = (event) => {
        this.setState({highestBid: event.target.value})
    };


    render() {

        return (

            <div className="menuWrapper">


                <form onSubmit={this.onFormSubmit2}>

                    <div className="inputBid">Your bid: </div>
                    <input
                        placeholder={"Type your bid for this auction item"}
                        value={this.state.highestBid}
                        onChange={this.onHighestBidChange}
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