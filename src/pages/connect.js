import { DivComponent } from "../components/divider";
import { useState } from "react";
import { CircleNotch, WifiSlash } from "phosphor-react";
import { makeRequestWithRetry } from "../components/button";
import Net2, { networkObject } from "../components/networkData";

export const ConnectSuccess = () => {
const [netState,setState]=useState(false);
const voucherCode=localStorage.getItem('code');
const routerIP=localStorage.getItem('routerIP');
const clientMac=localStorage.getItem('clientMac');

    const requestInternet = () => {
        console.log('checking network state');

        if (networkObject.isNetworkError()) {
                setState(false);  
               return; 
            }
            else{
              const result=networkObject.sendPostRequest({code:voucherCode},'/check-expiry');
                result.then(async(result)=>{
                    if(result.status==700){
                        return;
                    }
                    else if(result.status==100){
                 /*      try {
                            const response = await makeRequestWithRetry(
                                `http://${routerIP}:22080/portal/auth`,
                                { clientMac: clientMac, auth: 0 }  //cease client from access
                            );
                            console.log('Response from EAP:', response.data);
                            
                            //redirect client to an ad page
                            if(response.status==200 && response.errorCode==0){
                                console.log(`successfully disconnected client with mac:${result.clientMac}`);
                                return true;
                            }
                            else{
                                console.log('Eap110 dissapointment!!...',JSON.stringify(response));
                                return false;
                            }
        
                        } catch (error) {
                            console.error('Error communicating with router:', error.message);
                            return false;
                        }*/

                    }
                    else{
                        console.error('Error response:',JSON.stringify(result));  //just viewing the result
                    return false;
                    }
                });

            }

            setState(true);
    }


    setInterval(()=>{
        requestInternet();
    },30000);

    return (
        <DivComponent clas={'main-signup-div main-twist-div space-y-5  bg-gradient-to-b from-startColor via-mainColor to-darkColor'}>

            <DivComponent clas={'signup-div special-signup pt-[10%]  pb-[10%] '}>
                <DivComponent clas={'salutations-div p-4 mx-3 common-label mt-[-5%]'}>
                    <DivComponent> <label className="ml-[20%] lg:ml-[40%]">Internet Connection Status</label></DivComponent>
                </DivComponent>

                <DivComponent clas={'hidden'}><Net2/></DivComponent>

                <DivComponent clas={'salutations-div mt-2 text-[14px] p-4 !mx-[20%] common-label'}>
                    <DivComponent clas={'flex space-x-3 lg:ml-[30%]'}>
                        <label className="">Tracking connection:</label>
                       {

                       netState?
                        <CircleNotch size={20.0} className="animate-spin" color="yellow"/>
                        :
                        <WifiSlash size={20.0} color="yellow"/>
                            }
                        </DivComponent>

                        <DivComponent clas={'flex space-x-3 lg:ml-[30%]'}>
                        <label>ip Address:</label>
                        <label id="ip-address-label">0.0.0.0</label>
                        </DivComponent>
                </DivComponent>

            </DivComponent>
        </DivComponent>
    )
}