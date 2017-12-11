import React, {Component} from 'react'
class Signin extends Component {
    state = {
        username: '',
        password: '',
        valid: true
    };
    componentWillMount(){
        this.setState({
            username: '',
            password: ''
        });
    }
    render()
    {
        return (
            <div>

                <div className="signin">
                    <p className="forsignin">Sign in</p>
                    <br/><span className="notblue">or<span className="space"> </span>
        <a onClick={this.props.check}><span className="forcreate">create an account</span></a></span>
                    <br/><br/><br/>
                    <form>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="username"
                            label="username"
                            onKeyPress={this.clicked}
                            placeholder="username"
                            //onChange={this.handleEmail}
                             onChange={(event) => {
                                 this.setState({
                                     username: event.target.value
                                     //   userdetails.email: event.target.value
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
                           // disabled={!(this.state.email.length>0 && this.state.password.length>0)}
                            onClick={() => this.props.handleSubmit(this.state)}>
                         Sign in
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Signin;