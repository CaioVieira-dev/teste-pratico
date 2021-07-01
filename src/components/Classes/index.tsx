
import './style.scss';

type ClassProps = {
    module: string;
    class: {
        name: string;
        date: string;
    }
}
type ClassesProps = {
    module: string;
    classes: {
        name: string;
        date: string;
    }[] | undefined
}
function Class(props: ClassProps) {

    return (
        <div className="class">
            <h5>{props.class.name}</h5>
            <p>{props.module}</p>
            <span>{props.class.date}</span>
        </div>
    )
}

export function Classes(props: ClassesProps) {
    console.log(props.classes)
    return (
        <div className="classes">
            {props.classes?.map((item) => <Class module={props.module} class={item} />)}
        </div>
    )
}