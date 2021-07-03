import cog from '../../assets/cog.svg'
import './style.scss';

type ModuleProps = {
    moduleName: string;
    totalClasses: number;
    isAdmin: boolean;
}

export function Module(props: ModuleProps) {
    return (
        <div className="Module">
            <div className="data">
                <p>{props.moduleName}</p>
                <span>Aulas cadastradas {props.totalClasses}</span>
            </div>
            {props.isAdmin &&
                <div className="config">
                    <img src={cog} alt="Configurações" />
                    <div className="abs">
                        <button>Editar</button>
                        <button>Deletar</button>
                    </div>
                </div>}
        </div>
    )
}