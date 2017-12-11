import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
//import Login from "./Login";
import Login from "./Login";
import Signin from "./Signin";
import Signup from "./Signup";
import Message from "./Message";
import Success from "./Success";
import swal from 'sweetalert';

class NewerHomePage extends Component {

    constructor(props) {
        super(props);
        this.handler=this.handler.bind(this);
        this.uncheck=this.uncheck.bind(this);

        this.state = {
            issignin: true,
            ishomepage:false,
            isLoggedIn:true,
            email:'',
            isfinemail:true,
            direcctoryname:''
        };
    }



    handleSubmit = (userdata) => {
userdata.bytes=[{0:31,1:55}];
        API.doLogin(userdata)
            .then((status) => {
                if (status == 200) {
                    swal("Successful Login");
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/Success");
                } else if (status == 404) {
                    swal("Login Failed");
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    handleSubmit1 = (userdata) => {
        if(userdata.email.length<1 || userdata.password.length<1 || userdata.firstname.length<1 || userdata.lastname.length<1 )
        {
            swal("FILL ALL THE DETAILS");
        }
        else if( userdata.password.length<5 || userdata.email.length<5)
        {
            swal("PASSWORD / USERNAME LENGTH SHOULD BE OF MINIMUM 6");
        }
        else {
            userdata.name=userdata.firstname;
            API.doSignup(userdata)
                .then((status) => {
                    if (status == 201) {

                        console.log('IN AFTER SIGNUP');
                        this.setState({
                            isLoggedIn: true,
                            email: userdata.email,
                            isfinemail: false
                        });
                        swal("SUCCESSFULLY ACCOUNT CREATED PLEASE LOGIN");
                    } else if (status == 401) {
                        swal("LOGIN FAILED Please try using another username");
                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong username or password. Try again..!!"
                        });
                    }
                });
        }
    };

    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if(status == 200){
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/");
                }
            });
    };

    handler()
    {
        this.setState(
            {
                issignin:false
            }
        )
    }
    uncheck()
    {
        this.setState(
            {
                issignin:true
            }
        )
    }


    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <div className={"container-fluid"}>
                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/logotype_2016-vfliXTM4h.svg"
                                className="img-rounded" alt="Cinque Terre" width="150" height="77">
                            </img>
                            <hr/>
                        </div>
                        <div className="homeimage">
                            <img
                                src="https://cfl.dropboxstatic.com/static/images/empty_states/sign-in-vflchypbO.png"
                                className="img-rounded" alt="Cinque Terre" height="320">
                            </img>
                            <div>
                                {this.state.issignin ?
                                    <Signin check={this.handler} handleSubmit={this.handleSubmit}/> :
                                    <Signup check={this.uncheck} handleSubmit1={this.handleSubmit1}/>}
                            </div>
                        </div>
                    </div>
                )}/>
                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/Success" render={() => (
                    //<Welcome handleLogout={this.handleLogout} username={this.state.username}/>
                    <Success handleLogout={this.handleLogout}/>
                )}/>


            </div>
        );
    }
}

export default withRouter(NewerHomePage);