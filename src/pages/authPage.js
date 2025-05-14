import { DivComponent } from "../components/divider"
import { InputDiv } from "../components/inputDiv"
import { ButtonX, HandlePhoneNumber } from "../components/button"
import { LabelSeparator } from "../components/label-separator"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { SpinnerGap } from "phosphor-react"
import { storageObj } from "../redux/reducer"

import Net2, { networkObject } from "../components/networkData";

export const AuthPage = () => {

    const ghostUser = localStorage.getItem('ghost-user');
    const [connectState, setConnect] = useState('reconnect');
    const storeObject = useSelector(storageObj => storageObj);
    const [packages, setList] = useState(storeObject.packagesList);
    const [phoneNumber, setNumber] = useState(storageObj.phoneNumber);
    const [merchantCode, setMerchantCode] = useState(storageObj.merchantCode);
    const [storeState, setStoreState] = useState(false);
    const [priceX, SetPrice] = useState('1000/=');

    const requestInternet = (clientID) => {
        if (clientID === undefined) return;
        if (networkObject.isNetworkError()) {   return; }

         setConnect('Connecting...');

        const result = networkObject.sendReconnectRequest({ clientID: clientID });
        result.then((result) => {
            if (result) {
                setConnect('Connected');
                return window.location.href='http://192.168.1.3:3000/connect-success';
            }
            else {
                alert('Something went wrong, check with admin...');
                console.log('Device currently offline');
                setConnect('reconnect');
                return false;
            }
       })
   
    }


 //   if (ghostUser !== undefined) requestInternet(ghostUser);

    const checkConnect = (ghostUser) => {
        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }
        requestInternet(ghostUser);
    }
     


    
    useEffect(() => {
        setList(storeObject.packagesList);
        setNumber(storageObj.phoneNumber);
        setMerchantCode(storageObj.merchantCode);

        const fetchData = async () => {
            try {
                if (networkObject.isNetworkError()) {
                    console.error('Network error detected');
                    return;
                }
                
                // Wait for initial data load
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                setNumber(storageObj.phoneNumber);
                setMerchantCode(storageObj.merchantCode);
                setList(storeObject.packagesList);
                
                if (storeObject.packagesList && storeObject.packagesList.length > 0) {
                    setStoreState(true);
                } else {
                    console.warn('No packages found in store');
                }
            } catch (error) {
                console.error('Error loading packages:', error);
            }
        };

        fetchData();
    }, [storeObject.packagesList, storageObj.phoneNumber, storageObj.merchantCode]);


    const SetCurrentPrice = (Event) => {
        SetPrice(Event.target.value);
        return true;
    }

    return (
        <DivComponent clas={'main-signup-div main-twist-div space-y-5  bg-gradient-to-b from-startColor via-mainColor to-darkColor'}>

            <DivComponent clas={'signup-div special-signup pt-[10%]  pb-[10%] space-x-4'}>
                <DivComponent clas={'salutations-div p-4 mx-3 common-label mt-[-5%]'}>
                    <DivComponent> <label>Welcome to TWIST HUB</label></DivComponent>
                </DivComponent>

                <DivComponent clas={'hidden'}><Net2/></DivComponent>

                <DivComponent clas={'salutations-div mt-2 !ml-[1%] text-[14px] p-4 !mx-3 common-label'}>
                    <DivComponent><label>This is a list of available packages.Please choose according to  what suits your needs</label></DivComponent>
              
                    <DivComponent clas={'token-subsdcriptions max-h-[50%] lg:mx-[10%] overflow-auto space-y-3'}>
                {
                            storeState===true ? packages.map(packag => {
                                return (
                        <LabelSeparator leftMessage = {packag.duration} clas = { 'space-x-[82%] lg:space-x-[80%] whitespace-nowrap rounded hourly-rating bg-startColor px-6 pr-8'} rightMessage = { packag.price} />
                                )
                            })
                                :
                                <SpinnerGap color="yellow" className="animate-spin ml-[50%]" size={20.0}/>
                 }
                 
                    </DivComponent>
                </DivComponent>
        
                <DivComponent clas={'user-input-div mt-2 lg:!mx-[30%] p-3 !mx-2'}>
                    <InputDiv text={'Enter Token'}  ID={'code-input'}/>
                </DivComponent>

                <ButtonX setTxt={'ml-[30%] sm3:ml-[45%]'} targetID={'code-input'} text={'Log In'} clas={'mt-2 mt-4 lg:!mx-[30%] lg:!w-[30%] lg:!ml-[35%] !ml-[15%] w-[60%] signup-button-div'} />

                <DivComponent clas={'text-white !py-2 !ml-[50%]'}><label>OR</label></DivComponent>
               
                

                <DivComponent clas={'user-input-div mt-4 lg:!mx-[30%] p-3 !mx-2'}>
                    <DivComponent clas={'timeframe-div flex ml-[10%] sm3:ml-[33%] lg:!ml-[23%] md:ml-[37%] md2:ml-[40%] text-white space-x-2'}>
                        <label>Select Package Price:</label>
                        <select id="select-element" onChange={(Event) => {SetCurrentPrice(Event) }} className="timeframe-select border focus:outline-none focus:bg-blue-500 bg-blue-500 rounded">
                            <option id="default-time-option" selected>1000/=</option>
                            <option id="default-time-option" selected>2500/=</option>
                            <option id="default-time-option" selected>5000/=</option>
                            <option id="default-time-option" selected>9000/=</option>
                            <option id="default-time-option" selected>18000/=</option>    </select>
                    </DivComponent>
                    <InputDiv text={'Enter phone number to initiate payment(recommended)'} ID={'phone-input'} />
                </DivComponent>

                <HandlePhoneNumber price={priceX} setTxt={'ml-[30%] sm3:ml-[45%]'} targetID={'phone-input'} text={'Send'} clas={'mt-2 mt-4 lg:!mx-[30%] lg:!w-[30%] lg:!ml-[35%] !ml-[15%] w-[60%] signup-button-div'} />

                <DivComponent clas={'flex text-white space-x-2 space-y-2 mt-2'}> 
                    <label>You Previously connected?</label>
                    <input type="button" value={connectState} onClick={() =>{return ghostUser !== undefined ? checkConnect(ghostUser) : null }} className="connect-button !mt-[-1px] bg-blue-500 px-2" />
                </DivComponent>

                <DivComponent clas={'last-agreement-div mt-4 text-white'}>
                    <DivComponent><label>Contact us on <em lassName="text-green-400">0741882818</em> or <em lassName="text-green-400">{'07791817245' }</em></label></DivComponent>
                </DivComponent>
            </DivComponent>
        </DivComponent>
    )
}