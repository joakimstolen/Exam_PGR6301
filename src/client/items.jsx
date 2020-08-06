import React from "react";
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

export class Items extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: null,
            error: null,
            soldText: "Mark as sold",
        }
    }


    componentDidMount() {

        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }

        this.fetchItems();
    }

    async fetchItems(){
        const url = "/api/items";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            this.setState({
                error: "Error when retrieving list of items: " + err,
                items: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                items: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                items: null
            });
        }
    }



    deleteItem = async (id) => {
        const url = "/api/items/" + id;

        let response;

        try {
            response = await fetch(url, {method: "delete"});
        } catch (err) {
            alert("Delete operation failed: " + err);
            return false;
        }

        if (response.status !== 204) {
            alert("Delete operation failed: status code " + response.status);
            return false;
        }

        this.fetchItems();

        return true;
    };


    markAsSold = async (id, name, description, startingPrice, highestBid, available) => {
        const url = "/api/items/" + id;

        if (available){
            available = false
        } else {
            available = true
        }

        const payload = {id, name, description, startingPrice, highestBid, available};

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

        this.fetchItems();
        return response.status === 204;
    };


    render() {

        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;

        let table;

        if (this.state.error){
            table = <p>{this.state.error}</p>
        } else if(!this.state.items || this.state.items.length === 0) {
            table = <p>There is no items registered in the database</p>
        } else {
            table = <div>
                <table className="completeItemsList">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Starting price</th>
                        <th>Highest bid</th>
                        <th>Availability</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.map(m =>
                        <tr key={"key_" + m.id} className="oneItem">
                            <td className="tableData">{m.name}</td>
                            <td className="tableData">{m.description}</td>
                            <td className="tableData">{m.startingPrice}</td>
                            <td className="tableData">{m.highestBid}</td>
                            {m.available ? (
                                <td className="tableData">Not sold</td>
                            ) : (
                                <td className="tableData">Sold</td>
                            )}
                            <td className="tableData">
                                {loggedIn ? (
                                    <div>
                                        {this.props.user.userId !== m.userId && (
                                        <Link to={"/edit?itemId=" + m.id}>
                                            <button className="editBtn">Bid</button>
                                        </Link>
                                        )}


                                        {this.props.user.userId === m.userId && (
                                            <button className="editBtn2" onClick={_ => this.deleteItem(m.id)}>Delete</button>
                                        )}

                                        {this.props.user.userId === m.userId && (
                                            <button className="editBtn" onClick={_ => this.markAsSold(m.id, m.name, m.description, m.startingPrice, m.highestBid, m.available)}>Mark as sold</button>
                                        )}


                                    </div>
                                ) : (
                                    <div>
                                        <p>Log in to access</p>
                                    </div>
                                )}

                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        }




        return (
            <div className="menuWrapper">

                {loggedIn ? (
                    <div>
                        <h2>Item list</h2>
                        <Link to={"/create"}>
                            <button className="createBtn">Add new Item</button>
                        </Link>
                        {table}

                    </div>
                ) : (
                    <div>
                        <h2>Menu list</h2>

                        {table}
                    </div>
                )}


            </div>
        );
    }




}

export default withRouter(Items);