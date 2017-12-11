import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {withStyles} from 'material-ui/styles';
import swal from 'sweetalert';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const styles = theme => ({
    root: {

        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    subheader: {
        width: '100%',
    },
});

class ImageGridList extends Component
{
    constructor(props) {
        super(props);
        //this.checkdetails=this.checkdetails.bind(this);
        this.state = {
            out:[],
            tempfile:''
        };
    }
    static propTypes = {
        classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired
    };
    onstarApi=()=>{
        console.log("IN STAR API");
        console.log(this.state.tempfile);
    };

//Changing the star
    onStar=(path,star)=>{
        this.setState({tempfile: path});
        var res={};
        res.path=path;
        res.star=star;
        API.starfile(path)
            .then((status) => {
                if (status == 200) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                out: data
                            });
                        });
                }
            });
    };

    onDelete=(path,permissions)=>{
        //var username=prompt("ENTER THE USERNAME");
        // console.log(path);
        // console.log(permissions);
        var res={};
        res.path=path;
        if(permissions!=='No') {
            API.deletefile(path)
                .then((status) => {

                    if (status == 200) {
        //                console.log("IN DELETE");
                        API.getImages()
                            .then((data) => {
                               //swal("file deleted");
                                this.setState({
                                    out: data
                                });
                            });
                    }
                });
        }
        else
        {
            swal('YOU DONT HAVE PERMISSIONS TO DELETE THIS FILE');
        }
    };

    clicked=(name)=>{
     // alert(name);
      this.props.clickeddirectory(name);
    };

    onClick=(path)=>{
        var username='';
        swal( "Enter Username here:", {
            content:"input",
        })
            .then((value) => {
                username= `${value}`;
                swal(`This file is shared with ${value}`);
                var res={};
                res.path=path;
                //res.isdirectory=isdirectory;
                res.otheruser=username;
             var path1=res.path+'&'+res.otheruser;
                API.postshare(path1)
                    .then((status) => {
                        if (status === 204) {
                            console.log("FILE SHARED");
                            // console.log("IN STAR FILE");
                        }
                    });
            });
        console.log(username);
        console.log(this.state.out);
        console.log("aaaaaaaaaaaaa-----------");
    };

    componentWillReceiveProps(newProps) {
        this.setState({out: newProps.images});
        console.log(this.state.out);
    }
    render(){
        return(
            <div className="container-fluid col-md-12">

                <img
                    src="https://cfl.dropboxstatic.com/static/images/logo_catalog/logotype_2016-vfliXTM4h.svg"
                    className="img-rounded" alt="Cinque Terre" width="150" height="77">
                </img>
                <br/><br/><br/>
                <div>
<h6 className="home">Home</h6>
                    <br/><br/><br/>
                </div>

                <table className="table">
                    <tr>
                        <th >
                            File Name
                        </th>
                        <th>
                            Star
                        </th>
                    </tr>
                    {this.state.out.map(tile => (


                            <tr className={'tdalign'}>

                                <td title="this is title" className={'tdalign'}>
                                    {tile.isdirectory=='yes'?
                                        <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUMyQ6mtwKRDxj1UyllAEPG7lpSPKt222PAhKR4GyWmJJyjKt5"
                                        alt="Smiley face" width="42" height="42"
                                        onClick={() => this.clicked(tile.path)}
                                        >
                                        </img>
                                        :
                                        <div>
                                            {tile.dname == 'normal' ?
                                                <img
                                                    src="https://dl.vecnet.org/assets/default.png"
                                                    alt="Smiley face" width="42" height="42">
                                                </img>
                                                :
                                                  <span>
                                                  </span>
                                            }
                                        </div>
                                    }
                                    {tile.dname =='normal' ?
                                        <span>
                                            {tile.path}
                                        </span> :
                                        <span>
                                            </span>}
                                                 </td>
                                {tile.dname == 'normal'
                                    ?
                                    <td>
                                        <span className="star"> {tile.star}   </span>
                                    </td> :
                                    <span> </span>
                                }
                                {tile.dname=='normal'
                                    ?
                                <td>
                                    <div className="dropdown">
                                        <button className="btn ">....</button>
                                        <div className="dropdown-content">
                                            <a onClick={() => this.onClick(tile.path)}>Share</a>
                                            <a>Share to Group</a>
                                            <a onClick={() => this.onStar(tile.path, tile.star)}>Star/Unstar</a>
                                            <a onClick={() => this.onDelete(tile.path, tile.deletefile)}>Delete</a>

                                        </div>
                                    </div>
                                </td>
                                    :
                                    <span>

                                    </span>
                                    }

                                    </tr>
                    ))}
                </table>
<br/>
                <br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>

                <h3>User Activity</h3>
                <table className="activitytable">
                    <th className="activitytable">Activity</th>
                    <th>Time</th>
                    {this.props.activity.map(tile => (
                        <tr className="activitytable">
                            <td className="activitytable">
                                {tile.description}
                            </td>
                            <td className="activitytable">
                                {tile.currenttime}
                            </td>
                        </tr>
                    ))}
                </table>

            </div>
        )
    }
}
export default ImageGridList;