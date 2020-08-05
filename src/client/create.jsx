import React from "react";
import MenuItem from "./auctionItem";
import {withRouter} from "react-router-dom";
import {Items} from "./items";


export class Create extends React.Component{


    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }

    onOk = async (name, description, startingPrice, itemId) => {
        const url = "/api/items";

        const payload = {name, description, startingPrice};

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
                        <MenuItem
                            user={this.props.user}
                            name={""}
                            description={""}
                            startingPrice={""}
                            ok={"Create"}
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

export default withRouter(Create);