import React from "react";
import AuctionItemBid from "./auctionItemBid";
import {withRouter} from "react-router-dom";

export class Bid extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            item: null,
            error: null
        };

        this.itemId = new URLSearchParams(window.location.search).get("itemId");

        if (this.itemId === null){
            this.state.error = "Unspecified item id";
        }
    }


    componentDidMount() {
        if (this.state.error === null){
            this.fetchItem();
        }

        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }

    async fetchItem(){

        const url = "/api/items/" + this.itemId;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload =  await response.json();
        } catch (err) {
            this.setState({
                error: "Error when retrieving item: " + err,
                item: null
            });
            return;
        }

        if (response.status === 200){
            this.setState({
                error: null,
                item: payload
            });
        } else {
            this.setState({
                error: "Issue with the HTTP connection: status code: " + response.status,
                item: null
            })
        }

        if (response.status === 401) {
            //I have custom error for such situations so no handling it here
            return;
        }

    }


    onOk = async (name, description, startingPrice, highestBid, id, available, userId) => {
        const url = "/api/items/" + id;

        const payload = {name, description, startingPrice, highestBid, id, available, userId};

        let response;

        try {
            response = await fetch(url, {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }

        return response.status === 204;
    };


    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        if (this.state.error !== null){
            return (
                <div>
                    <p>Cannot edit Item. {this.state.error}</p>
                </div>
            );
        }

        if (this.state.item === null){
            return (
                <p>Loading...</p>
            );
        }


        return (
            <div>
                {loggedIn ? (
                    <div>
                        <h3>Edit Item</h3>
                        <AuctionItemBid
                            name={this.state.item.name}
                            description={this.state.item.description}
                            startingPrice={this.state.item.startingPrice}
                            highestBid={this.state.item.highestBid}
                            userId={this.state.item.userId}
                            available={this.state.item.available}
                            itemId={this.itemId}
                            ok={"Update"}
                            okCallback={this.onOk}
                        />
                    </div>
                ) : (
                    <div className="menuWrapper">
                        <h2>Failed to execute </h2>
                        <p>You need to log in or register</p>
                    </div>
                )}


            </div>
        );
    }

}


export default withRouter(Bid);