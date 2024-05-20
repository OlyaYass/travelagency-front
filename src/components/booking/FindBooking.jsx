import React, { useState } from "react"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [bookingInfo, setBookingInfo] = useState({
        bookingId: "",
        bookingConfirmationCode: "",
        tour: { id: "", tourName: "", tourPrice: "" },
        tourNumber: "",
        clientFullName: "",
        clientEmail: "",
        bookingCount: "",
    })

    const emptyBookingInfo = {
        bookingId: "",
        bookingConfirmationCode: "",
        tour: { id: "", tourName: "", tourPrice: "" },
        tourNumber: "",
        clientFullName: "",
        clientEmail: "",
        bookingCount: "",
    }
    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(emptyBookingInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }

        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            setIsDeleted(true)
            setSuccessMessage("Бронирование отменено успешно!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
            setError(null)
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center mb-4">Найти мои бронирования</h2>
                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Номер бронирования"
                        />

                        <button type="submit" className="btn btn-hotel input-group-text">
                            Найти
                        </button>
                    </div>
                </form>

                {isLoading ? (
                    <div>Ищем ваши бронирования...</div>
                ) : error ? (
                    <div className="text-danger">Ошибка: бронирования не найдены</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Информация по бронированию</h3>
                        <p className="text-success">Номер бронирования: {bookingInfo.bookingConfirmationCode}</p>
                        {/* <p>Номер : {bookingInfo.room.id}</p> */}
                        <p>Название тура: {bookingInfo.tour.tourName}</p>
                        <p>Цена тура: {bookingInfo.tour.tourPrice}</p>
                        <p>ФИО: {bookingInfo.clientFullName}</p>
                        {/* <p>Электронная почта: {bookingInfo.clientEmail}</p> */}
                        <p>Количество броней: {bookingInfo.bookingCount}</p>


                        {!isDeleted && (
                            <button
                                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
                                className="btn btn-danger">
                                Отменить бронирование
                            </button>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}

                {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
            </div>
        </>
    )
}

export default FindBooking