import React, { useEffect, useState } from "react"
import { getAllTours } from "../utils/ApiFunctions"
import TourCard from "./TourCard"
import { Col, Container, Row } from "react-bootstrap"
import TourFilter from "../common/TourFilter"
import TourPaginator from "../common/TourPaginator"

const Tour = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [toursPerPage] = useState(5)
    const [filteredData, setFilteredData] = useState([{ id: "" }])

    useEffect(() => {
        setIsLoading(true)
        getAllTours()
            .then((data) => {
                setData(data)
                setFilteredData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [])
    if (isLoading) {
        return <div>Загрузка доступных туров...</div>
    }
    if (error) {
        return <div className=" text-danger">Ошибка: {error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredData.length / toursPerPage)

    const renderTours = () => {
        const startIndex = (currentPage - 1) * toursPerPage
        const endIndex = startIndex + toursPerPage
        return filteredData
            .slice(startIndex, endIndex)
            .map((tour) => <TourCard key={tour.id} tour={tour} />)
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <TourFilter data={data} setFilteredData={setFilteredData} />
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <TourPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>{renderTours()}</Row>

            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <TourPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Tour