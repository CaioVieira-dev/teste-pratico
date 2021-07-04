import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type ModuleType = {
    id: number,
    name: string,
    classes: {
        name: string,
        date: string
    }[]
};
type ModulesType = ModuleType[] | undefined;

type ModuleContextType = {
    modules: ModulesType;
    isLoading: boolean;
    handleChangeModuleId: (id: number) => void;
    currentModuleId: number;
}

type ModuleContextProviderProps = {
    children: ReactNode;
}

export const ModuleContext = createContext({} as ModuleContextType)

export function ModuleContextProvider(props: ModuleContextProviderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [modules, setModules] = useState<ModulesType>();
    const [currentModuleId, setCurrentModuleId] = useState(1);

    function handleChangeModuleId(id: number) {

        setCurrentModuleId(id)
    }


    useEffect(() => {
        function getModules() {
            api.get('/api/modules-and-classes').then((res) => {
                setIsLoading(false);
                setModules(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.error(err)
            });
        }
        if (isLoading) {
            getModules();
        }
    }, [isLoading])


    return (
        <ModuleContext.Provider value={{
            modules,
            isLoading,
            handleChangeModuleId,
            currentModuleId
        }}>
            {props.children}
        </ModuleContext.Provider>
    )
}