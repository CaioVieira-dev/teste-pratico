
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { api } from '../../services/api'

import { Module } from '../../components/Module'
import { Classes } from '../../components/Classes'

import './styles.scss'


type DataType = {
    id: number,
    module: string,
    classes: {
        name: string,
        date: string
    }[]
}[] | undefined

export function Admin() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<DataType>();
    const history = useHistory()

    useEffect(() => {
        function validateUser() {
            if (localStorage.getItem("verzel_pratic_test_auth_token") === null) {
                history.push('/login')
            }

            api.get('/api/private', {
                headers: { "authorization": `Bearer ${localStorage.getItem("verzel_pratic_test_auth_token")}` }
            }).then(response => {
                api.get('/api/modules-and-classes', {
                    headers: { "authorization": `Bearer ${localStorage.getItem("verzel_pratic_test_auth_token")}` }
                }).then((res) => {
                    setIsLoading(false);
                    setData(res.data)
                }).catch((err) => {
                    console.error(err)
                    history.push('/login')
                });
                setIsLoading(false)
            }).catch(error => {
                console.error(error.message)
                history.push('/login')
            })


        }
        if (isLoading) {
            validateUser()
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
                    {data?.map(module => <Module
                        key={module.id}
                        moduleName={module.module}
                        totalClasses={module.classes.length}
                        isAdmin={true} />)}

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