import { DivComponent } from "./divider"
import { InputDiv } from "./inputDiv"




export const InputWithLabel = ({clas, text, id }) => {
    
    return (
        <DivComponent clas={clas}>
            <InputDiv text={text} ID={id} />
        </DivComponent>
    )
}