import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ButtonLogout from "./ButtonLogout";

const TodosPiratas = () => {
    const [piratas, setPiratas] = useState([]);
    const history = useHistory();

    useEffect( () => {
        axios.get("http://localhost:8000/api/piratas", {withCredentials:true})
        .then( res => setPiratas(res.data) )
        .catch( err => console.log(err) );
    }, [])
    
    const borrarPirata = idPirata => {

        axios.delete("http://localhost:8000/api/piratas/"+idPirata)
            .then(res => {
                let nuevaLista = piratas.filter(pirata => pirata._id !== idPirata);
                setPiratas(nuevaLista);
            })
            .catch( err => {
                console.log(err);
                if(err.response.status === 401){
                    history.push("login")
                }
            });
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-between">
                <h1>Pirate Crew</h1>
                <Link to="/pirate/new" className="btn btn-success">Nuevo Pirata</Link>
                <ButtonLogout/>
            </div>
            <br/>
            <br/>
            <br/>
            <div>
                {
                    piratas.map((pirata, index) =>(
                        <div key={index} className="row">
                            <div className="col-6">
                                <img className="img-fluid" src={pirata.imagen} alt="Foto Perfil Pirata"/>
                                <h2>{pirata.phrase}</h2>
                            </div>
                            <div className="d-flex flex-column justify-content-center col-6">
                                <h2>{pirata.pirateName}</h2>
                                <div className="d-flex justify-content-around">
                                    <Link to={`/pirate/${pirata._id}`} className="btn btn-primary">View Pirate</Link>
                                    <button className="btn btn-danger" onClick={() => borrarPirata(pirata._id)}>Walk the Plank</button>
                                </div>
                            </div>
                            <br/>
                        </div>
                        
                    ))
                }
            </div>
        </div>
    )

}

export default TodosPiratas;