

import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


import { Module } from '../../components/Module'
import { Classes } from '../../components/Classes'

import { useModule } from '../../hooks/useModule'
import { useAuth } from '../../hooks/useAuth'


import './styles.scss'



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
            <header>
                <h3>Logo</h3>
                <span>Login</span>
            </header>
            <main>
                <div className="wrapper">
                    <div className="text">
                        <h2>Módulos</h2>
                        <sub>Selecione o módulo para ver as aulas disponíveis:</sub>
                    </div>
                    <div className="adminControls">
                        <button >Adicionar aula</button>
                        <button >Adicionar módulo</button>
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
                    <h2>Module Name</h2>
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