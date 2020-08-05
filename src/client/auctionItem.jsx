import React from "react";
import {Link, withRouter} from 'react-router-dom'

export class AuctionItem extends React.Component {
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

    onFormSubmit = async (event) => {
        event.preventDefault();

        const completed = await this.props.okCallback(
            this.state.name,
            this.state.description,
            this.state.startingPrice,
            this.state.highestBid,
            this.props.itemId
        );

        if(completed) {
            this.props.history.push('/items');
        } else {
            alert("Failed to create new menu item")
        }
    };


    onNameChange = (event) => {
        this.setState({name: event.target.value})
    };

    onDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    };

    onStartingPriceChange = (event) => {
        this.setState({startingPrice: event.target.value})
    };

    onHighestBidChange = (event) => {
        this.setState({highestBid: event.target.value})
    }



    render() {

        return (

            <div className="menuWrapper">


                <form onSubmit={this.onFormSubmit}>
                    <div className="inputName">Name:</div>
                    <input
                        placeholder={"Type the name of this auction item"}
                        value={this.state.name}
                        onChange={this.onNameChange}
                        className="itemInput"
                        id="itemName"
                    />
                    <div className="inputDescription">Description:</div>
                    <input
                        placeholder={"Type the description of this auction item"}
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        className="itemInput"
                        id="itemDescription"
                    />
                    <div className="inputStartingPrice">Starting Price:</div>
                    <input
                        placeholder={"Type your starting price for this auction item"}
                        value={this.state.startingPrice}
                        onChange={this.onStartingPriceChange}
                        className="itemInput"
                        id="itemStartingPrice"
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


export default withRouter(AuctionItem);