import React, {Component} from 'react';
import Login from './Login';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import * as API from '../api/API';
class Test extends Component
{
    constructor(props) {
        super(props);
        this.checkdetails=this.checkdetails.bind(this);
        this.state = {
            isDetails:true,
            work:'',
            education:'',
            contact:'',
            hobbies:'',
            overview:'',
            total:''
        };
    }
    componentDidMount(){
        axios.create({withCredentials:true}).get('http://localhost:3001/showprofile').then(
            (response)=> {
                console.log("---------GOT RESasdasdPONSE---------");
                this.setState({
                    total:response.data,
                    work:response.data[0].work,
                    education:response.data[0].education,
                    contact:response.data[0].contact,
                    hobbies:response.data[0].hobbies,
                    overview:response.data[0].overview
                });
                console.log(this.state.work);
            }).catch((error)=> {
            console.log("got errr while posting data", error);
        });
    };

    checkdetails=() => {
        //console.log(this.state.work);
        this.setState({
            isDetails:false
        });

        var details={};
        details.work=this.state.work;
        details.education=this.state.education;
        details.contact=this.state.contact;
        details.hobies=this.state.hobbies;
        details.overview=this.state.overview;

        API.profile(details)
            .then((status) => {
                if (status == 200) {
                   alert("asdasd");
                }
            });
    };
    render() {
        return(
            <div >
                 <div>
                        {/*<a className={'ADD'} href='/Success'>HOME</a>*/}
                        <div>
                            <div className="col-md-3" >
                            <h5>USER DETAILS</h5>
                            <input
                                type="text"
                                label="WORK"
                                placeholder="Work"
                                onChange={(event) => {
                                    this.setState({
                                        work: event.target.value
                                    });
                                }}
                            />
                            <br/><br/>
                            <input
                                type="text"
                                label="Education"
                                placeholder="Education"
                                onChange={(event) => {
                                    this.setState({
                                        education: event.target.value
                                    });
                                }}
                            /><br/><br/>
                            <input
                                type="text"
                                label="Contact"
                                placeholder="Contact"
                                onChange={(event) => {
                                    this.setState({
                                        contact: event.target.value
                                    });
                                }}
                            /><br/><br/>
                            <input
                                type="text"
                                label="Hobbies"
                                placeholder="Hobbies"
                                onChange={(event) => {
                                    this.setState({
                                        hobbies: event.target.value
                                    });
                                }}
                            /><br/><br/>
                            <textarea
                                rows="4" cols="21"
                                type="text"
                                label="About You"
                                placeholder="About You"
                                onChange={(event) => {
                                    this.setState({
                                        overview: event.target.value
                                    });
                                }}
                            >
                    </textarea>
                            <br/><br/>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.checkdetails()}
                            >
                                SAVE
                            </button>
                            </div>
                            <div className="col-md-3">
                                <table className=" table2 table table-bordered">
                                    <tr>
                                        <th>Work</th>
                                        <td>
                                            {this.state.work}
                                        </td></tr>
                                    <tr>
                                        <th>Education</th>
                                        <td>
                                            {this.state.education}
                                        </td></tr>
                                    <tr>
                                        <th>contact</th>
                                        <td>
                                            {this.state.contact}
                                        </td></tr>
                                    <tr>
                                        <th>Hobbies</th>
                                        <td>
                                            {this.state.hobbies}
                                        </td></tr>
                                    <tr>
                                        <th>Overview</th>
                                        <td>
                                            {this.state.overview}
                                        </td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default withRouter(Test);