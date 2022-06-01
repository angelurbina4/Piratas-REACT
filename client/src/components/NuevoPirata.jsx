import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link} from "react-router-dom";


const NuevoPirata = () => {

    const [pirateName, setPirateName] = useState("");
    const [imagen, setImagen] = useState("");
    const [treasureChests, setTreasureChests] = useState("");
    const [phrase, setPhrase] = useState("");
    const [crewPosition, setCrewPosition] = useState("");
    const [listCrew, setListCrew] = useState(["Select Crew position", "Captain", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey"]);
    const [listCrew2, setListCrew2] = useState(["Select Crew position", "First Mate", "Quarter Master", "Boatswain", "Powder Monkey"]);
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);

    const [captain, setCaptain] = useState({});

    const [errors, setErrors] = useState({});
    const history = useHistory();

    
    useEffect( () => {
        axios.get("http://localhost:8000/api/piratas/captain")
            .then(res => {
                console.log(res.data);
                setCaptain(res.data)
            })
            .catch( err => console.log(err) );
    }, [])

    const guardarPirata = e => {
        e.preventDefault(); 

        axios.post("http://localhost:8000/api/piratas", {
            pirateName,
            imagen,
            treasureChests,
            phrase,
            crewPosition,
            pegLeg,
            eyePatch,
            hookHand
        }, {withCredentials: true})
        .then(res => history.push("/pirates"))
        .catch( err => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        });
    }

    return(
        <div>
            <div>
                <h1>Add Pirate</h1>
                <Link className="btn btn-primary" to="/pirates">Crew Board</Link>
            </div>
            <br/>
            <form onSubmit={guardarPirata}>
                <div className="row">

                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="pirateName">Pirate name:</label>
                            <input type={"text"} id="pirateName" name="pirateName" value={pirateName} onChange={(e) => setPirateName(e.target.value)} className="form-control" />
                            {errors.pirateName ? <span className="text-danger">{errors.pirateName.message}</span> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="imagen">URL Imagen:</label>
                            <input type={"text"} id="imagen" name="imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} className="form-control"/>
                            {errors.imagen ? <span className="text-danger">{errors.imagen.message}</span> : null}
                        </div>
                        <div className="form-group col-2">
                            <label htmlFor="treasureChests"># of treasure chests:</label>
                            <input id="treasureChests" name="treasureChests" type="number" className="form-control" value={treasureChests} onChange={ (e) => setTreasureChests(e.target.value) }/>
                            {errors.treasureChests ? <span className="text-danger">{errors.treasureChests.message}</span> : null}
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="phrase">Pirate Catch Phrase:</label>
                            <input id="phrase" name="phrase" type="text" className="form-control" value={phrase} onChange={ (e) => setPhrase(e.target.value) }/>
                            {errors.phrase ? <span className="text-danger">{errors.phrase.message}</span> : null}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="form-group">
                            <label>Crew Position: </label>
                            <select name="crewPosition" id="crewPosition" className="form-control" onChange={(e) => setCrewPosition(e.target.value)} checked>
                                {   
                                    !captain ?
                                    listCrew.map(crew => {
                                        return (
                                            <option key={crew} value={crew}>{crew}</option>
                                        );
                                    }):
                                    listCrew2.map(crew => {
                                        return (
                                            <option key={crew} value={crew}>{crew}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="pegLeg" >Peg Leg</label>
                            <input type={"checkbox"} className="form-check-input" id="pegLeg" name="pegLeg" checked={pegLeg} onChange={ (e) => setPegLeg(e.target.checked) } />
                            
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="eyePatch" >Eye Patch</label>
                            <input type={"checkbox"} className="form-check-input" id="eyePatch" name="eyePatch" checked={eyePatch} onChange={ (e) => setEyePatch(e.target.checked) } />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="hookHand" >Hook Hand</label>
                            <input type={"checkbox"} className="form-check-input" id="hookHand" name="hookHand" checked={hookHand} onChange={ (e) => setHookHand(e.target.checked) } />
                        </div>
                        <div>
                            <br/>
                            <input type={"submit"} className="btn btn-primary" value={"Guardar"}/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NuevoPirata;