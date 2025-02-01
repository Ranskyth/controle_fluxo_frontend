'use client'

import { createContext, ReactNode, useEffect, useState } from "react";

interface IContextAPI{
    PageState:boolean
    SetPageState: (state:boolean) => void
}

export const ContextPageState = createContext({} as IContextAPI);

export const ContextPageStateProvider = ({ children }: { children: ReactNode }) => {
    const [PageState, SetPageState] = useState(false)

    useEffect(()=>{
        SetPageState(false)
    }, [PageState])

        

    return <ContextPageState.Provider value={{PageState, SetPageState}}>{children}</ContextPageState.Provider>;
};
