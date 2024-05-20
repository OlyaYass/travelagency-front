import React, { useState, useEffect } from "react"
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions"
import Header from "../common/Header"
import BookingsTable from "./BookingsTable"

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setTimeout(() => {
            getAllBookings()
                .then((data) => {
                    setBookingInfo(data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    setError(error.message)
                    setIsLoading(false)
                })
        }, 1000)
    }, [])

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            const data = await getAllBookings()
            setBookingInfo(data)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <h3>Существующие бронирования</h3>
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div>Загрузка...</div>
            ) : (
                <BookingsTable
                    bookingInfo={bookingInfo}
                    handleBookingCancellation={handleBookingCancellation}
                />
            )}
        </section>
    )
}

export default Bookings