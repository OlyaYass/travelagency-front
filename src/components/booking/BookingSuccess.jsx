import React from "react"
import { Link, useLocation } from "react-router-dom"

const BookingSuccess = () => {
    const location = useLocation()
    // const message = true
    // console.log(message)
    const message = location.state?.message
    const error = location.state?.error
    return (
        <div className="container">
            {/* <Header title="Бронирование успешно" /> */}
            <div className="mt-5">
                {message ? (
                    <div>
                        <h3 className="text-success">Бронирование успешно!</h3>
                        <p className="text-success">{message}</p>
                    </div>
                ) : (
                    <div>
                        {/* <h3 className="text-danger">Ошибка бронирования!</h3>
                        <p className="text-danger">{error}</p> */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookingSuccess