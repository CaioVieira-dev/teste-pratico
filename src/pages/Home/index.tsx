
import { Module } from '../../components/Module'
import { Classes } from '../../components/Classes'

import './styles.scss'

const data = [
    {
        module: "Introdução e Preparatório",
        classes: [{
            name: "Iniciando como um programador(a) Devaria",
            date: "21/06 às 19:30"
        }],
    },

]

export function Home() {

    return (
        <div className="Home">
            <header>
                <h3>Logo</h3>
                <span>Login</span>
            </header>
            <main>
                <h2>Módulos</h2>
                <sub>Selecione o módulo para ver as aulas disponíveis:</sub>
                <section className="modules">
                    {data.map(module => <Module moduleName={module.module} totalClasses={module.classes.length} />)}

                </section>
                <section className="content">
                    <h2>Module Name</h2>
                    <sub>Todas as aulas disponíveis nesse módulo:</sub>
                    <Classes />
                </section>
            </main>
        </div>
    )
}
