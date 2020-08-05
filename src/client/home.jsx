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

                    <h2>ExamHeader</h2>

                    <p>Welcome to the home page</p>



                </div>

                {user ? (
                    <div>
                        <p>Click the button to do stuff</p>
                        <p>Logged in!!!!!</p>



                    </div>
                ) : (
                    <div>
                        <p>
                            Log in/sign up to get premium access and ALSO get 1000 free credits
                        </p>

                    </div>
                )}

            </div>
        )
    }

}

export default withRouter(Home);