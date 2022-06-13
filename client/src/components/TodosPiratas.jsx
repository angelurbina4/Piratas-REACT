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
        .catch(err => {
            if(err.response.status === 401){
                history.push("/login");
            }
        });
    }, [])
    
    const borrarPirata = idPirata => {

        axios.delete("http://localhost:8000/api/piratas/"+idPirata, {withCredentials:true})
            .then(res => {
                let nuevaLista = piratas.filter(pirata => pirata._id !== idPirata);
                setPiratas(nuevaLista);
            })
            .catch( err => {
                console.log(err);
                if(err.response.status === 401){
                    history.push("/login")
                }
            });
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-between align-items-center" >
                <h1>Tablero de la tripulación</h1>
                <div className="d-flex">
                    <div style={{margin: "5px"}}>
                        <Link to="/pirate/new" className="btn btn-success">Nuevo Pirata</Link>
                    </div>
                    <div style={{margin: "5px"}}>
                        <ButtonLogout/>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="row d-flex justify-content-center">
                {
                    piratas.map((pirata, index) =>(
                    <div key={index} className="d-flex justify-content-center" style={{margin: "20px"}}>
                        <div className="card" style={{width: "500px", margin: "10px"}}>
                            <img src={pirata.imagen} className="card-img-top" alt="Foto Perfil Pirata"/> 
                            <div className="card-body">
                                <h3 className="card-title">{pirata.pirateName}, <strong>{pirata.crewPosition}</strong></h3>
                                <p className="card-text">{pirata.phrase}</p>
                                <Link to={`/pirate/${pirata._id}`} style={{margin: "10px"}} className="btn btn-primary">Ver y editar  Pirata</Link>
                                <button className="btn btn-danger" onClick={() => borrarPirata(pirata._id)}>Caminar por el tablón</button>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )

}

export default TodosPiratas;