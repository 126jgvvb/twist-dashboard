import { DivComponent } from "./components/divider"
import { InputDiv } from "./components/inputDiv"
import { ButtonX3 } from "./components/button"
import { useSelector } from "react-redux";
import { networkObject } from "./components/networkData";
import { useState } from "react";
import { CircleNotch } from "phosphor-react";

export const Login = () => {
    const storageObj = useSelector(store => store);
    const adminEmail = storageObj.admin.email;
    const adminID = storageObj.admin.adminID;
    const [statusText,setStatusText] = useState('forgot password?');
    const [loader, setLoading] = useState(false);

    const forgotPassword = () => {
       // alert(adminID.admin.adminID);
        if (networkObject.isNetworkError()) {
            alert('Network Error');
            return;
        }

        const adminEmail = prompt('Please enter your registered email');
        if (!(/[@]/.test(adminEmail))) {
            alert('Invalid email input');
            return false;
        }


        setLoading(true);
        const result = networkObject.sendPostRequest({email:adminEmail}, '/admin/forgot-password');
        result.then((result) => {
            if (result) {
                setLoading(false);
                alert('Please check your email for the new password');
                setStatusText('Please check your email for the new password');
                return true;
            }
            else {
                alert('Something went wrong while sending request....');
                setLoading(false);
            }
        });


    }

    return (
        <DivComponent clas={'main-signup-div space-y-5 bg-gradient-to-b from-startColor via-mainColor to-darkColor'}>

            <DivComponent clas={'signup-div lg:px-[30%] space-x-4 pt-[9%] pb-[10%]'}>
                <DivComponent clas={'salutations-div p-4 mx-3 common-label'}>
                    <DivComponent><label className="font-bold">Hello</label></DivComponent>
                    <DivComponent> <label>welcome back to TWIST HUB</label></DivComponent>
                </DivComponent>

                <DivComponent clas={'user-input-div mt-2 p-3 lg:!px-[30%] !mx-2'}>
                    <InputDiv text={'Username'} ID={'username'} />
                    <InputDiv text={'Password'}  ID={'password'}/>
                </DivComponent>

                <ButtonX3 setTxt={'ml-[30%]'} text={'Log In'} targetID={'username'} targetID2={'password'} clas={'mt-2 !ml-[18%] w-[60%] signup-button-div'} />

                <DivComponent clas={'last-agreement-div text-blue !ml-[30%] py-2 flex'}>
                    { 
                        loader !== true ?
                            <label onClick={()=>forgotPassword()} className="text-blue fogot-password-text">{statusText}</label>
                        :
                        <CircleNotch className="w-[5%] h-[5%] ml-[20%] animate-spin" color="yellow"/>
                    }
               </DivComponent>

                <DivComponent clas={'last-agreement-div text-white flex'}>
                    <label>Terms of use and agreement policy</label>
                </DivComponent>
            </DivComponent>
        </DivComponent>
    )
}