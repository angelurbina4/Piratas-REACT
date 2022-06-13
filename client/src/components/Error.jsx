import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div>
            <h4>No encontramos al pirata, intenta darlo de alta</h4>
            <Link to="/pirate/new" className="btn btn-success">Crea un nuevo Pirata</Link>
        </div>

    )
}

export default Error;