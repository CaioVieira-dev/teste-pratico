import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type ModuleType = {
    id: number,
    name: string,
    classes: {
        name: string,
        date: string,
        id: number,
    }[]
};
type ModulesType = ModuleType[] | undefined;

type ModuleContextType = {
    modules: ModulesType;
    isLoading: boolean;
    handleChangeModuleId: (id: number) => void;
    currentModuleId: number;
    updateModule: (updatedModule: { name: string, moduleId: number }, token: string) => Promise<void>;
    updateClass: (updatedClass: { id: number, name: string, date: string }, moduleId: number, token: string) => Promise<void>;
}

type ModuleContextProviderProps = {
    children: ReactNode;
}

export const ModuleContext = createContext({} as ModuleContextType)

export function ModuleContextProvider(props: ModuleContextProviderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [modules, setModules] = useState<ModulesType>();
    const [currentModuleId, setCurrentModuleId] = useState(1);

    async function updateModule(updatedModule: { name: string, moduleId: number }, token: string) {
        try {
            await api.post('/api/update-module', {
                "name": `${updatedModule.name}`,
                "moduleId": `${updatedModule.moduleId}`
            }, {
                headers: { "authorization": `Bearer ${token}` }
            })
        } catch (error) {
            console.error(error);
        }
    }

    function handleChangeModuleId(id: number) {
        setCurrentModuleId(id)
    }

    async function updateClass(updatedClass: { id: number, name: string, date: string }, moduleId: number, token: string) {
        try {
            await api.post('/api/update-class', {
                "classData": {
                    "name": `${updatedClass.name}`,
                    "date": `${updatedClass.date}`,
                    "id": updatedClass.id
                },
                "moduleId": moduleId
            }, {
                headers: { "authorization": `Bearer ${token}` }
            })
        } catch (error) {
            console.error(error);
        }
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
            currentModuleId,
            updateModule,
            updateClass
        }}>
            {props.children}
        </ModuleContext.Provider>
    )
}