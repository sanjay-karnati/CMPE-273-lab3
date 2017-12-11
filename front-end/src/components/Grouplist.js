import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import axios from 'axios';



class Grouplist extends Component {

    static propTypes = {
        message: PropTypes.string.isRequired
    };


    componentWillReceiveProps(newProps) {
        this.setState({out: newProps.groups});
    }

    constructor(props) {
        super(props);
        //this.checkdetails=this.checkdetails.bind(this);
        this.state = {
            out:[]
        };
    }

    componentWillMount()
    {

        axios.create({withCredentials: true}).get('http://localhost:8080/group/grouplist',
            {
            }).then((response1) => {
            //  console.log("GROUP LIST");
            this.setState({
                out: response1.data
            });
            //console.log(response.data);
        }).catch((error) => {
            console.log("got errr while posting data", error);
        });
    }


    deleteg=(name)=>{
        axios.create({withCredentials:true}).post('http://localhost:8080/group/deletegroup',
            {
                name: name,
            }).then((response) => {
            axios.create({withCredentials: true}).get('http://localhost:8080/group/grouplist',
                {}).then((response) => {
                console.log("GROUP LIST");
                this.setState({
                    out: response.data
                });
                console.log(response.data);
            }).catch((error) => {
                console.log("got errr while posting data", error);
            });

        }).catch((error) => {
            console.log("got errr while posting data", error);
        });
    };


    clickedgroup=(name)=>{
        // alert(name);
        this.props.insidegroup(name);
    };

    render() {
        return (
            <div className="form-group">
                <table>
                    <tr>
                        <th>
                            Group Name
                        </th>
                    </tr>
                    <br/>
                    {this.state.out.map(tile=>
                        (
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <img
                                            src="data:image/png;base64,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"
                                            alt="Smiley face" width="42" height="42">
                                        </img>
                                        <label onClick={() => this.clickedgroup(tile.groupname)}>{tile.groupname}</label>
                                        {"   "}
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/240px-White_X_in_red_background.svg.png"
                                            alt="Smiley face" width="12" height="12" onClick={() => this.deleteg(tile.groupname)}>
                                        </img>

                                    </div>
                                </td>
                            </tr>
                        )
                    )}
                </table>
            </div>
        );
    }
}

export default Grouplist;