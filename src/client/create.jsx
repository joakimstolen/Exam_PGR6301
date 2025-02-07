//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/client/create.jsx

import React from "react";
import AuctionItem from "./auctionItem";
import {withRouter} from "react-router-dom";



export class Create extends React.Component{


    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();

        }


    }

    onOk = async (name, description, startingPrice, highestBid, userId, available) => {
        const url = "/api/items";

        const payload = {name, description, startingPrice, highestBid, userId, available};

        let response;



        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }



        return response.status === 201;
    };



    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        return (
            <div>
                {loggedIn ? (
                    <div>
                        <h3>Create a new Auction Item</h3>
                        <AuctionItem
                            user={this.props.user}
                            name={""}
                            description={""}
                            startingPrice={""}
                            highestBid={""}
                            userId={this.props.user.userId}
                            available={""}
                            ok={"Create"}
                            okCallback={this.onOk}
                        />
                    </div>
                ) : (
                    <div className="menuWrapper">
                        <h2 id="loginMsgCreate">Failed to execute </h2>
                        <p>You need to log in or register</p>
                    </div>
                )}

            </div>
        );
    }



}

export default withRouter(Create);