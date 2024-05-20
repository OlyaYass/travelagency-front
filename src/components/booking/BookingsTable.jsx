// import { parseISO } from "date-fns"
import React, { BrowserRouter as Router, useState, useEffect, Link } from "react"

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

    return (
        <section className="p-4">
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ID бронирования</th>
                        <th>ID Тура</th>
                        <th>Название тура</th>
                        <th>ФИО</th>
                        <th>Email</th>
                        <th>Кол-во бронирований</th>
                        <th>Номер бронирвоания</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.id}>
                            <td>{index + 1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.tour.id}</td>
                            <td>{booking.tour.tourName}</td>
                            <td>{booking.clientFullName}</td>
                            <td>{booking.clientEmail}</td>
                            <td>{booking.bookingCount}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleBookingCancellation(booking.bookingId)}>
                                    Отмена
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBookings.length === 0 && <p> Бронирования не найдены</p>}
        </section>
    )
}

export default BookingsTable