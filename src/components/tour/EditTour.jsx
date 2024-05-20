import React, { useEffect, useState } from "react"
import { getTourById, updateTour } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditTour = () => {

    const [tour, setTour] = useState({
        photo: "",
        tourName: "",
        tourPrice: "",
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { tourId } = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setTour({ ...tour, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setTour({ ...tour, [name]: value })
    }

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const tourData = await getTourById(tourId)
                setTour(tourData)
                setImagePreview(tourData.photo)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTour()
    }, [tourId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateTour(tourId, tour)
            if (response.status === 200) {
                setSuccessMessage("Тур обновлен успешно!")
                const updatedTourData = await getTourById(tourId)
                setTour(updatedTourData)
                setImagePreview(updatedTourData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Error updating room")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Редактировать тур</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tourName" className="form-label hotel-color">
                                Название тура
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="tourName"
                                name="tourName"
                                value={tour.tourName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tourPrice" className="form-label hotel-color">
                                Цена тура
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="tourPrice"
                                name="tourPrice"
                                value={tour.tourPrice}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label hotel-color">
                                Фото
                            </label>
                            <input
                                required
                                type="file"
                                className="form-control"
                                id="photo"
                                name="photo"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    // ng-src={`data:image/jpeg;base64,${imagePreview}`}
                                    src={`data:image/jpeg;base64,${imagePreview}`}
                                    alt="Фото тура"
                                    style={{ maxWidth: "400px", maxHeight: "400" }}
                                    className="mt-3"
                                />
                            )}
                        </div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <button type="submit" className="btn btn-outline-warning">
                                Редактировать тур
                            </button>
                            <Link to={"/existing-tours"} className="btn btn-outline-info ml-5">
                                Назад
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditTour