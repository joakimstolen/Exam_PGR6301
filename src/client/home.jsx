import React from "react";
import {Link, withRouter} from "react-router-dom";


export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMsg: null
        }
    }

    componentDidMount() {
        if(this.props.user) {
            this.props.fetchAndUpdateUserInfo();
        }
    }




    render() {

        const user = this.props.user;

        return(


            <div className="menuWrapper">
                <div>

                    <h2>Website for Oslo Auction and Bidding</h2>

                    <p>Welcome to the home page</p>



                </div>

                {user ? (
                    <div>
                        <p>Click the button to do stuff</p>
                        <p>Logged in!!!!!</p>

                        <div className="btnPart">
                            <Link to={"/items"} className={"btn"}>Show/Bid on auction-items</Link>
                        </div>


                    </div>
                ) : (
                    <div>
                        <p>
                            Log in/sign up to get premium access and the ability to put your items out for auction, and bid on other peoples items
                        </p>

                        <div className="btnPart">
                            <Link to={"/items"} className={"btn"}>Show items on auction</Link>
                        </div>

                    </div>
                )}

            </div>
        )
    }

}

export default withRouter(Home);