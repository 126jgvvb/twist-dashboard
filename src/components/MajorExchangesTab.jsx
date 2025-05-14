
import { useState } from "react"
import { DivComponent } from "./divider"
import { networkObject } from "./networkData"
import { useDispatch } from "react-redux"
import { haltClient } from "../redux/actions"
import { Button } from "./button";
import { deleteRouter } from "../redux/actions";
import { Trash } from "phosphor-react"

let globalID = null;

export const CoinRow = ({ coin, latestPrice,coinColor, change }) => {
    

    return (
        <DivComponent clas={'coin-div p-4 flex mx-8 space-x-3'}>
            <DivComponent clas={'coin-pair'}><label className="common-grey"><label className="text-white">{coin}</label>/USDT</label></DivComponent>
            <DivComponent clas={'latest-price'}><label className={'text-'+coinColor==='green'?'text-green-500':'text-red-500'}>{latestPrice}</label></DivComponent>
            <DivComponent clas={'percent-change px-2'}><label className={`text-${coinColor}-500`}>{change}</label></DivComponent>
        </DivComponent>
    )
}




export const MajorExchangesTab2 = ({adminID,titleArray}) => {
    globalID = adminID;

    return (
        <DivComponent clas={'major-exchanges ml-[1%] lg:ml-[4%] text-[12px] space-y-2 sm:!space-y-4'}>

            <DivComponent clas={'coin-category-header flex w-[90%] lg:w-[60%] lg:px-[5%] lg:space-x-[12%] lg:ml-[16%] text-white px-3 sm3:pl-[10%] space-x-3 sm:space-x-8 sm2:space-x-[5%] sm3:space-x-[2%] md:pl-[15%] md2:pl-[20%]'}>

                {
                    titleArray.length > 0 && titleArray.map(item => {
                        return (
                            <DivComponent clas={'mx-2 exchange '}>
                                <label>{item}</label>
                            </DivComponent>
                        )
                    })
        }
            </DivComponent>
        </DivComponent>
    )
}


export const CoinRow2 = ({coin,coinColor,ip,clientID,phoneNumber,remainingTime,paymentA,statusX }) => {
    const dispatch = useDispatch();
    const [isDisconnecting, disconnect] = useState(false);

    const ceaseClient = (itemName,ip) => {
        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        if (itemName === '' || itemName === undefined) {
            alert('Invalid input');
            return;
        }

        disconnect(true);

        // eslint-disable-next-line no-restricted-globals
        const reConfirm = confirm('Are you sure you want to disconnect this client?');
        if (!reConfirm) return;

        const result = networkObject.sendPostRequest({ itemName: clientID,ipAddress:ip, adminID: globalID }, '/admin/halt-client');
        result.then((result) => {
            if (result) {
                dispatch(haltClient(itemName));
                disconnect(false);
                alert('client disconnected successfully');
                return true;
            }
            else {
                alert('The server failed to disconmect the client...');
                console.log('The server failed to disconnect the client...');
                disconnect(false);
                return false;
            }
        })

    }

    const connectClient = (itemName,ip) => {
        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        if (itemName === '' || itemName === undefined) {
            alert('Invalid input');
            return;
        }

        // eslint-disable-next-line no-restricted-globals
        const reConfirm = confirm('Are you sure you want to connect this client?');
        if (!reConfirm) return;

        const result = networkObject.sendPostRequest({ itemName: itemName,ip:ip, adminID: globalID }, '/admin/connect-client');
        result.then((result) => {
            if (result) {
                dispatch(haltClient(itemName));
                return true;
            }
            else {
                alert('The server failed to conmect the client...');
                console.log('The server failed to conmect the client...');
                return false;
            }
        })

    }

    return (
        <DivComponent clas={` coin-div px-7 sm2:ml-[2%]  flex mx-8 lg:ml-[3%] sm2:w-full lg:mx-[10%] lg:w-[90%] space-x-3  lg:px-[3%] lg:pl-[15%] lg:space-x-[7%] lg:ml-[19%] sm:space-x-8 sm2:space-x-[3%] sm3:pl-[7%] md:pl-[20%] md2:pl-[21%] `}>
            <DivComponent clas={'coin-pair'}> <label className="common-yellow"><label className="common-label whitespace-nowrap">{coin}</label></label></DivComponent>
            <DivComponent clas={' latest-price'}><label className={'text-yellow-500 whitespace-nowrap'}>{phoneNumber}</label></DivComponent>
            <DivComponent clas={'percent-change px-2 sm2:h-[10%] sm2:mt-[3%] lg:mt-0'}><label className={`text-yellow-500 px-3 whitespace-nowrap`}>{statusX}</label></DivComponent>
            <DivComponent clas={'percent-change px-2 sm2:h-[10%] sm2:mt-[3%] lg:mt-0'}><label className={`text-yellow-500 px-3 whitespace-nowrap`}>{paymentA}</label></DivComponent>
            <DivComponent clas={'percent-change px-2 sm2:px-0 sm2:h-[10%] sm2:mt-[3%] lg:mt-0'}><label className={`text-yellow-500 px-3 whitespace-nowrap`}>{remainingTime}</label></DivComponent>
            {
                statusX==='access granted'?
                    <DivComponent clas={' '}><Button attrs={{ text: `${isDisconnecting ? 'disconnecting...' : 'disconnect device'}`, clas: 'bg-red-500 text-white rounded-2xl hover:bg-red-600 px-2 sm2:whitespace-nowrap', onclick: () => ceaseClient(phoneNumber,ip) }} /></DivComponent>
                    :
                    <DivComponent clas={' '}><Button attrs={{ text: `${isDisconnecting ? 'connecting...' :'connect device'}`, clas: 'bg-green-500 text-white rounded-2xl hover:bg-green-600 px-2', onclick: () => connectClient(phoneNumber) }} /></DivComponent>
            } 
        </DivComponent>
    )
}



