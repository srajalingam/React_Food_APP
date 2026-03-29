export default function Input({label, id,...inputProps}){
    return(
        <div className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} required {...inputProps}/>
        </div>
    )
}