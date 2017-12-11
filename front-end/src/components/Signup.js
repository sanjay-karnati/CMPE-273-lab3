import React, {Component} from 'react';

class Signup extends Component
{

    state = {
        firstname: '',
        lastname: '',
        email:'',
        password:''
    };
    componentWillMount(){
        this.setState({
            firstname: '',
            lastname: '',
            email:'',
            password:''
        });
    }
    render(){
        return(
            <div>
                <div className="signup">
                <p className="forsignin">Create an account</p>
                <br/><span className="notblue">or<span className="space"> </span>
        <a onClick={this.props.check}><span className="forcreate">log in</span></a></span>
                <br/><br/><br/>
<form>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            label="firstname"
                            placeholder="First Name"
                            value={this.state.firstname}
                            onChange={(event) => {
                                this.setState({
                                    firstname: event.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            label="lastname"
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={(event) => {
                                this.setState({
                                    lastname: event.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            label="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) => {
                                this.setState({
                                    email: event.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            label="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(event) => {
                                this.setState({
                                    password: event.target.value
                                });
                            }}
                        />
                    </div>
</form>
                    <div className="signinbutton">
            <button
        className="btn btn-primary"
        type="button"
        onClick={() => this.props.handleSubmit1(this.state)}>
        Sign Up
        </button>
                    </div>
            </div>
            </div>
        );
    }
}

export default Signup;