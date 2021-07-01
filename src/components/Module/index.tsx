
import './style.scss';

type ModuleProps = {
    moduleName: string;
    totalClasses: number;
}

export function Module(props: ModuleProps) {
    return (
        <div className="Module">
            <p>{props.moduleName}</p>
            <span>Aulas cadastradas {props.totalClasses}</span>
        </div>
    )
}