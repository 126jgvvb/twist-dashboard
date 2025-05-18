import React,{Component} from "react";
import { useDispatch } from "react-redux";
import { setObject } from "../redux/actions";
import { connect } from "react-redux";
import { obj } from "./globalIP";
import { SpinnerGap } from "phosphor-react";
import { DivComponent } from "./divider";
import EncryptData from "../encryption";

let temp = true;

//------------class implementation of the same thing
class NetworkObject extends Component{
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: false,
            loader:false,
            error: 'Network error',
            errror_occured: false,
            doneFetching:false,
            url: `${obj.serverIP}/temper/get-list`,
            defaultUrl: `${obj.serverIP}`,
            isComponentMounted:false,
            response: null,
            setObject: setObject,
            dispatch:useDispatch,
            adminID: "",
            storageObj : {
                storeReady: false,
                 packagesList: [ ],
                defaultVoucherCode: '2345',
                availableRunningCodes: [ ],
                admin: { },
                clientTimeFrames: [],
                graphData: [],
                merchantCode: '',
                phoneNumber:''
            }
        }
        
        this.newObj={}

        this.hasErrorOccured = this.hasErrorOccured.bind(this);
     //   this.start_data_seeking = this.start_data_seeking(this);
    }

    componentDidMount() {
        //   this.getStore();
        //this.start_server_seeking();

        this.setState({ isComponentMounted: true });
        this.setState({ errror_occured: temp });
        this.setState({ loading: temp ? true : false });
        
    }

    setAdminID = (id) => {
      //  alert("id>>>" + id);
        console.log("id>>>" + id);
        
        if (this.state.isComponentMounted) this.setState({ adminID: id });
        this.state.adminID = id;
    }

    hasErrorOccured=()=>{
        return this.state.errror_occured ? true : false;
    }

    getNewVoucher =async (expiry) => {
        const obj = {expiryTime:expiry };

        this.setState({ loading: true });

        return await fetch(`${this.state.defaultUrl}/session/generate-voucher`,
            {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/json' }
            })
            .then((res)=>res.json())
            .then((result) => {
               // alert(Object.keys(result));
                if (result.code!==undefined) return result;
                else {
                    console.log('Failed to generate code');
                    return false;
                }
            })
            .catch(err => { throw new Error('Error occured:' + err) })
    }

    sendPostRequest = async (data, route) => {
        data = EncryptData(data);

        return await fetch(`${this.state.defaultUrl}${route} `,
            {
                body: JSON.stringify({ data: data }) ,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((result)=>result.json())
            .then((result) => {
                if (result.status !== 200) {
               //     alert('Server or network error');
                    console.log('Request Failure...'+result.message) // throw new Error('Failed to post Request...');
                    return false;
                }

                    console.log('Post request succefully submitted');
                return {data:result}
                    })

    }

    
    sendVoucher = (code) => {
        code = EncryptData(code);
        const ip = '192.168.43.120';  //this is for just testing purposes...its not important

        this.setState({ loading: true });
        this.state.loading = true;

        fetch(`${this.defaultUrl}/client/authenticate-client?code=${code}&ip=${ip}`,
            {
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${code}`,
                },  
            })
            
            .then(resp => {           //fetching the data
            this.setState({ response: resp.status === 200 ? this.setState(resp.json()) : null })
            if (this.state.response === null) {
                this.setState({ error: resp.message });
                this.state.error = resp.message;
                this.state.errror_occured = true;
             //   this.state.laoding = false;

                console.log(resp.message);
            }
        })
            .then(() => {       //storing the data in the store
                if (this.state.errror_occured) return false;

                console.log(JSON.stringify(this.state.response, null, 2));
                return true;
           })
            .catch((err) => {
                this.state.error = err;
                this.setState({ error: err })
            })
    }

    sendLogin = async (objX) => {  //from authPage.js
        if (this.state.isComponentMounted)  this.setState({ loading: true });

        try {
            const resp = await fetch(`${this.state.defaultUrl}/client/authenticate-client?voucherCode=${objX.voucher}&ghostUser=${objX.ghostUser}&ip=${objX.ip}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const resp_1 = await resp.json();
            return resp_1;
        } catch (err) {
            this.setState({ error: err });
            console.log(err);
        }
  
  
  
  
  
    }


    sendReconnectRequest = async (objX) => {  //from authPage.js
        if (this.state.isComponentMounted) this.setState({ loading: true });
        if (objX.client === undefined) return;

        try {
            const resp = await fetch(`${this.state.defaultUrl}/client/reconnect-client?clientID=${objX.clientID}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
            const resp_1 = await resp.json();
            return resp_1;
        } catch (err) {
            this.setState({ error: err });
            console.log(err);
        }





    }

    sendPhoneNumber = async (objX) => {  //from authPage.js
        if (this.state.isComponentMounted) this.setState({ loading: true });

        try {
            const resp = await fetch(`${this.state.defaultUrl}/client/authenticate-client?phoneNumber=${objX.phoneNumber}&selectedPrice=${objX.selectedPrice}&ghostUser=${objX.ghostUser}&ip=${objX.ip}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
            const resp_1 = await resp.json();
            return resp_1;
        } catch (err) {
            this.setState({ error: err });
            console.log(err);
        }
    }

    start_server_seeking = async () => {
  

        try {
            if (this.state.errror_occured) return;

            return await fetch(`http://${obj.serverIP}:4000/admin/ping`)
                .then((result) => {
                     return result.json()
                })
                .then((result) => {
                    if ( result.message === undefined) {
                        //   alert('Network error detected');
                        temp = true;
                        console.log('cannot connect to the server'); 
                        this.state.errror_occured = true;
                        this.setState({ errror_occured: true });
                        return false;
                    }
                    else {
                     
                        temp = false;
                        this.state.loading = true;
                        return true;
                    }
                
                });
        }
        catch (e) {
            temp = true;
            this.state.errror_occured = true;
            console.log('cannot connect to the server'); 
            setInterval(() => { this.start_server_seeking() }, 10000);
     
            console.error(e);
        }
    }
    
   startMonitoring = () => {
            //polling the server after every 15mins in intervals for time updates
            console.log('monitoring next update in the next 15mins started....');

       setInterval(() => {
           this.state.loader=true;
           getAllData();
           
           setTimeout(() => { this.state.loader = false }, 5000);
            }, ((60 * 60000) / 4));
        }


    isNetworkError = () => { return this.state.errror_occured }

    gatherObtainedData = () => {
        return tempObj;
    }

//-----ignoring this method for now
    render() { 
 

        if (this.state.errror_occured) {
            setInterval(() => {
                this.start_server_seeking();
            }, 10000);
        }
        
        return (
            <DivComponent clas='sm2:hidden lg:flex'>
                {this.state.loading === true ? <SpinnerGap color="white" className="animate-spin" size={20.0} /> :
                    <label className=" hidden">{this.state.error}</label>
                }   
            </DivComponent>    
                )
    }


}


const networkObject = new NetworkObject();
networkObject.start_server_seeking();  //checking if server is available


let tempObj ={
    storeReady:false,
    packagesList: [ ],
    defaultVoucherCode: 'tr467d',
    availableRunningCodes: [],
    admin: {},
    clientTimeFrames: ['1-Day','3-Days','7-Days(week)','14-Days(2 weeks)','30-Days(1 month)'],
    graphData: [],
    merchantCode: '',
    routersInfo:[]
}

const getAllData = async () => {

    try{
   const getData = async (route,property) => {
    console.log(`connecting to: http://${obj.serverIP}:4000${route}`);

   return await fetch(
            `http://${obj.serverIP}:4000${route}`)
            .then(resp => resp.json())
            .then((resp) => {
     
                if (resp.data !== undefined) {
                    if (property === 'obj') {
                        const objX = resp.data.data;
                        tempObj.phoneNumber = objX.admin.phoneNumber;
                        tempObj.packagesList = objX.packagesList;
                        tempObj.availableRunningCodes = objX.availableRunningCodes;
                        tempObj.admin = objX.admin;
                        tempObj.routersInfo = objX.routers;
                    } 
                 
                    return true;
                }
                else {
                    if (resp.message !== undefined || resp.data !== undefined) console.log(resp.message);
                    else console.log('Network error...');
                    return false;
                }

            })
            .catch((err) => console.error(err));
        }

      //  alert(networkObject.state.adminID);
        if (networkObject.state.adminID === undefined || networkObject.state.adminID === '' || networkObject.state.errror_occured) return;
      return  getData(`/admin/get-redux-object?adminID=${networkObject.state.adminID}`, 'obj');
    }
    catch (e) {
        console.log(e);
}      
}


const stateToProps = (state) => { return { data: state.response } };

const mapDispatchToPropsX = (dispatch) => {
return    setTimeout(() => {
        if (networkObject.state.adminID === '') return { setObject: (data) => dispatch(setObject(tempObj)) };
  //  networkObject.state.adminID = 'XFMRBEJZCN';
        
    return getAllData().then(() => {
    //   alert((tempObj.routersInfo.length));
        dispatch(setObject(tempObj));
        networkObject.startMonitoring(); 
        return { setObject: (data) => dispatch(setObject(tempObj)) }
    });
    
}, 1);

}

export { networkObject };

export default connect(stateToProps, mapDispatchToPropsX)(NetworkObject);