export const CoinRow3 = ({adminID, ip, holderNumber, time, status, name,connections }) => {
    const dispatch = useDispatch();
 
    const deleteRouter = (itemName) => {
        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        // eslint-disable-next-line no-restricted-globals
        const reConfirm = confirm('Are you sure you want to delete this router?');
        if (!reConfirm) return;

        const result = networkObject.sendPostRequest({ routerIP: itemName, adminID: adminID }, `/admin/remove-router?routerIP=${itemName}`);
        result.then((result) => {
            if (result) {
                dispatch(deleteRouter(itemName));
                return true;
            }
            else {
                console.log('The server failed to delete the item...');
                return false;
            }
        })

    }

    return (
        <DivComponent clas={` coin-div px-7 sm2:ml-[2%] sm2:w-full sm2:space-x-[6.5%]  flex mx-8 space-x-2  lg:px-[3%] lg:space-x-[4%] lg:ml-[19%] sm:space-x-8 sm2:space-x-[25%] sm3:pl-[14%] lg:pl-[10%] lg:space-x-[9%] md:pl-[20%] md2:pl-[21%] lg:w-[60%] `}>
            <DivComponent clas={'coin-pair sm2:w-[20px] sm2:ml-[-3%] sm3:ml-[-14%] sm2:overflow-x'}> <label className="common-yellow whitespace-nowrap"><label className="common-label">{name}</label></label></DivComponent>
            <DivComponent clas={' latest-price sm2:w-[30px] lg:w-full sm2:overflow-x'}><label className={'text-yellow-500 lg:pl-5 whitespace-nowrap'}>{ip}</label></DivComponent>
            <DivComponent clas={'percent-change px-2 sm2:w-[20px] lg:w-full sm2:overflow-x'}><label className={`text-yellow-500 px-3 whitespace-nowrap`}>{holderNumber}</label></DivComponent>
            <DivComponent clas={`percent-change px-2 sm2:w-[20px] lg:w-full sm2:overflow-x ${status === true ? 'bg-green-500' :'gr-red-300 whitespace-nowrap'}`}><label className={` text-yellow-500 px-3`}>{status===true?'active':'Inactive'}</label></DivComponent>
            <DivComponent clas={'percent-change px-2 sm2:w-[20px] lg:w-full sm2:overflow-x '}><label className={`text-yellow-500 px-3 whitespace-nowrap`}>{connections}</label></DivComponent>
            <DivComponent clas={'percent-change px-2 sm2:w-[20px] lg:w-full sm2:overflow-x'}><label className={`text-yellow-500 px-3 whitespace-nowrap`}>{time}</label></DivComponent>
            <Trash onClick={() => { deleteRouter(ip) }} color="white" className="absolute mt-0 lg:!ml-[52%] bg-red-500 p-[2px] rounded-lg ml-[28%] sm2:!ml-[85%] sm3:!ml-[57%]" size={20.0} />
        </DivComponent>
    )
}

