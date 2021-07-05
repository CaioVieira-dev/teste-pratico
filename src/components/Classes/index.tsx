import cog from '../../assets/cog.svg'


import { FormEvent, useEffect, useState } from 'react';
import { useModule } from '../../hooks/useModule'
import { useAuth } from '../../hooks/useAuth'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import './style.scss';


type ClassProps = {
    moduleId?: number;
    module: string;
    class: {
        name: string;
        date: string;
        id: number;
    },
    toggleEditClass?: (id: number) => void;
    isAdmin?: boolean;
}
type ClassesProps = {
    moduleId?: number;
    module: string;
    classes: {
        name: string;
        date: string;
        id: number;
    }[] | undefined;
    isAdmin?: boolean;
}
function Class(props: ClassProps) {
    const [updateName, setUpdateName] = useState(props.class.name)
    const [updateDate, setUpdateDate] = useState(props.class.date)
    const { updateClass, deleteClass } = useModule();
    const { getToken } = useAuth()
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
    const [isEditing, setIsEditing] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!updateName || !updateDate) {
            return;
        }

        const day = updateDate.substr(8, 2)
        const month = updateDate.substr(5, 2)
        const year = updateDate.substr(0, 4)
        const time = updateDate.substr(11)
        let date = `${day}/${month}/${year} às ${time}`;

        const token = getToken() || '';
        await updateClass({
            id: props.class.id,
            name: updateName,
            date: date
        },
            props.moduleId || 0,
            token)

        window.location.reload()

    }


    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            setIsEditing(false)
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => { document.removeEventListener("keydown", handleKeydown); }
    })
    async function handleDeleteClass() {
        const token = getToken() || '';
        try {
            await deleteClass(props.class.id, props.moduleId || 0, token)
        } catch (error) {
            console.error(error);
        }
        window.location.reload()
    }

    return (
        <div className="class">
            <div className="info">
                <h5>{props.class.name}</h5>
                <p>{props.module}</p>
                <span>{props.class.date}</span>
            </div>
            {props.isAdmin &&
                <>
                    <div className="config">
                        <button
                            className="cogButton"
                            onClick={() => setIsOpen(true)} {...buttonProps} ><img src={cog} alt="Configurações" /></button>
                        <div className={isOpen ? "visible" : ""} role="menubar">
                            <button onClick={() => setIsEditing(true)}><a {...itemProps[0]}>Editar</a></button>
                            <button onClick={handleDeleteClass} ><a {...itemProps[1]}>Deletar</a></button>
                            <div className={isEditing ? 'edit visible' : "edit"}>
                                <h3>Editar aula {props.class.name}</h3>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="name">Nome:</label>
                                    <input onChange={e => setUpdateName(e.target.value)} type="text" name="name" value={updateName} />
                                    <label htmlFor="date">Data e hora em que acontecerá:</label>
                                    <input onChange={e => setUpdateDate(e.target.value)} type="datetime-local" name="date" value={updateDate} />
                                    <div className="buttons">
                                        <button className='cancel'>Cancelar</button>
                                        <button type="submit" className='save'>Salvar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export function Classes(props: ClassesProps) {

    return (
        <div className="classes">
            {props.classes?.map((item, index) => <Class
                key={`class_${index}`}
                module={props.module}
                class={item}
                moduleId={props.moduleId}
                isAdmin={props.isAdmin}
            />)}
        </div>
    )
}