import {useState} from "react";

export default function Player({name, symbol})
{
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick()
    {

       setIsEditing((editing)=>!editing);
    }

    function handleChange(event)
    {
      setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}  </span>
    let buttonCaption ='Edit';

    if(isEditing)
    {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
       buttonCaption="Save";
    }
    return (
        <>
        <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{buttonCaption}</button>
        </>
    )
}