import React, {Component} from 'react';
import * as API from '../api/API';
import Test from './Test';
import ImageGridList from './ImageGridList';
import swal from 'sweetalert';
import axios from 'axios';
import Directory from './Directory';
import Group from "./Group";
import Ingroup from "./Ingroup";

class Success extends Component {




    handleFileUpload = (event) => {
        const payload = new FormData();
        var fileReader = new FileReader();
        payload.append('mypic',event.target.files[0]);
        payload.append('dname','normal');
        API.uploadFile(payload)
            .then((status) => {
                if (status == 201) {
                    API.getImages()
                        .then((data) => {

                            this.setState({
                                images: data
                            });
                            console.log(this.state.images);
                            //                            console.log('2222222222222222');
                           // console.log(this.state.images);
                        });

  //                  console.log("IN UPLOAD FILE STATUS");
                }
            });
    };

    handleFiletod = (event) => {
        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        payload.append('dname',this.state.dname);
        alert("ASAS");
        API.uploadFile(payload)
            .then((status) => {
                if (status == 201) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });

                        });
                }
            });
    };
    constructor() {
        super();
        this.state = {
            images: [],
            isimage:true,
            isfile:true,
            isgroup:false,
            groupname:'',
            isprofile:true,
            dname:'',
            directories:[],
            dname:'',
            gname:'',
            activity:[],
            isgroupclicked:false
        };
    }
    check2(){
        this.setState({
            isimage:false
        });
    }
    check3=()=>{

        this.setState({
            isimage:false,
            isgroup:false,
            isprofile:false
        });
    };
    groupcheck=()=>{
        this.setState({
            isimage:false,
            isgroup:true,
            isgroupclicked:false
        });
        console.log(this.state.isgroup);
    };



    created=()=>{
        var name='';
        swal( "Enter Directory name here:", {
            content:"input",
        }).then((value)=>
        {
            name= `${value}`;
            //alert(name);
            API.createDirectory(name)
                .then((status) => {
                    if (status == 200) {
                        API.getImages()
                            .then((data) => {
                                this.setState({
                                    images: data
                                });
                            });
                    }
                });
        });
    };

    clickedd=(name)=>
    {
        this.setState({
            isfile:false,
            dname:name
        });
    };

    check4=()=>
    {
        this.setState({
            isfile:true,
            isgroupclicked:false
        });
    };

groupclicked=(name)=>
{

  this.setState(
      {
        gname:name,
        isgroupclicked:true
      })
};


    componentWillMount(){


        API.getuseractivity()
            .then((data) => {
            console.log("inside activity");
            console.log(data);
                this.setState({
                    activity: data
                });
                console.log("inside activity");
            });

        API.getImages()
            .then((data) => {
                //console.log(data);
                this.setState({
                    images: data
                });
            });
    };
    render()
{
    return(
<div>
<div className="container-fluid">

<div className="row">
<div className="LEFT-BOX col-md-2">
<div className="empty">
</div>
<div className="leftform">
<form >
<img
src="data:image/png;base64,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"
className="img-rounded" align="left" alt="Cinque Terre" width="100" height="70" align="center">
</img>
<div className="form-group">
<a href='/Success' onClick={() => this.check4()}>Home</a>
</div>
<div className="form-group">
<label onClick={() => this.check3()}>User Profile</label>
</div>
<div className="form-group">
<label onClick={() => this.groupcheck()}>Groups</label>
</div>
<div className="form-group">
<a onClick={()=> this.props.handleLogout()}>Logout</a>
</div>
</form></div>
</div>
{this.state.isimage ?
    <div className="middle col-md-6">
        {this.state.isfile ?
            <ImageGridList activity={this.state.activity} clickeddirectory={this.clickedd} images={this.state.images}/>
            : <div>
                <Directory  dname={this.state.dname} images={this.state.images}/>
            </div>}
    </div>
    :
    <div>
        {this.state.isgroup ?
            <div>
                {this.state.isgroupclicked ?
                    <Ingroup  groupname={this.state.gname}/>
                    :
                    <Group igroup={this.groupclicked}/>
                }
            </div>:
            <Test />}
    </div>
    }
{/*// !this.state.isimage*/}
<div className="col-md-4">
{this.state.isgroup   ?
    <span>

                                </span>
    :

    <div>

        {this.state.isprofile ?
            <div>
                {this.state.isfile ?
                    <div>
                        <div className="fileUpload btn btn-primary">
                            <span>Upload Files</span>
                            <input type="file" className="upload" name='mypic'
                                   onChange={this.handleFileUpload}/>
                        </div>
                        <br/>
                        <h6 className="directorylink" onClick={this.created}>Create a
                            Directory </h6>

                    </div>
                    :
                    <div>
                        <div>
                            <div className="fileUpload btn btn-primary">
                                <span>Upload to directory</span>
                                <input type="file" className="upload" name='mypic'
                                       onChange={this.handleFiletod}/>
                            </div>
                            <br/>
                        </div>
                    </div>
                }
            </div>
            :
            <span> </span>
        }

    </div>
}


</div>
</div>
</div>
</div>
);
}
}
export default Success;