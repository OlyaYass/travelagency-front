import React, { useEffect, useState } from 'react'
import { getTourNames } from '../utils/ApiFunctions'

const TourNameSelector = ({ handleTourInputChange, newTour }) => {
    const [tourNames, setTourNames] = useState([""])
    const [showNewTourNameInput, setShowNewTourNameInput] = useState(false)
    const [newTourName, setNewTourName] = useState("")


    useEffect(() => {
        getTourNames().then((data) => {
            setTourNames(data)
        })
    }, [])


    const handleNewTourNameInputChange = (e) => {
        setNewTourName(e.target.value);
    }


    const handleAddNewTourName = () => {
        if (newTourName !== "") {
            setTourNames([...tourNames, newTourName])
            setNewTourName("")
            setShowNewTourNameInput(false)
        }
    }


    return (
        <>
            {tourNames.length > 0 && (
                <div>
                    <select name="tourName" id="tourName"
                        value={newTour.tourName}
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewTourNameInput(true)
                            }
                            else {
                                handleTourInputChange(e)
                            }
                        }}>

                        <option value={""}>Выбрать тур</option>
                        <option value={"Add New"}>Добавить новый тур</option>
                        {tourNames.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}

                    </select>

                    {showNewTourNameInput && (
                        <div className="input-group">
                            <input className="form-control"
                                type="text"
                                placeholder='Введите название тура'
                                onChange={handleNewTourNameInputChange}>
                            </input>

                            <button className='btn btn-tour' type='button'
                                onClick={handleAddNewTourName}>Добавить</button>
                        </div>
                    )}

                </div>
            )}

        </>
    )
}

export default TourNameSelector