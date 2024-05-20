import React, { useEffect } from "react"
import { useState } from "react"
import { bookTour, getTourById } from '../utils/ApiFunctions'
import { useNavigate, useParams, Link } from "react-router-dom"
import { Form, FormControl, Button } from "react-bootstrap"
import BookingSummary from "./BookingSummary"

const BookingForm = () => {
    const [validated, setValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [tourPrice, setTourPrice] = useState(0)

    const currentUser = localStorage.getItem("userId")

    const [booking, setBooking] = useState({
        clientFullName: "",
        clientEmail: currentUser,
        bookingCount: ""
    })

    const { tourId } = useParams()
    const navigate = useNavigate()


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrorMessage("")
    }

    const getTourPriceById = async (tourId) => {
        try {
            const response = await getTourById(tourId)
            setTourPrice(response.tourPrice)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getTourPriceById(tourId)
    }, [tourId])

    const calculatePayment = () => {
        return tourPrice * parseInt(booking.bookingCount)
    }

    const isGuestCountValid = () => {
        const count = parseInt(booking.bookingCount)
        return count >= 1
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestCountValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setValidated(true)
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookTour(tourId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", { state: { message: confirmationCode } })
        } catch (error) {
            setErrorMessage(error.message)
            navigate("/booking-success", { state: { error: errorMessage } })
        }
    }


    return (
        <>
            <div className="container mb-5" >
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <h4 className="card-title">Забронировать тур</h4>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="clientFullName" className="hotel-color">
                                        Личные данные
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        id="clientFullName"
                                        name="clientFullName"
                                        value={booking.clientFullName}
                                        placeholder="Введите имя и фамилию"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, введите имя и фамилию
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="clientEmail" className="hotel-color">
                                        Почта
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        id="clientEmail"
                                        name="clientEmail"
                                        value={booking.clientEmail}
                                        placeholder="Введите адрес электронной почты"
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, введите адрес электронной почты.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="bookingCount" className="hotel-color">
                                        Количество участников тура
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="number"
                                        id="bookingCount"
                                        name="bookingCount"
                                        value={booking.bookingCount}
                                        min={1}
                                        placeholder="0"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, введите хотя бы одного участника.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid gap-2 d-md-flex mt-2">
                                    <button type="submit" className="btn btn-hotel">
                                        Продолжить
                                    </button>
                                    <Link to={"/browse-all-tours"} className="btn btn-hotel">
                                        Назад
                                    </Link>
                                </div>

                            </Form>
                        </div>
                    </div>

                    <div className="col-md-4">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                onConfirm={handleBooking}
                                isFormValid={validated}
                            />
                        )}
                    </div>

                </div>

            </div>
        </>
    )
}

export default BookingForm