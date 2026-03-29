import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({children,open,onClose,className=''}) => {
    const dialog=useRef()
    useEffect(()=>{
        console.log("modal component rendered");
        const modalDialog=dialog.current
        if(open){
            modalDialog.showModal();
        }
        return()=>{
            console.log("modal component unmounted");
            modalDialog.close()
        }
    },[open])
  return (
    createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal')
    )
  )
}

export default Modal