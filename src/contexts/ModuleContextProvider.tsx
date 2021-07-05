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
    addModule: (moduleName: string, token: string) => Promise<void>;
    addClass: (classData: { name: string, date: string }, moduleId: number, token: string) => Promise<void>;
    deleteModule: (moduleId: number, token: string) => Promise<void>;
    deleteClass: (classId: number, moduleId: number, token: string) => Promise<void>;
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

    async function addModule(moduleName: string, token: string) {
        try {
            await api.put('/api/new-module', {
                "name": moduleName
            }, {
                headers: { "authorization": `Bearer ${token}` }
            })
        } catch (error) {
            console.error(error);
        }
    }
    async function addClass(classData: { name: string, date: string }, moduleId: number, token: string) {
        try {
            await api.put('/api/new-class', {
                "classData": { "name": `${classData.name}`, "date": `${classData.date}` },
                "moduleId": moduleId
            }, {
                headers: { "authorization": `Bearer ${token}` }
            })
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteModule(moduleId: number, token: string) {

        try {
            await api.delete('/api/delete-module', {
                headers: { "authorization": `Bearer ${token}` },
                data: { "moduleId": moduleId }
            })
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteClass(classId: number, moduleId: number, token: string) {
        try {
            await api.delete('/api/delete-class', {
                headers: { "authorization": `Bearer ${token}` },
                data: {
                    "moduleId": moduleId,
                    "id": classId
                }
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
            updateClass,
            addModule,
            addClass,
            deleteModule,
            deleteClass
        }}>
            {props.children}
        </ModuleContext.Provider>
    )
}