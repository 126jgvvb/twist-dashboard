import { DivComponent } from "./divider"


export const InputWithPlaceholder = ({ text, placeholder, clas, id }) => {
    
    return (
        <DivComponent>
            <label>{text}</label>
            <input type="text" id={id} placeholder={placeholder} className={clas} />
        </DivComponent>
    )
}