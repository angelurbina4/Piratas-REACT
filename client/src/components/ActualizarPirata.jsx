import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory, useParams, Link } from "react-router-dom";

const ActualizarPirata = () => {
    const {id} = useParams();

    const [pirateName, setPirateName] = useState("");
    const [imagen, setImagen] = useState("");
    const [treasureChests, setTreasureChests] = useState("");
    const [phrase, setPhrase] = useState("");
    const [crewPosition, setCrewPosition] = useState("");
    const [listCrew, setListCrew] = useState(["Select Crew position","Captain", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey"]);
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);

    const [errors, setErrors] = useState({});

    const history = useHistory();

    useEffect( () => {
        axios.get("http://localhost:8000/api/piratas/"+id, {withCredentials:true})
            .then(res => {
                setPirateName(res.data.pirateName);
                setImagen(res.data.imagen);
                setTreasureChests(res.data.treasureChests);
                setPhrase(res.data.phrase);
                setCrewPosition(res.data.crewPosition);
                setPegLeg(res.data.pegLeg);
                setEyePatch(res.data.eyePatch);
                setHookHand(res.data.hookHand);
            })
            .catch( err => {
                if(err.response.status ===401){
                    history.push("/login")
                }else{
                    history.push("/errors")
                }
            });
    }, [id, history])


    const cambioEstadoPegLeg = (e) => {
        e.preventDefault(); 

        console.log("Cambio")
        const newPegleg = !pegLeg;
        setPegLeg(newPegleg);
        console.log(pegLeg);

        axios.put("http://localhost:8000/api/piratas/"+id, {
            pirateName,
            imagen,
            treasureChests,
            phrase,
            crewPosition,
            pegLeg: newPegleg,
            eyePatch,
            hookHand
        })
        .catch( err => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        });
    }

    const cambioEstadoEyePatch = (e) => {
        e.preventDefault(); 

        console.log("Cambio")
        const newEyePatch = !eyePatch;
        setEyePatch(newEyePatch);
        console.log(eyePatch);

        axios.put("http://localhost:8000/api/piratas/"+id, {
            pirateName,
            imagen,
            treasureChests,
            phrase,
            crewPosition,
            pegLeg,
            eyePatch: newEyePatch,
            hookHand
        })
        .catch( err => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        });
    }

    const cambioEstadoHookHand = (e) => {
        e.preventDefault(); 

        console.log("Cambio")
        const newHookHand = !hookHand;
        setHookHand(newHookHand);
        console.log(hookHand);

        axios.put("http://localhost:8000/api/piratas/"+id, {
            pirateName,
            imagen,
            treasureChests,
            phrase,
            crewPosition,
            pegLeg,
            eyePatch,
            hookHand: newHookHand
        })
        .catch( err => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        });
    }

    return(
        <div>
            <div>
                <h1>{pirateName}</h1>
                <Link className="btn btn-primary" to="/pirates">Crew Board</Link>
            </div>
            <br/>
                <div className="row">
                    <div className="col-6">
                        <img className="img-fluid" src={imagen} alt="Foto Perfil Pirata"/>
                        <h2>{phrase}</h2>
                    </div>
                    <div className="col-6">
                        <p><strong>Position:</strong>{crewPosition}</p>
                        <p><strong>Treasure:</strong>{treasureChests}</p>

                        <p><strong>Peg Leg:</strong>{pegLeg ? "yes" : "no"}<span><button className={pegLeg ? "btn btn-danger":"btn btn-success"} onClick={(e) => cambioEstadoPegLeg(e)}>{pegLeg ? "no" : "yes"}</button></span></p>

                        <p><strong>Eye Patch:</strong>{eyePatch ? "yes" : "no"}<span><button className={eyePatch ? "btn btn-danger":"btn btn-success"}  onClick={(e) => cambioEstadoEyePatch(e)}>{eyePatch ? "no" : "yes"}</button></span></p>

                        <p><strong>Hook Hand:</strong>{hookHand ? "yes" : "no"}<span><button className={hookHand ? "btn btn-danger":"btn btn-success"} onClick={(e) => cambioEstadoHookHand(e)}>{hookHand ? "no" : "yes"}</button></span></p>
                    </div>
                </div>
        </div>
    )



}

export default ActualizarPirata;