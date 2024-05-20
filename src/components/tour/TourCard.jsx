import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const TourCard = ({ tour }) => {
    return (
        <Col key={tour.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">

                        <Link to={`/book-tour/${tour.id}`}>
                            <Card.Img
                                variant="top"
                                src={`data:image/png;base64, ${tour.photo}`}
                                alt="Фото тура"
                                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                            />
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color">{tour.tourName}</Card.Title>
                        <Card.Title className="room-price">{tour.tourPrice} ₽ за человека</Card.Title>
                        {/* <Card.Text>Информация о туре</Card.Text> */}
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/book-tour/${tour.id}`} className="btn btn-hotel btn-sm">
                            Забронировать
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TourCard