import { useContext } from 'react'
import { ModuleContext } from '../contexts/ModuleContextProvider'

export function useModule() {
    const value = useContext(ModuleContext)
    return value;
}