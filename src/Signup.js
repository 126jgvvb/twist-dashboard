import { DivComponent } from "./components/divider"
import { InputDiv } from "./components/inputDiv"
import { ButtonX2 } from "./components/button"

export const SignUp = () => {
    
    return (
        <DivComponent clas={'main-signup-div space-y-5 bg-gradient-to-b from-startColor via-mainColor to-darkColor'}>
         

            <DivComponent clas={'signup-div pt-[9%] lg:px-[30%] pb-[10%] space-x-4'}>
                <DivComponent clas={'salutations-div p-4 mx-3 common-label'}>
                    <DivComponent><label className="font-bold">Hello New Admin</label></DivComponent>
                   <DivComponent> <label>welcome to TWIST HUB</label></DivComponent>
                </DivComponent>

                <DivComponent clas={'user-input-div mt-2 p-3 !mx-2'}>
                    <InputDiv text={'Username'} ID={'username'} />
                    <InputDiv text={'Email '} ID={'email'} />
                    <InputDiv text={'Password '} ID={'password'} />
                    <InputDiv text={'Phone Number '} ID={'phoneNumber'} />
                </DivComponent>

                <ButtonX2 setTxt={'ml-[30%]'} text={'Sign Up'}
                    targetID={'username'} targetID2={'email'}
                    targetID3={'password'} targetID4={'phoneNumber'}
                    clas={'mt-2 !ml-[15%] w-[60%] signup-button-div'} />
          
                <DivComponent clas={'last-agreement-div text-white flex'}>
                    <label>Terms of use and agreement policy</label>
                </DivComponent>
            </DivComponent>
        </DivComponent>
    )
}