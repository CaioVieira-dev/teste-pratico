
import { Module } from '../../components/Module'
import { Classes } from '../../components/Classes'

import './styles.scss'
import { Header } from '../../components/Header'

import { useModule } from '../../hooks/useModule'

export function Home() {
    const { isLoading,
        modules,
        currentModuleId } = useModule()

    if (isLoading) {
        return (
            <div className="Home">
                Carregando
            </div>
        )
    }

    return (
        <div className="Home">
            <Header />
            <main>
                <h2>Módulos</h2>
                <sub>Selecione o módulo para ver as aulas disponíveis:</sub>
                <section className="modules">
                    {modules?.map(module => <Module
                        key={module.id}
                        moduleId={module.id}
                        moduleName={module.name}
                        totalClasses={module.classes.length}
                        isAdmin={false}
                    />)}

                </section>
                <section className="content">
                    <h2>Module Name</h2>
                    <sub>Todas as aulas disponíveis nesse módulo:</sub>
                    <Classes
                        module={modules !== undefined ? modules[modules.findIndex((module) => { return module.id === currentModuleId })].name : ''}
                        classes={modules !== undefined ? modules[modules.findIndex((module) => { return module.id === currentModuleId })].classes : undefined} />
                </section>
            </main>
        </div>
    )
}
