
export const DivComponent=({clas,id,children})=>{
if(id!==undefined){
   return(
      <div className={clas} id={id}>
   {children}
</div>
   )
}

return(
<div className={clas}>
   {children}
</div>
)
}














