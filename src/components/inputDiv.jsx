import { DivComponent } from "./divider"


export const InputDiv = ({ children,ID, text, inputType }) => {
    
    return (
        <DivComponent clas={'main-input-div common-label text-[14px] space-y-3'}>
            <DivComponent><label className="font-semibold">{text}</label></DivComponent>
            {
                inputType === 'number' ?
                    <input type="number" id={ID} className="input-field text-white px-2 w-[90%] lg:w-[50%]" placeholder="(+256) xxx xxx xxx"  /> :
                    <input type="text" id={ID} className="input-field border px-2 focus:outline-none focus:border-blue-500 w-[90%] text-white" />
            }
        </DivComponent>
    )
}