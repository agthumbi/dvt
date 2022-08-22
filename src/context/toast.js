


import React, { useState, createContext } from 'react'
export const ToastContext = createContext();

export const ToastProvider = props => {
    const [handleToastDisplay, setHandleToastDisplay] = useState(false);

    return (
        <ToastContext.Provider value={[handleToastDisplay, setHandleToastDisplay]}>
            {props.children}
        </ToastContext.Provider>

    )
}