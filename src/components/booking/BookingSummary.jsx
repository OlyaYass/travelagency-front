import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const navigate = useNavigate()

    // const handleConfirmBooking = () => {
    //     // setIsProcessingPayment(true)
    //     setIsBookingConfirmed(true)
    //     navigate("/booking-success")
    //     // setTimeout(() => {
    //     //     setIsProcessingPayment(false)
    //     //     setIsBookingConfirmed(true)
    //     //     onConfirm()
    //     // }, 3000)
    // }

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    // useEffect(() => {
    //     if (isBookingConfirmed) {
    //         navigate("/booking-success")
    //     }
    // }, [true, navigate])

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])


    return (
        <div className="row">
            <div className="col-md-6"></div>
            <div className="card card-body mt-5">
                <h4 className="card-title hotel-color">Бронирование</h4>

                <p>
                    ФИО: <strong>{booking.clientFullName}</strong>
                </p>
                <p>
                    Почта: <strong>{booking.clientEmail}</strong>
                </p>

                <div>
                    <h5 className="hotel-color">Количество туристов</h5>
                    <strong>
                        Всего: {booking.bookingCount}
                    </strong>
                </div>

                {payment > 0 ? (
                    <>
                        <p>
                            Итоговая сумма: <strong>{payment} руб.</strong>
                        </p>

                        {isFormValid && !isBookingConfirmed ? (
                            <Button variant="success" onClick={handleConfirmBooking}>
                                {isProcessingPayment ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm mr-2"
                                            role="status"
                                            aria-hidden="true"></span>
                                        Бронирование подтверждается
                                    </>
                                ) : (
                                    "Подтвердить бронирование"
                                )}
                            </Button>
                        ) : isBookingConfirmed ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    {/* <span className="sr-only">Загрузка...</span> */}
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p className="text-danger">Ошибка</p>
                )}

            </div>
        </div>
    )
}

export default BookingSummary