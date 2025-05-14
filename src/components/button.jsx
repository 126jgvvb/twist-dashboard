import React, { useState } from "react";
import { DivComponent } from "./divider";
import {  networkObject } from "./networkData";
import { SpinnerGap } from "phosphor-react";
import { useNavigate } from "react-router";
import { obj } from "./globalIP";
let globalCounter=null;


export const Button = ({ attrs }) => {
    return(
        <button className={attrs.clas}  id={attrs.id} onClick={attrs.onclick}>
           {attrs.text} </button>
    )
}
    
export const ButtonX = ({ children,setTxt, clas, text ,targetID,onclick }) => {
    let [verified, setVerified] = useState(null);
    let [loading,setLoading]=useState(false);

    const HandleLogin =async (id) => {
        const input = document.getElementById(id).value;
        if (input === '' || input === undefined || (/[+#$%@!*-]/.test(input))) {
            alert('Invalid nput,no special characters are allowed');
            return false;
        }

        
        if (networkObject.isNetworkError()) {
            alert('Network Error');
            setLoading(false);
            return;
        }

        setLoading(true);

        //this 'ip' field is just for testing purposes
        
        //this id is used to remember this client if it disconnects and reconnects again
        const ghostUser = localStorage.getItem('ghost-user');

        let result =  networkObject.sendLogin({voucher:input,ghostUser:ghostUser,ip:'192.168.43.122'});
        result.then(async(resp) => {
             result=resp.data;

            if (result.status === 200) {
                setLoading(false);
                setVerified('verified');
                localStorage.setItem('ghost-user',result.clientID);
                //   navigate('/twist-homepage2');
                alert('routerIP:'+result.routerIP+',clientMac:'+result.clientMac);
                
                return window.location.href='http://192.168.1.3:3000/connect-success';
            }
            else {
                alert('Login  unsucccessful....Please check your token');
                setVerified('Not verified');
                setLoading(false);
                return false;
            }
        })
   
    }


    return (
        <DivComponent clas={`button-x p-2 ${clas}`}>
            {
                loading ?
                    <SpinnerGap color="black" className="ml-[50%] animate-spin" size="20.0" /> :
                    <input type="button" className={`${setTxt} ml-[38%]`} value={`${verified === null ? text:verified}`} onClick={() => {HandleLogin(targetID)}} />

          }
        </DivComponent>
    )
}
   

export const HandlePhoneNumber = ({ children,price, setTxt, clas, text, targetID, onclick }) => {
    let [verified, setVerified] = useState(null);
    let [loading, setLoading] = useState(false);

    const HandleLogin = async (id) => {
        const phoneNumber = document.getElementById(id).value;

        if ((/[a-zA-Z]/.test(phoneNumber) ||
            (/[*&^%$#@!]/.test(phoneNumber)) ||
            phoneNumber.length !== 10
        )) {
            alert('Invalid Phone Number Input');
            return false;
        }


        if (networkObject.isNetworkError()) {
            alert('Network Error');
            setLoading(false);
            return;
        }

        setLoading(true);

        //this 'ip' field is just for testing purposes

        //this id is used to remember this client if it disconnects and reconnects again
        const ghostUser = localStorage.getItem('ghost-user');

        const result = networkObject.sendPhoneNumber({ phoneNumber:phoneNumber,selectedPrice:price, ghostUser: ghostUser, ip: '192.168.43.122' });
        result.then((result) => {
            if (result.status === 200) {
                setLoading(false);
                setVerified('You are now online');
                alert('Payment initiation successfull');
                
               globalCounter=setInterval(() => {
                    getClientDetails();
                }, 5000);
                //   navigate('/twist-homepage2');
            }
            else {
                alert('Login  unsucccessful....');
                setVerified('Not verified');
                setLoading(false);
            }
        })

    }


    return (
        <DivComponent clas={`button-x p-2 ${clas}`}>
            {
                loading ?
                    <SpinnerGap color="black" className="ml-[50%] animate-spin" size="20.0" /> :
                    <input type="button" className={`${setTxt} ml-[38%]`} value={`${verified === null ? text : verified}`} onClick={() => { HandleLogin(targetID) }} />

            }
        </DivComponent>
    )
}


export const ButtonX2 = ({ children, setTxt, clas, text, targetID, targetID2, targetID3, targetID4, onclick }) => {
    let [verified, setVerified] = useState(null);
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const HandleSignup = async (idArray) => {

        for (const id of idArray) {
            const input = document.getElementById(id).value;
            if (input === '' || input === undefined) {
                alert('Invalid nput');
                return false;
            }

        }

        const username = document.getElementById(idArray[0]).value;
        const email = document.getElementById(idArray[1]).value;
        const password = document.getElementById(idArray[2]).value;
        const phoneNumber = document.getElementById(idArray[3]).value;

        if (!(/[@]/.test(email))) {
            alert('Invalid email input');
            return false;
        }

        if ((/[a-zA-Z]/.test(phoneNumber) ||
            (/[*&^%$#@!]/.test(phoneNumber)) ||
            phoneNumber.length !== 10 
    )) {
            alert('Invalid Phone Number Input');
            return false;
        }

        if ((/[0-9]/.test(username))) {
            alert('Invalid username input');
            return false;
        }


        if (!(/[@$%^&@#!]/.test(password))) {
            alert('password too weak, include some special characters');
            return false;
        }

        const newAdminObj = {
            username: username,
            email: email,
            password: password,
            phoneNumber:phoneNumber
        }

        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        setLoading(true);
        const result = networkObject.sendPostRequest(newAdminObj,'/admin/create-admin');
        result.then((result) => {
            if (result) {
                setLoading(false);
                setVerified('Authentication Successful');
                console.log(result.data.data.data);
               // alert(result.data.data.data.data.uniqueID);
         //       navigate('/twist-homepage2');
                navigate('/twist-homepage2', { state: { adminID: result.data.data.data.data.uniqueID }})
                return true;  
            }
            else {
                alert('Something went wrong while sending request....');
                setVerified('Authentication UnSuccessful');
                setLoading(false);
            }
        });

    }


    return (
        <DivComponent clas={`button-x p-2 ${clas}`}>
            {
                loading ?
                    <SpinnerGap color="black" className="ml-[50%] animate-spin" size="20.0" /> :
                    <input type="button" className={`${setTxt} ml-[38%]`} value={`${verified === null ? text : verified}`} onClick={() => { HandleSignup([targetID, targetID2, targetID3, targetID4]) }} />

            }
        </DivComponent>
    )
}


export const ButtonX3 = ({ children, setTxt, clas, text, targetID,targetID2, onclick }) => {
    let [verified, setVerified] = useState(null);
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const HandleLogin = async (idArray) => {

        for (const id of idArray) {
            const input = document.getElementById(id).value;
            if (input === '' || input === undefined) {
                alert('Invalid nput');
                return false;
            }
        }

        const username = document.getElementById(targetID).value;
        const password = document.getElementById(targetID2).value;

        if ((/[%^&*!#$@]/.test(username))) {
            alert('Username has special characters...please re-validate your input');
            return false;
        }
        
        const LoginData = {
            username: username,
            password:password
        }

        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        setLoading(true);
        const result = networkObject.sendPostRequest(LoginData,'/admin/login-admin');
        
        return result.then((result) => {
            if (!result.data) {
                setLoading(false);
                alert('this admin does not to exist!!');
                setVerified('Authentication failed');
            }
            else {
             //   alert('Login succcessful....' +result.data.data.data.data.uniqueID);
                setVerified('verified');  
             //   alert("yy "+result.data.data.data.data.token.accessToken);
                setLoading(false);
                console.log(result.data);
                localStorage.setItem('verified-user', result.data.data.data.data.uniqueID);
                localStorage.setItem('twist-jwt-token', result.data.data.data.data.token.accessToken);              
                navigate('/twist-homepage2', { state: { adminID: result.data.data.data.data.uniqueID } })
            }
            })

    }


    return (
        <DivComponent clas={`button-x p-2 ${clas}`}>
            {
                loading ?
                    <SpinnerGap color="black" className="ml-[50%] animate-spin" size="20.0" /> :
                    <input type="button" className={`${setTxt} ml-[38%]`} value={`${verified === null ? text : verified}`} onClick={() => { HandleLogin([targetID,targetID2]) }} />

            }
        </DivComponent>
    )
}



//--------------getClientDetails------------------------
const getClientDetails=(phoneNumber)=>{
    console.log('submitting status request....');

    const result=networkObject.sendPostRequest({phoneNumber:phoneNumber},'/get-registered-client-details');
    result.then((response)=>{
        if(response){
            console.log('recieved a successfull response...storing data');
            const result=response.data.data;
            localStorage.setItem('ghost-user',response.clientID);
            clearInterval(globalCounter);

            alert('routerIP:'+result.routerIP+',clientMac:'+result.clientMac);
            return window.location.href= `http://${response.routerIP}:22080/portal/auth?clientMac=${response.clientMac}&auth=1`;
        }
        else{
            alert('Payment processing error');
            console.log('Something went wrong');
            return false;
        }
  
    })

    }


