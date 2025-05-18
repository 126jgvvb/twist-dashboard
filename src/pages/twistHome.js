import { useRef } from "react";
import { useNavigate } from "react-router";

import { DivComponent } from "../components/divider";
import { NavBar } from "../components/NavBar";

import { useEffect, useState } from "react";
import { CoinRow2,  CoinRow3,  MajorExchangesTab2 } from "../components/MajorExchangesTab";
import { Button } from "../components/button";
import { useSelector } from "react-redux";
import { ArrowLeft, ArrowRight, CircleNotch, Copy, SpinnerGap, Trash } from "phosphor-react";

import { networkObject } from "../components/networkData";
import  Net2  from "../components/networkData";

import { LabelSeparator } from "../components/label-separator";
import { InputDiv } from "../components/inputDiv";

import { useDispatch } from "react-redux";
import { deletePackage, addPackage, setNewCode, setPhoneNumber } from "../redux/actions";
import { useLocation } from "react-router";

import ClientsGraphicalData from "../chart/pieChart";
import BarX from "../chart/barGraph";

import { InputWithLabel } from "../components/inputWithLabel";
import { LabelSeparator2 } from "../components/label-separator";
import { InputWithPlaceholder } from "../components/InputWithPlaceholder";

function TwistHome() {
    let [isSending, setSending] = useState(false);
    let [isChangingPassword, setIsChangingPassword] = useState(false);
    let [isChangingCode, setIsChangingcode] = useState(false);
    let [isChangingNumber, setIsChangingNumber] = useState(false);
    let [showCopyIcon, setCopy] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
   
    const storeObject = useSelector(storageObj => storageObj);
    const [runningCodes,setCodes] =useState(storeObject.availableRunningCodes);
    const [graphData,setGraphData] = useState(storeObject.graphData);
    const [admin,setAdmin] = useState(storeObject.admin);
    const [packageList, setList] = useState(storeObject.packagesList);
    const [phone, setPhone] = useState(storeObject.phoneNumber);
    const [routers, setRouters] = useState(storeObject.routersInfo);
   // const [defaultVoucherCode, setCode] = useState(storeObject.defaultVoucherCode);

    const [currentCode,setCode] = useState(storeObject.defaultVoucherCode);
    const [timeFrames,setTimeFrames] = useState(storeObject.clientTimeFrames);
    let [storeState, setStoreState] = useState(false);
    const navigate=useNavigate();
    let color = null;
    let counter = useRef(0);
    let InView = null;
    
   // alert(routers);

    useEffect(() => {
        const user = localStorage.getItem('verified-user');
        const jwtToken = localStorage.getItem('twist-jwt-token');

        const checkAuthorization = () => {
            //token available,then verify if it is still valid
            if (jwtToken !== undefined && user !== null) {
                if (networkObject.isNetworkError()) {
                    return alert('Network error');
                }

                //checking if token is valid
                const result = networkObject.sendPostRequest({ token: jwtToken }, '/admin/jwt-login');
                return result.then((result) => {
                   // alert(result);
                    if (result) {
                        console.log('token validation succeeded');
                        return;
                    }
                    else {
              //         return;   //remove after
                     navigate('/login2');
                    }
                })
            }
            else {
            //    return;//remove after
              navigate('/login2');
            }
      }

        checkAuthorization();


        //setting the id
        networkObject.setAdminID(location.state?.adminID);
        const newData = networkObject.gatherObtainedData();

        //    dispatch(setAdminID(location.state?.adminID));
      //  setRouters(storeObject.routerInfo);
            setPhone(storeObject.phoneNumber);
            setCodes(storeObject.availableRunningCodes);
            setCode(storeObject.defaultVoucherCode);
            setAdmin(storeObject.admin);
            setList(storeObject.packagesList);
            setGraphData(storeObject.graphData);
            setTimeFrames(storeObject.clientTimeFrames);
            setRouters(storeObject.routersInfo);
        
            
    }, [setAdmin, setList, storeObject.admin, storeObject.availableRunningCodes, storeObject.clientTimeFrames, storeObject.graphData, storeObject.packagesList]);


    let expiry = null;


    setTimeout(() => {
        if (packageList.length > 0) {
            setStoreState(true);
            setPhone(storeObject.phoneNumber);
            setCode(storeObject.defaultVoucherCode);
            setAdmin(storeObject.admin);
            setList(storeObject.packagesList);
            setCodes(storeObject.availableRunningCodes);
            setRouters(storeObject.routersInfo);

         //   alert((storeObject.routersInfo));
        }

    }, 1000);
    

    const generateNewToken = (Event) => {
        const evTarget = Event.target.value;
      
        if (evTarget === '----select time frame------') {
            alert('Please select an option');
            return false;
        }

        const value = Event.target.value.split('-')[0];
         expiry = value * 86400; //86,400ms is 24hrs and 3600 is 1 hour]converting hours to seconds
    }

    const NotifyServerAbtNewToken = () => {
        if (expiry === null) {
            alert('Please re-validate your selection');
            return;
        }

        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        setSending(true);
        const generatedValue = networkObject.getNewVoucher(expiry);
        generatedValue.then((result) => {
            if (result) {
                dispatch(setNewCode(result.code));
                setCode(result.code);
                setSending(false);
                expiry = null; //reseting settings
            }
            else {
                alert('Failed to generate code');
                setSending(false);
            }
        });

    }


    const changePassword = () => {
        const newPassword = document.getElementById("new-password").value;
        if (newPassword !== '' &&
            newPassword !== undefined &&
            (/[a-zA-Z]/.test(newPassword)) &&
            (/[*&^%$#@!]/.test(newPassword)) &&
            newPassword.length >= 8
        ) {
            if (networkObject.isNetworkError()) {
                alert('Network Error');
                return;
            }
            setIsChangingPassword(true);
            const result = networkObject.sendPostRequest({ newPassword: newPassword,adminID:admin.adminID }, "/admin/change-password");
            result.then((result) => {
                if (result) alert('Password successfully changed');
                else alert('failed to change password');
                setIsChangingPassword(false);
            })
        }
        else {
            alert('Invalid password input,please also make sure to include special characters  and a minmum length of 8 digits');
            return false;
        }

    }

    const changeMerchantCode = () => {
        const newMerchantCode = document.getElementById("new-merchant-code").value;
        if (newMerchantCode !== '' &&
            newMerchantCode !== undefined &&
            !(/[a-zA-Z]/.test(newMerchantCode)) &&
            !(/[*&^%$#@!]/.test(newMerchantCode)) &&
            newMerchantCode.length ===4
        ) {
            if (networkObject.isNetworkError()) {
                alert('Network Error');
                return;
            }
            setIsChangingcode(true);

            const result = networkObject.sendPostRequest({ newMerchantCode: newMerchantCode, adminID: admin.adminID }, "/admin/set-merchant-code");
            result.then((result) => {
                if (result) alert('merchant code successfully changed');
                else alert('failed to change code');
                setIsChangingcode(false);
            })
        }
        else {
            alert('Invalid merchant code input....');
            return false;
        }

    }

    const changePhoneNumber = () => {
        const newPhoneNumber = document.getElementById("new-phone-number").value;
        if (newPhoneNumber !== '' &&
             newPhoneNumber !== undefined &&
            !(/[a-zA-Z]/.test(newPhoneNumber)) &&
            !(/[*&^%$#@!]/.test(newPhoneNumber)) &&
             newPhoneNumber.length === 10 
        ) {   

            if (networkObject.isNetworkError()) {
                alert('Network Error');
                return;
            }

            setIsChangingNumber(true);
            const result = networkObject.sendPostRequest({ phoneNumber: newPhoneNumber, adminID: admin.adminID }, "/admin/add-phone-number");
            result.then((result) => {
                if (result) {   
                    alert('Phone number successfully changed');
                    return dispatch(setPhoneNumber(newPhoneNumber));
                }
                 else alert('failed to change phone number');
                setIsChangingNumber(false);
            })
        }
        else {
            alert('Invalid phone number input....');
            return false;
        }

    }

    const deleteItem = (itemName) => {
        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        // eslint-disable-next-line no-restricted-globals
        const reConfirm = confirm('Are you sure you want to delete this package?');
        if (!reConfirm) return;

        const result=networkObject.sendPostRequest({ itemName: itemName,adminID:admin.uniqueID }, '/admin/remove-package');
        result.then((result) => {
            if (result) {
                dispatch(deletePackage(itemName));
                return true;
            }
            else {
                console.log('The server failed to delete the item...');
                return false;
            }
        })

    }

    const addNewPackage = () => {
        const packName = document.getElementById('new-pack').value;
        const packAmount = document.getElementById('new-amount').value;

        if (packName === '' ||
            packAmount === undefined ||
            packAmount === '' ||
            packName === undefined ||
            (/[+#$%@!*-]/.test(packName)) ||
            (/[+#$%@!*-]/.test(packAmount)) ||
            (/[a-zA-Z]/.test(packAmount)) 
        ) {
            alert('Check your input...something is wrong');
            return false;
        }


        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

     //   alert(admin.uniqueID);

        const result = networkObject.sendPostRequest({ newPackage: packName, adminID: admin.uniqueID, price: packAmount },'/admin/set-package');
        result.then((result) => {
           
            if (result) {
                alert('Done adding package');
                dispatch(addPackage({ duration: packName, price: packAmount }));
            }
            else {
                console.error('Something went wrong while polling the server');

            }
        })

    }

    const addRouter = () => {
        const routerName = document.getElementById('router-name').value;
        const routerIP = document.getElementById('router-ip').value;
        const holder = document.getElementById('router-digits').value || "+256*********";

        if (routerName === undefined ||
            routerName === '' ||
            routerIP === undefined ||
            routerIP === '' ||
            (/[+#$%@!*-]/.test(routerIP)) ||
            (/[a-zA-Z]/.test(routerIP))
        ) {
            alert('Check your input...something is wrong');
            return false;
        }


        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        //   alert(admin.uniqueID);

        const result = networkObject.sendPostRequest({name:routerName,routerIP:routerIP,holderNumber:holder,connections:0,lastChecked:(new Date().toISOString()) }, '/admin/add-router');
        result.then((result) => {

            if (result) {
                alert('Done adding router');
                dispatch(addPackage({ name: routerName, routerIP: routerIP, holderContact: holder }));
            }
            else {
                console.error('Something went wrong while polling the server');

            }
        })

    }

    const changeGraphInViewToRight = (length,chartsInViewId) => {   
        if(length==1) return;
        let currentIndex = Number(chartsInViewId.split('-')[1]);
    
        //end of array??
        ((currentIndex+1) == length) ? currentIndex = 0 : currentIndex++;
        document.getElementById(`charts-${currentIndex}`).className ='lg:space-x-8 w-[80%] md:flex sm2:space-y-[5%]  ';
        InView = `charts-${currentIndex}`;

        for (let i = 0; i < length; ++i){
            if (i != currentIndex) {
                document.getElementById(`charts-${i}`).className = ' hidden';
            }
        }

    }

    const changeGraphInViewToLeft = (length, chartsInViewId) => {
        if(length==1) return;
        let currentIndex = Number(chartsInViewId.split('-')[1]);

        //end of array??
        ((currentIndex - 1) == -1) ? currentIndex = length-1 : currentIndex--;
        document.getElementById(`charts-${currentIndex}`).className = 'lg:space-x-8 w-[80%] flex ';
        InView = `charts-${currentIndex}`;

        for (let i = 0; i < length; ++i) {
            if (i != currentIndex) {
                document.getElementById(`charts-${i}`).className = ' hidden';
            }
        }

    }

 

    return (
        <div className="App">
            <DivComponent clas={'top-level-div bg-startColor'}>
                <DivComponent clas={'main-inner-div text-[14px] sm2:text-[15px] '}>
                    <NavBar clas={'p-3 fixed mt-[-18%] sm:mt-[-16%] sm2:mt-[-11%] sm3:mt-[-9%] md:mt-[-7%] md2:mt-[-5%] '}>
                        <DivComponent clas={'flex font-bold space-x-[40%] mt-[3%]  sm2:mt-[8%] md:text-[50px] lg:text-[20px] lg:ml-[2%] md:mt-[3%] sm2:text-[30px] lg:mt-[1%]  sm2:ml-[25%] md2:mt-[2%] text-white '}>
                            <label className="whitespace-nowrap">TWIST HUB</label>
                            <Net2/>
                            <DivComponent clas={'flex sm2:hidden space-x-4 !ml-[50%] side-nav-icons'}>
                            </DivComponent>
                        </DivComponent>
                    </NavBar>

                    <DivComponent clas={'main-window2 sm2:w-[500px] sm2:mx-[5%] sm2:pt-[20%] lg:pt-2 md:w-full  pb-2 mt-10 pt-4 space-y-8  bg-gradient-to-b from-startColor via-mainColor to-darkColor'}>

                        <label className='text-lg text-white font-semibold  text-white-20 mb-4'>Package choice for Today(Note:This data resets everyday)</label>                        

                        <DivComponent clas={'!mb-[10%] sm2:!mb-[30%] lg:!mb-[10%]'}>
                        <div className={'graph-area min-h-[200px] min-w-[300px] !space-y-2 lg:flex lg:space-x-2 w-full text-white  relative font-semibold '}>
                            {

                                storeState === true ?? routers.length > 0 ? routers.map(router => {
                                    let data = [];
                                    counter.current++;
                                    if (counter.current >= routers.length) counter.current = 0;

                                
                                    for (const code of runningCodes) {
                                        if (code.routerIP === router.routerIP) {
                                            data.push(code);
                                        }
                                    }

                                    //remove this line after tests
                               //     data = runningCodes;

                                    if (counter.current == 1) InView = `charts-${counter.current}`;

                                    return (
                                      
                                        <div id={`charts-${counter.current}`} className={` lg:space-x-8 w-[80%] ${counter.current == 1 ? 'md:flex' : ''} lg:flex space-y-3 sm:space-y-7 sm2:space-y-[5%]`}>
                                            <DivComponent clas={' bg-darkColor hover:scale-105 shadow-lg h-[55vh] sm2:h-[40vh] sm2:py-4 sm3:py-6 rounded-2xl p-6 w-full agent-profit-loss-graph ml-[18%] sm2:!ml-[5%] sm3:!ml-[10%] !pt-3 lg:mt-[5%] md:!w-full !w-[90%] lg:!w-[40%]  '}>
                                                <ClientsGraphicalData tokens={data} />
                                            </DivComponent>
                                            <DivComponent clas={'bg-darkColor  shadow-lg sm:ml-[20%] hover:scale-105 h-[55vh] sm2:h-[40vh]  rounded-2xl p-6  w-full agent-profit-loss-graph sm2:!ml-[5%] sm3:!ml-[10%] ml-[2%] !pt-3 !w-[90%] lg:mt-[5%] lg:!w-[40%]  '}>
                                                <BarX tokens={data} />
                                            </DivComponent>

                                            <DivComponent clas={'absolute sm:ml-[35%] sm:mt-[-20%] lg:!ml-[30%] lg:!mt-[24%] md2:!mt-[50%] sm2:ml-[30%] sm3:mt-[5%] md:!mt-[60%] sm2:w-[30%] rounded-xl bg-blue-500 p-3 text-white'}><label>{ router.name}</label></DivComponent>
                                        </div>
                                          
                                    )

                  

                                }) : <DivComponent clas={'ml-[50%]'}><CircleNotch size={20.0} className="animate-spin common-label"/></DivComponent>
                            }
                            </div>

                            <DivComponent clas={'navigation-arrow rounded-xl p-3 absolute lg:!ml-[87%] lg:!mt-[-12%] sm:ml-[80%] sm2:ml-[80%] sm2:!mt-[4%]'}>
                                <ArrowRight size={20.0} onClick={() => { changeGraphInViewToRight(routers.length, InView) }} color="white" className="" />
                            </DivComponent>


                            <DivComponent clas={'navigation-arrow absolute rounded-xl p-3 lg:!ml-[4%] lg:!mt-[-12%] sm2:!mt-[4%]'}>
                                <ArrowLeft onClick={() => { changeGraphInViewToLeft(routers.length, InView) }} size={20.0} color="white" className="" />
                            </DivComponent>
                            </DivComponent>


                            <DivComponent clas={'text-white text-lg sm2:px-[10%] sm:!mt-[30%] lg:!mt-[-1%] font-semibold'}><label>Please note that these tokens are deleted in memory once their lifetime expires.</label></DivComponent>

                        <DivComponent clas={'fixed token-display left-0 bg-blue-500 !mt-[-30%] text-white p-2'}><label>Total clients:{runningCodes.length}</label></DivComponent>
                        <DivComponent clas={'fixed token-display left-0 bg-blue-500 !mt-[-35%] text-white p-2'}><label>Routers:{routers.length}</label></DivComponent>

                        <MajorExchangesTab2 adminID={admin.uniqueID} titleArray={['Token','Phone Number','Client Status','Payment','Remaining Time']} />
                        <DivComponent clas={'coin-list-div overflow-x-hidden bg-darkColor text-[12px] p-3 sm2:px-0 sm2:ml-[-5%] lg:w-[76%] lg:px-0 lg:ml-[12%]  !max-h-[200px] space-y-4 !mt-[7px] mx-3'}>
                            {
                                
                                storeState===true ?( runningCodes.length>0 ?runningCodes.map(code => {
                                    // eslint-disable-next-line default-case
                                    switch (code.payment) {
                                        case 'ugx.1000': color = 'red'; break
                                        case 'ugx.2500': color = '#22c55e'; break
                                        case 'ugx.5000': color = '#facc15'; break
                                        case 'ugx.9000': color = '#f97316'; break
                                        case 'ugx.18000': color = '#f45218'; break
                                    }
                                  //  alert(code.expiry);
                                   
                                  if(code.payment==undefined){code.phoneNumber='0741882818'; code.payment='any'}

                                    return (
                                        <CoinRow2 coin={code.code} clientID={code.clientID} coinColor={color}  statusX={code.status} ip={code.ipAddress} paymentA={code.payment} remainingTime={(code.expiry)+' Hrs'} phoneNumber={code.phoneNumber} />
                                    )
                                }) :
                                    <DivComponent clas={'text-[12px] text-white'}><label>Empty List</label></DivComponent>) :
                                    <SpinnerGap color="yellow" className="ml-[50%] animate-spin" size={20.0} />
                       }
                        </DivComponent>



                        <DivComponent clas={'text-white text-lg lg:ml-[-30%] font-semibold'}><label>Available packages.</label></DivComponent>                        

                        <DivComponent clas={'lg:flex ml-[25%] sm:space-x-0   lg:ml-[10%] space-x-3 lg:space-x-[20%]'}>
                            <DivComponent clas={'coin-list-div sm2:ml-[-30%] sm:ml-[-20%] sm3:ml-[-20%] bg-darkColor lg:px-6 lg:ml-[-4%] lg:w-[40%] py-3 text-[12px] w-[50%] sm:w-[100%] sm2:w-full lg:!max-h-[30%] space-y-2 !mt-[7px] lg:!mt-[-2%]'}>
                            {
                                storeState === true ? (packageList.length>0 ? packageList.map(code => {
                                    return (
                                        <DivComponent clas={'flex lg:block mx-[7%]'}>
                                            <LabelSeparator leftMessage={code.duration} clas={'coin-div'} rightMessage={code.price} />
                                            <Trash onClick={() => { deleteItem(code.duration) }} color="white" className="absolute  p-[2px] sm:ml-[60%] rounded-lg mt-[-1.5%] lg:!mt-[-1%] sm2:ml-[70%] bg-red-500  sm3:ml-[50%] md:!ml-[60%] md:!mt-[-3%] sm2:mt-[-5%] lg:!ml-[12%] lg:!mt-[-1.3%] ml-[28%]" size={20.0}/>
                                        </DivComponent>
                                    )
                                }): <DivComponent  clas={'text-[14px] mt-[20%] text-white'}><label>Empty List</label></DivComponent> ):
                                    <SpinnerGap color="yellow" className="ml-[50%] animate-spin" size={20.0} />
                            }
                        </DivComponent>

                            <DivComponent clas={'space-y-2 sm:!mr-[30%] sm:!w-[100%] new-package-div sm:mt-[5%] sm:!ml-[-10%] p-4 sm2:mt-[10%] sm2:!ml-[-25%] lg:w-[50%] lg:!ml-[5%] lg:mt-[-2%] sm3:!ml-[-15%] sm2:w-[90%]'}>
                                <InputWithLabel clas={''} text={'New Package Name:'} id={'new-pack'}/>
                                <InputWithLabel text={'New Amount Rating:'} id={'new-amount'} />
                                <Button attrs={{ text: isSending ? 'Saving...' : 'Done', clas: 'p-2 !ml-[4%] generate-key-btn bg-blue-500 text-white rounded', onclick: addNewPackage }} />
                            </DivComponent>
                        </DivComponent>

                        <DivComponent clas={'text-white text-lg font-semibold'}><label>Routers status</label></DivComponent>                        
                        <MajorExchangesTab2 adminID5={admin.uniqueID} titleArray={['Name', 'ip', 'holder', 'status', 'connections','last updated']} />
                        {
                                //        alert(JSON.stringify(storeObject.routersInfo))
                                    }
                        <DivComponent clas={'coin-list-div bg-darkColor sm2:ml-[-1%]  text-[12px] p-3 !max-h-[200px] space-y-4 !mt-[7px] mx-3 md:mx-[5%] md:ml-[1%]'}>
                            {

                                storeState === true ? (routers.length > 0 ? routers.map(router => {

                                    if(router.holderContact==undefined){
                                        router.holderContact='0741882818';
                                        router.lastUpdated='ignored';
                                    }

                                    return (
                                        <CoinRow3 adminID={admin.uniqueId} ip={router.routerIP} name={router.name} holderNumber={router.holderContact} status={router.isActive} connections={router.connections+' devices'} time={router.lastUpdated}/>
                                    )
                                }) :
                                    <DivComponent clas={'text-[12px] text-white'}><label>Empty List</label></DivComponent>) :
                                    <SpinnerGap color="yellow" className="ml-[50%] animate-spin" size={20.0} />
                            }
                        </DivComponent>


                        <DivComponent clas={'text-white text-lg font-semibold'}><label>Add a new Router</label></DivComponent>
                        <DivComponent clas={'space-y-2 sm:!w-[90%] sm:ml-[5%] new-package-div hover:scale-105 new-router-div mx-[20%] p-4'}>
                           <DivComponent clas={'flex '}>
                            <InputWithLabel clas={'w-[30%]'} text={'Router Name:'} id={'router-name'} />
                            <InputWithLabel clas={'w-[30%]'} text={'Router Ip:'} id={'router-ip'} />
                            <InputWithLabel clas={'w-[30%]'} text={'holder digits(optional):'} id={'router-digits'} />
                            </DivComponent>
                                <Button attrs={{ text: isSending ? 'Saving...' : 'Submit', clas: 'p-2 !ml-[4%] generate-key-btn bg-blue-500 text-white rounded', onclick: addRouter }} />
                        </DivComponent>
                        

                        <DivComponent clas={' main-label'}><label className="main-label text-lg">Generate another login token</label></DivComponent>
                        <DivComponent clas={'timeframe-div sm:ml-[3%] flex ml-[20%] sm3:ml-[33%] lg:!ml-[43%] md:ml-[37%] md2:ml-[40%] text-white space-x-2'}>
                            <label>Select Timeframe:</label>
                            <select id="select-element" onChange={(Event) => { generateNewToken(Event) }} className="timeframe-select border focus:outline-none focus:bg-blue-500 bg-blue-500 rounded">
                                <option id="default-time-option" selected>----select time frame------</option>

                                {
                                    storeState===true ?
                                        timeFrames.map((frame,index) => {
                                            return (
                                                <option id={`time-option-${index}`} className="time-option">{frame}</option>
                                            )
                                        })
                                        :
                                       <option><SpinnerGap color="yellow" className="ml-[50%] mt-[20%] animate-spin" size={20.0}/>
                                        </option> 
                                }
                            </select>
                      </DivComponent>
                        
                        <Button attrs={{ text: isSending ? 'Generating...' :'Generate Token', clas: 'p-2 !ml-[4%] generate-key-btn bg-blue-500 text-white rounded',onclick:NotifyServerAbtNewToken }} />

                        <DivComponent clas={'text-white text-[14px]  font-semibold main-label text-lg lg:!mt-[1%]'}><label>Your Token code is:</label></DivComponent>

                            <DivComponent clas={'user-link mx-3 sm:px-[35%] md:mx-[10%]  sm2:px-[40%] !mb-6 text-[14px] sm2:mx-[10%]  flex px-2 py-1 space-x-[200px] sm:space-x-4  !mt-[2px] lg:mt-[5%]' }>
                            <label id='token-code' className="current-token  font-bold text-[18px]">{currentCode}</label>
                            {showCopyIcon ? <Copy size={20.5} onClick={async () => {
                                await navigator.clipboard.writeText(document.getElementById('token-code').innerText);
                                setCopy(false);
                            }}
                                className="md:absolute md:!ml-[10%]" />
                                : <label className='md:absolute md:!ml-[10%]'>Copied!</label>  
                        }
                        </DivComponent>
                        
                        <DivComponent clas={'footer relative shadow-lg md2:ml-[-2%] bg-gradient-to-r z-0 from-yellow-400 animate-pulse via-yellow-300 to-amber-500 transition duration-300 hover:scale-105 hover:animate-none  py-1 space-y-4 px-[1%] m-[5%] mt-[1%] mb-[10%]'}>
                            <DivComponent clas={'rounded-xl relative bg-startColor p-4 sm2:px-2 px-[20%] z-10  w-full'}>
                            <DivComponent clas='inner-footer-div  lg:flex ml-[10%] lg:!ml-[30%] sm2:!ml-[-30%] space-x-3' >
                                    <LabelSeparator2 labelText={'Admin Name:'} valueText={admin.username} />
                                
                                    <LabelSeparator2 labelText={'Admin ID:'} valueText={admin.uniqueID} />
                                    <LabelSeparator2 labelText={'Email:'} valueText={admin.email} />                                    
                                    <LabelSeparator2 labelText={'Phone Number:'} valueText={admin.phoneNumber} />                                    
                            </DivComponent>

                                <DivComponent clas={'forgot-password-div space-y-3 md2:ml-[30%] lg:ml-[-10%]  md:ml-[10%] '}>
                                <DivComponent><label>Change Password:</label></DivComponent>
                                    <DivComponent clas={'flex lg:ml-[40%] space-x-3'}>
                                        <InputWithPlaceholder
                                            text={'New Password:'}
                                            id={'new-password'}
                                            placeholder={'new password'}
                                            clas={'text-black border focus:outline-none border-blue-500 pl-2 lg:px-4 py-0 admin-inputs forgot-password-input'}
                                        />

                                  <Button attrs={{ text: `${isChangingPassword ? 'Please wait...' : 'Done'} `, clas: 'px-2 sm:p-1 !ml-[4%] generate-key-btn bg-blue-500 text-white rounded', onclick: changePassword }} />
                                </DivComponent>
                            </DivComponent>

                                <DivComponent clas={'forgot-password-div md2:ml-[30%]  md:ml-[10%]  merchant-code-div lg:ml-[-5%] space-y-3'}>
                                <DivComponent><label>Change Merchant code:</label></DivComponent>
                                    <DivComponent clas={'flex lg:ml-[20%] lg:ml-[35%]  space-x-3'}>
                                        <InputWithPlaceholder
                                            text={'New Merchant code:'}
                                            id={'new-merchant-code'}
                                            placeholder={'merchant-code'}
                                            clas={'text-black border focus:outline-none border-blue-500 lg:px-4 pl-2  admin-inputs forgot-password-input'}
                                        />

                                   <Button attrs={{ text: `${isChangingCode ? 'Please wait...' : 'Done'} `, clas: 'px-2 sm:p-1 !ml-[4%] generate-key-btn bg-blue-500 text-white rounded', onclick: changeMerchantCode }} />
                                </DivComponent>
                            </DivComponent>

                                <DivComponent clas={'forgot-password-div md:ml-[10%] md2:ml-[30%]  merchant-code-div lg:ml-[-5%] space-y-3'}>
                                <DivComponent><label>Change Phone Number:</label></DivComponent>
                                    <DivComponent clas={'flex lg:ml-[20%] lg:ml-[35%]  space-x-3'}>
                                        <InputWithPlaceholder
                                            text={'New Phone Number:'}
                                            id={'new-phone-number'}
                                            placeholder={'phone-number'}
                                            clas={'text-black border focus:outline-none border-blue-500 lg:px-4 pl-2 admin-inputs forgot-password-input'}
                                        />

                                  <Button attrs={{ text: `${isChangingNumber ? 'Please wait...' : 'Done'} `, clas: 'px-2 sm:p-1 !ml-[4%] generate-key-btn bg-blue-500 text-white rounded', onclick: changePhoneNumber }} />
                                </DivComponent>
                            </DivComponent>

                            <DivComponent clas={'absolute network-div !mt-[-88%] ml-[-20%] '}></DivComponent>
                        </DivComponent>
                        </DivComponent>
                    </DivComponent>
                    </DivComponent>

            
                </DivComponent>
     
        </div>
    )
}

export default TwistHome;