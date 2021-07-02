
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { api } from '../../services/api'

export function Private() {
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        function validateUser() {
            if (localStorage.getItem("verzel_pratic_test_auth_token") === null) {
                history.push('/login')
            }

            api.get('/api/private', {
                headers: { "authorization": `Bearer ${localStorage.getItem("verzel_pratic_test_auth_token")}` }
            }).then(response => {
                console.log(response.data)
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
        <h1>private route</h1>
    )
}