import React, { useEffect, useState } from "react"
import { deleteTour, getAllTours } from "../utils/ApiFunctions"
import { Col, Row } from "react-bootstrap"
import TourFilter from "../common/TourFilter"
import TourPaginator from "../common/TourPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingTours = () => {
    const [tours, setTours] = useState([{ id: "", tourName: "", tourPrice: "" }])
    const [currentPage, setCurrentPage] = useState(1)
    const [toursPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredTours, setFilteredTours] = useState([{ id: "", tourName: "", tourPrice: "" }])
    const [selectedTourName, setSelectedTourName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        fetchTours()
    }, [])

    const fetchTours = async () => {
        setIsLoading(true)
        try {
            const result = await getAllTours()
            setTours(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedTourName === "") {
            setFilteredTours(tours)
        } else {
            const filteredTours = tours.filter((tour) => tour.tourName === selectedTourName)
            setFilteredTours(filteredTours)
        }
        setCurrentPage(1)
    }, [tours, selectedTourName])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (tourId) => {
        try {
            const result = await deleteTour(tourId)
            if (result === "") {
                setSuccessMessage(`Tour № ${tourId} was delete`)
                fetchTours()
            } else {
                console.error(`Error deleting tour : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredTours, toursPerPage, tours) => {
        const totalTours = filteredTours.length > 0 ? filteredTours.length : tours.length
        return Math.ceil(totalTours / toursPerPage)
    }

    const indexOfLastTour = currentPage * toursPerPage
    const indexOfFirstTour = indexOfLastTour - toursPerPage
    const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour)

    return (
        <>
            {/* <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div> */}

            {isLoading ? (
                <p>Загрузка доступных туров</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Доступные туры</h2>
                        </div>

                        <Row>
                            <Col md={6} className="mb-2 md-mb-0">
                                <TourFilter data={tours} setFilteredData={setFilteredTours} />
                            </Col>

                            <Col md={6} className="d-flex justify-content-end">
                                <Link to={"/add-tour"}>
                                    <FaPlus /> Добавить тур
                                </Link>
                            </Col>
                        </Row>

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Название тура</th>
                                    <th>Цена тура</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentTours.map((tour) => (
                                    <tr key={tour.id} className="text-center">
                                        <td>{tour.id}</td>
                                        <td>{tour.tourName}</td>
                                        <td>{tour.tourPrice}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-tour/${tour.id}`} className="gap-2">
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm ml-5">
                                                    <FaEdit />
                                                </span>
                                            </Link>


                                            <button
                                                className="btn btn-danger btn-sm ml-5"
                                                onClick={() => handleDelete(tour.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <TourPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredTours, toursPerPage, tours)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingTours