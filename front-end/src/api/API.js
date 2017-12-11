const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';


const headers = {
    'Accept': 'application/json'
};
export const doLogin = (payload) =>
    fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const starfile = (payload) =>
    fetch(`${api}/file/sfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const createDirectory = (payload) =>
    fetch(`${api}/file/createDirectory`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const profile = (payload) =>
    fetch(`${api}/userprofile/profile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const deletefile = (payload) =>
    fetch(`${api}/file/delete`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const postshare = (payload) =>
    fetch(`${api}/file/sharefile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });




export const getsession = () =>
    fetch(`${api}/getUser`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const getuseractivity = () =>
    fetch(`${api}/activity/getuseractivity`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });


export const getImages = () =>
    fetch(`${api}/file/display`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });





export const doSignup = (payload) =>

    fetch(`${api}/user/add`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res.status);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const uploadFile = (payload) =>
    fetch(`${api}/file/add`, {
        method: 'POST',
        headers: {
            ...headers,

        },
        body: payload,
        credentials:'include',
    }).then(res => {
        //console.log("IN API UPLOAD");
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });



export const logout = () =>
    fetch(`${api}/user/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });
