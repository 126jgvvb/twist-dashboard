import { DivComponent } from "./divider"


export const LabelSeparator = ({clas, leftMessage, rightMessage }) => {
    
    return (
        <DivComponent clas={` font-semibold  space-x-[20%] w-[100%] lg:space-x-[5%] lg:w-[90%] common-label ${clas}`}>
            <label className="">{leftMessage}</label>
            <label className="!ml-[70%] sm:!ml-[20%]">{rightMessage}</label>
        </DivComponent>
    )
}

export const LabelSeparator2 = ({ labelText, valueText }) => {
    
    return (
        <DivComponent>
            <label>{labelText}</label>
            <label className='common-label'>{valueText}</label>
        </DivComponent>
    )
}