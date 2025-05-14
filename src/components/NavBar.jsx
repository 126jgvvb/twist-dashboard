import React from "react";

export const NavBar=({clas,children})=>{

    return(
        <div className={`${clas} navbar w-full h-[10%]`}>
           {children}
            </div>
    )
}