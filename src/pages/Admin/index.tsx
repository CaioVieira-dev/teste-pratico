

import { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


import { Module } from '../../components/Module'
import { Classes } from '../../components/Classes'
import { Header } from '../../components/Header'

import { useModule } from '../../hooks/useModule'
import { useAuth } from '../../hooks/useAuth'

import useDropdownMenu from 'react-accessible-dropdown-menu-hook';



import './styles.scss'



type AddClassProps = {
    modules: string[],
    moduleId: number[]
}

function AddClass(props: AddClassProps) {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);
    const [isEditing, setIsEditing] = useState(false);
    const { addClass } = useModule();
    const { getToken } = useAuth();

    const [moduleField, setModuleField] = useState(props.moduleId[0]);
    const [classNameField, setClassNameField] = useState('');
    const [classDateField, setClassDateField] = useState('');

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            setIsEditing(false)
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => { document.removeEventListener("keydown", handleKeydown); }
    })

    async function handleSubmit(e: FormEvent) {

        e.preventDefault();
        if (!moduleField || !classNameField || !classDateField) { return }

        const day = classDateField.substr(8, 2)
        const month = classDateField.substr(5, 2)
        const year = classDateField.substr(0, 4)
        const time = classDateField.substr(11)
        let date = `${day}/${month}/${year} às ${time}`;

        const token = getToken() || '';
        try {
            await addClass({ name: classNameField, date: date }, moduleField, token)
        } catch (error) {
            console.error(error)
        }

        setClassDateField('');
        setClassNameField('');
        setModuleField(props.moduleId[0]);

        window.location.reload();
    }

    return (
        <>
            <button {...buttonProps} onClick={() => setIsEditing(true)}>Adicionar aula</button>
            <a {...itemProps[0]} className="cheat"></a>
            <div className={isOpen || isEditing ? "visible" : ""} role="form" >
                <h3>Adicionar Aula</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="modules">Selecione um modulo:</label>
                    <select
                        name="modules"
                        onChange={(e) => {
                            setModuleField(Number(e.target.value))
                        }}>
                        {[...props.modules].map((module, index) => <option key={`module_optio_${index}`} value={props.moduleId[index]}>{module}</option>)}
                    </select>
                    <label htmlFor="name">Nome da aula</label>
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => setClassNameField(e.target.value)}
                        value={classNameField}
                        required
                    />
                    <label htmlFor="date">Data e hora da aula</label>
                    <input
                        type="datetime-local"
                        name="date"
                        onChange={(e) => setClassDateField(e.target.value)}
                        required
                        value={classDateField} />
                    <div className="buttons">
                        <button type="button" onClick={() => {
                            setIsOpen(false);
                            setIsEditing(false);
                        }}>Cancelar</button>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    )
}
function AddModule() {
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);
    const [isEditing, setIsEditing] = useState(false);
    const [nameField, setNameField] = useState('');
    const { addModule } = useModule();
    const { getToken } = useAuth()

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            setIsEditing(false)
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => { document.removeEventListener("keydown", handleKeydown); }
    })

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!nameField) {
            return;
        }
        const token = getToken() || '';
        try {
            await addModule(nameField, token)
        } catch (error) {
            console.error(error)
        }

        setNameField('');
        window.location.reload();
    }

    return (
        <>
            <button  {...buttonProps} onClick={() => setIsEditing(true)} >Adicionar módulo</button>
            <a {...itemProps[0]} className="cheat"></a>
            <div className={isOpen || isEditing ? "visible" : ""} role="form" >
                <h3>Adicionar modulo</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="name">Nome do modulo</label>
                    <input
                        type="text"
                        name="name"
                        onChange={e => setNameField(e.target.value)}
                        value={nameField}
                        required
                    />
                    <div className="buttons">
                        <button type="button" onClick={() => {
                            setIsOpen(false);
                            setIsEditing(false);
                        }}>Cancelar</button>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export function Admin() {

    const history = useHistory();
    const { modules, currentModuleId, isLoading } = useModule();
    const [isAdminValidated, setIsAdminValidated] = useState(false);
    const { validateAdmin } = useAuth();

    useEffect(() => {
        function validateUserRole() {
            if (localStorage.getItem("verzel_pratic_test_auth_token") === null) {
                history.push('/login')
            }
            try {
                validateAdmin()
                setIsAdminValidated(true);
            } catch (error) {
                console.log(error);
                history.push('/login')
            }
        }
        if (!isAdminValidated) {
            validateUserRole()
        }

    }, [])




    if (isLoading) {
        return (
            <h1>Carregando</h1>

        )
    }

    return (
        <div className="Admin">
            <Header />
            <main>
                <div className="wrapper">
                    <div className="text">
                        <h2>Módulos</h2>
                        <sub>Selecione o módulo para ver as aulas disponíveis:</sub>
                    </div>
                    <div className="adminControls">
                        <AddClass
                            modules={modules?.map(module => module.name) || []}
                            moduleId={modules?.map(module => module.id) || []} />
                        <AddModule />
                    </div>
                </div>
                <section className="modules">
                    {modules?.map(module => <Module
                        key={module.id}
                        moduleId={module.id}
                        moduleName={module.name}
                        totalClasses={module.classes.length}
                        isAdmin={true}
                    />)}

                </section>
                <section className="content">
                    <h2>{modules !== undefined ? modules[modules.findIndex((module) => { return module.id === currentModuleId })].name : ''}</h2>
                    <sub>Todas as aulas disponíveis nesse módulo:</sub>
                    <Classes
                        moduleId={modules !== undefined ? modules[modules.findIndex((module) => { return module.id === currentModuleId })].id : 0}
                        module={modules !== undefined ? modules[modules.findIndex((module) => { return module.id === currentModuleId })].name : ''}
                        classes={modules !== undefined ? modules[modules.findIndex((module) => { return module.id === currentModuleId })].classes : undefined}
                        isAdmin
                    />
                </section>
            </main>



        </div>
    )
}