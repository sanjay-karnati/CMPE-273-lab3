import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import swal from 'sweetalert';


class Directory extends Component{

    constructor(props) {
        super(props);
        //this.checkdetails=this.checkdetails.bind(this);
        this.state = {
            out:[],
            dname:''
        };
    }

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
        alert("inside delete");
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
    }

    componentWillMount()
    {
        this.setState({dname:this.props.dname});
        console.log(this.props.images);
        console.log(this.state.dname);
    }

    render(){
        return(
<div>
    <div className={"container-fluid"}>
        <img
            src="https://cfl.dropboxstatic.com/static/images/logo_catalog/logotype_2016-vfliXTM4h.svg"
            className="img-rounded" alt="Cinque Terre" width="150" height="77">
        </img>
    </div>

    <table className="table">
        <tr>
            <th >
                File Name
            </th>
        </tr>
        {this.state.out.map(tile => (
<div>
    {tile.dname == this.props.dname ?
        <tr className={'tdalign'}>
            <td title="this is title" className={'tdalign'}>
                <a href={'http://localhost:3001/kafka-back-end/public/files/' + this.state.dname + '/' + tile.img}
                   download>
                    <img
                        src="https://dl.vecnet.org/assets/default.png"
                        alt="Smiley face" width="42" height="42">
                    </img> {tile.path}
                </a>
            </td>
            <td>
               Star {tile.star}
            </td>
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
        </tr> :
        <span>
        </span>
    }
</div>
        ))}
    </table>



</div>
        )
    }
}

export default withRouter(Directory);