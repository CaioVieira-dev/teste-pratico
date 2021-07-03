import { useHistory } from 'react-router-dom'

import { Module } from '../../components/Module'
import { Classes } from '../../components/Classes'
import { api } from '../../services/api'


import './styles.scss'
import { useEffect, useState } from 'react'



type DataType = {
    id: number,
    module: string,
    classes: {
        name: string,
        date: string
    }[]
}[] | undefined

export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataType>();
    const history = useHistory();

    useEffect(() => {

        function getData() {
            if (localStorage.getItem("verzel_pratic_test_auth_token") === null) {
                history.push('/login')
            }
            api.get('/api/modules-and-classes', {
                headers: { "authorization": `Bearer ${localStorage.getItem("verzel_pratic_test_auth_token")}` }
            }).then((res) => {
                setIsLoading(false);
                setData(res.data)
            }).catch((err) => {
                console.error(err)
                history.push('/login')
            });

        }
        if (isLoading) {

            getData();
        }
    }, [isLoading])


    if (isLoading) {
        return (
            <div className="Home">
                Carregando
            </div>
        )
    }

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
                    {data?.map(module => <Module
                        key={module.id}
                        moduleName={module.module}
                        totalClasses={module.classes.length}
                        isAdmin={false}
                    />)}

                </section>
                <section className="content">
                    <h2>Module Name</h2>
                    <sub>Todas as aulas disponíveis nesse módulo:</sub>
                    <Classes module={data !== undefined ? data[2].module : ''} classes={data !== undefined ? data[2].classes : undefined} />
                </section>
            </main>
        </div>
    )
}
