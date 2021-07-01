
import './style.scss';

function Class() {

    return (
        <div className="class">
            <h5>Class Name</h5>
            <p>Class Module</p>
            <span>Date of class</span>
        </div>
    )
}

export function Classes() {
    return (
        <div className="classes">
            <Class />
            <Class />
            <Class />
            <Class />
            <Class />
        </div>
    )
}