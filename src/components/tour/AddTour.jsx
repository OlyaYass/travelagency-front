import React, { useState } from 'react'
import { addTour } from '../utils/ApiFunctions'
import TourTypeSelector from '../common/TourNameSelector'
import { Link } from "react-router-dom"

function AddTour() {
    const [newTour, setNewTour] = useState({
        photo: null,
        tourName: "",
        tourPrice: "",
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleTourInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "tourPrice") {
            if (!isNaN(value)) {
                Number.parseInt(value, 10)
            }
            else {
                value = ""
            }
        }
        setNewTour({ ...newTour, [name]: value })
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewTour({ ...newTour, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addTour(newTour.photo, newTour.tourName, newTour.tourPrice)

            if (success !== undefined) {
                setSuccessMessage("Новый тур добавлен в базу данных")
                setNewTour({ photo: null, tourName: "", tourPrice: "" })
                setImagePreview("")
                setErrorMessage("")
            }
            else {
                setErrorMessage("Ошибка добавления тура")
            }

        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }


    return (
        <div>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">

                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Добавление нового тура</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}

                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="tourName" className='form-label'>
                                    Название тура
                                </label>
                                <div>
                                    <TourTypeSelector
                                        handleTourInputChange={handleTourInputChange}
                                        newTour={newTour} />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tourPrice" className='form-label'>
                                    Цена тура
                                </label>

                                <input className="form-control"
                                    required
                                    id="tourPrice"
                                    name="tourPrice"
                                    type="number"
                                    // value={newTour.tourPrice}
                                    onChange={handleTourInputChange}>
                                </input>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className='form-label'>
                                    Фото тура
                                </label>

                                <input id="photo" name="photo"
                                    type="file"
                                    className='form-control'
                                    onChange={handleImageChange}>
                                </input>

                                {imagePreview && (
                                    <img src={imagePreview}
                                        alt="Preview Tour Photo"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3">
                                    </img>
                                )}

                            </div>


                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">
                                    Сохранить Тур
                                </button>
                                <Link to={"/existing-tours"} className="btn btn-outline-info ml-5">
                                    Назад
                                </Link>
                            </div>

                        </form>



                    </div>
                </div>

            </section>
        </div>
    )
}

export default AddTour