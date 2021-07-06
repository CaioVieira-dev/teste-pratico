import cog from '../../assets/cog.svg'
import './style.scss';


import { useModule } from '../../hooks/useModule'
import { useAuth } from '../../hooks/useAuth'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { toast } from 'react-toastify';

import { FormEvent, useEffect, useState } from 'react';

type ModuleProps = {
    moduleId: number;
    moduleName: string;
    totalClasses: number;
    isAdmin: boolean;
}

export function Module(props: ModuleProps) {
    const { handleChangeModuleId, updateModule, deleteModule, refreshModules, currentModuleId } = useModule()
    const { getToken } = useAuth()
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
    const [isEditing, setIsEditing] = useState(false)

    const [updateField, setUpdateField] = useState(props.moduleName)

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            setIsEditing(false)
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => { document.removeEventListener("keydown", handleKeydown); }
    })
    async function handleUpdateModule(e: FormEvent) {
        e.preventDefault();
        if (updateField === '') {
            return;
        }
        const token = getToken() || '';
        try {

            await updateModule({ name: updateField, moduleId: props.moduleId }, token)
        } catch (error) {
            console.error(error);
            toast.error('Alguma coisa deu errado. Tente novamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        refreshModules()
        setIsEditing(false)
        toast.success('Módulo atualizado com sucesso', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    async function handleDeleteModule() {
        const token = getToken() || '';
        try {
            await deleteModule(props.moduleId, token)
        } catch (error) {
            console.error(error)
            toast.error('Alguma coisa deu errado. Tente novamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        refreshModules()
        toast.success('Módulo deletado com sucesso', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    return (
        <div onClick={() => handleChangeModuleId(props.moduleId)} className={props.moduleId === currentModuleId ? "Module selected" : "Module"}>
            <div className="data">
                <p>{props.moduleName}</p>
                <span>Aulas cadastradas {props.totalClasses}</span>
            </div>
            {props.isAdmin &&
                <div className="config">
                    <button className="cogButton" onClick={() => setIsOpen(true)} {...buttonProps} ><img src={cog} alt="Configurações" /></button>
                    <div className={isOpen ? "visible" : ""} role="menubar">
                        <button onClick={() => setIsEditing(true)}><a {...itemProps[0]}>Editar</a></button>
                        <button onClick={handleDeleteModule} ><a {...itemProps[1]}>Deletar</a></button>
                        <div className={isEditing ? 'edit visible' : "edit"}>
                            <h3>Editar modulo {props.moduleName}</h3>
                            <form onSubmit={(e) => handleUpdateModule(e)}>
                                <input onChange={(e) => setUpdateField(e.target.value)} type="text" name="editModuleName" value={updateField} />
                                <div className="buttons">
                                    <button className='cancel'
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false)
                                        }} >Cancelar</button>
                                    <button type="submit" className='save'>Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
        </div>
    )
}