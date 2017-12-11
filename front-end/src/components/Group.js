import React, {Component} from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import axios from 'axios';
import Grouplist from "./Grouplist";

class Group extends Component {

    static propTypes = {
        message: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        //this.checkdetails=this.checkdetails.bind(this);
        this.state = {
            grouplist: [],
        };
    }

    componentDidMount() {
        axios.create({withCredentials: true}).get('http://localhost:3001/grouplist',
            {}).then((response) => {

            console.log("GROUP LIST");
            this.setState({
                grouplist: response.data
            });
            console.log(response.data);
        }).catch((error) => {
            console.log("got errr while posting data", error);
        });
    }

    componentWillUnmount()
    {
        console.log("left groupppppppppp");
    }
    componentWillMount() {

        console.log("inside group");

        axios.create({withCredentials: true}).get('http://localhost:3001/grouplist',
            {}).then((response) => {
            console.log("GROUP LIST");
            this.setState({
                grouplist: response.data
            });
            console.log(response.data);
        }).catch((error) => {
            console.log("got errr while posting data", error);
        });
    }

    ingroup = (name) =>
    {
this.props.igroup(name);
    };

    createGroup=()=>{
        var groupname='';
        swal( "Enter GroupName:", {
            content:"input",
        })
            .then((value) => {
                groupname= `${value}`;
                axios.create({withCredentials:true}).post('http://localhost:8080/group/createGroup',
                    {
                        group: groupname
                    }).then((response) => {
                    alert("groups");

                        axios.create({withCredentials: true}).get('http://localhost:8080/group/grouplist',
                            {}).then((response1) => {
                            //  console.log("GROUP LIST");
                            this.setState({
                                grouplist: response1.data
                            });
                            //console.log(response.data);
                        }).catch((error) => {
                            console.log("got errr while posting data", error);
                        });
                }).catch((error) => {
                    console.log("got errr while posting data", error);
                });
        });
    };

    render() {
        return (
            <div className="container-fluid">
<div className="row">
    <div className="col-md-2">

    </div>
             <div className="col-md-5">
<div >
    <br/><br/><br/><br/>


<Grouplist insidegroup={this.ingroup} groups={this.state.grouplist}/>
</div>
             </div>
                <div className="col-md-2">
                    <div className="fileUpload btn btn-primary">
                        <span>Create a group</span>
                        <input  className="upload"
                              onClick={this.createGroup} />
                    </div>
                </div>

            </div>
            </div>
        );
    }
}

export default Group;