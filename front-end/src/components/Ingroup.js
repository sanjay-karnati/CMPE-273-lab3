import React, {Component} from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';


class Ingroup extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        //this.checkdetails=this.checkdetails.bind(this);
        this.state = {
            groupname: '',
            groupmembers:[]
        };
    }
    componentDidMount(){
        axios.create({withCredentials:true}).get('http://localhost:3001/groupmembers',
            {
                params: {
                    gname: this.state.groupname
                }
            }).then((response) => {
            //  console.log("GROUP LIST");
            this.setState({
                groupmembers: response.data
            });
            console.log(this.state.groupmembers);
        }).catch((error) => {
            console.log("got errr while posting data", error);
        });
    }
    componentWillMount() {
        this.setState({
            groupname:this.props.groupname
        });
    }


    deletemember(name)
    {
        axios.create({withCredentials:true}).post('http://localhost:3001/deletemember',
            {
                name: name,
                gname:this.state.groupname
            }).then((response) => {
            axios.create({withCredentials: true}).get('http://localhost:3001/groupmembers',
                {
                    params: {
                        gname: this.state.groupname
                    }
                }).then((response1) => {
                this.setState({
                    groupmembers: response1.data
                });

            }).catch((error) => {
                console.log("got errr while posting data", error);
            });
        }).catch((error) => {
            console.log("got errr while posting data", error);
        });
    }



addtog(){
    var name='';
    swal( "Enter Username:", {
        content:"input",
    })
        .then((value) => {
            name= `${value}`;
            swal(`Added ${value} to the Group`);
            axios.create({withCredentials:true}).post('http://localhost:3001/addtog',
                {
                    name: name,
                    gname:this.state.groupname
                }).then((response) => {
                   axios.create({withCredentials: true}).get('http://localhost:3001/groupmembers',
                       {
                           params: {
                               gname: this.state.groupname
                           }
                       }).then((response1) => {
                       this.setState({
                           groupmembers: response1.data
                       });

                   }).catch((error) => {
                       console.log("got errr while posting data", error);
                   });
            }).catch((error) => {
                console.log("got errr while posting data", error);
            });
        });
}

    render() {
        return (
            <div>
<div className="col-md-12">
            <div className="form-group">
                <br/><br/><br/><br/>
                <h1 className="gname"> Group Name : {this.state.groupname}</h1>
            <h2>Group Members</h2>

            </div>
</div>

                <table>
                {this.state.groupmembers.map(tile=>
                    (

                        <tr>
                            <td>
                                <div className="form-group">

                                    <img
                                        src="https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png"
                                        alt="Smiley face" width="28" height="28">
                                    </img>
                                    {tile.groupm}
       <span> </span>

                                </div>
                            </td><td>
                                <div>
                                    {/*<img*/}
                                        {/*src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/240px-White_X_in_red_background.svg.png"*/}
                                        {/*alt="Smiley face" width="12" height="12" onClick={() => this.deletemember(tile.groupm)}>*/}
                                    {/*</img>*/}

                                      <button className="btn btn-danger" onClick={() => this.deletemember(tile.groupm)}>Remove</button>
                                </div>
                            </td>
                        </tr>
                    )
                )}

                </table>
                <br/>
                <div className="col-md-6">
                    <button className="btn btn-primary addmg" onClick={() => this.addtog()}>Add member</button>
                    <br/><br/>
                </div>
            </div>
        );
    }
}

export default Ingroup;