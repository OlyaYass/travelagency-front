import React, { useEffect, useState } from "react"
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunctions"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{ id: "", name: "" }]
    })

    const [bookings, setBookings] = useState([
        {
            bookingId: "",
            tour: { id: "", tourName: "", tourPrice: "" },
            bookingConfirmationCode: ""
        }
    ])
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token)
                setUser(userData)
            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
    }, [userId])

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByUserId(userId, token)
                setBookings(response)
            } catch (error) {
                console.error("Error fetching bookings:", error.message)
                setErrorMessage(error.message)
            }
        }

        fetchBookings()
    }, [userId])

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Вы уверены, что хотите удалить аккаунт?"
        )
        if (confirmed) {
            await deleteUser(userId)
                .then((response) => {
                    setMessage(response.data)
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                    localStorage.removeItem("userRole")
                    navigate("/")
                    window.location.reload()
                })
                .catch((error) => {
                    setErrorMessage(error.data)
                })
        }
    }

    return (
        <div className="container">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {message && <p className="text-danger">{message}</p>}
            {user ? (
                <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
                    <h4 className="card-title text-center">Информация о пользователе</h4>
                    <div className="card-body">
                        <div className="col-md-10 mx-auto">
                            <div className="card mb-3 shadow">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div className="d-flex justify-content-center align-items-center mb-4">
                                            <img
                                                src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                                alt="Profile"
                                                className="rounded-circle"
                                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-10">
                                        <div className="card-body">
                                            {/* <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">ID:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.id}</p>
                                                </div>
                                            </div>
                                            <hr /> */}

                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Имя:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.firstName}</p>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Фамилия:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.lastName}</p>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Почта:</label>
                                                <div className="col-md-10">
                                                    <p className="card-text">{user.email}</p>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="form-group row">
                                                <label className="col-md-2 col-form-label fw-bold">Роль:</label>
                                                <div className="col-md-10">
                                                    <ul className="list-unstyled">
                                                        {user.roles.map((role) => (
                                                            <li key={role.id} className="card-text">
                                                                {role.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className="card-title text-center">Бронирования:</h4>

                            {bookings.length > 0 ? (
                                <table className="table table-bordered table-hover shadow">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID бронирования</th>
                                            <th scope="col">ID тура</th>
                                            <th scope="col">Название тура</th>
                                            <th scope="col">Цена тура</th>
                                            <th scope="col">Код бронирования</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking, index) => (
                                            <tr key={index}>
                                                <td>{booking.bookingId}</td>
                                                <td>{booking.tour.id}</td>
                                                <td>{booking.tour.tourName}</td>
                                                <td>{booking.tour.tourPrice}</td>
                                                <td>{booking.bookingConfirmationCode}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>У вас еще нет бронирований.</p>
                            )}

                            <div className="d-flex justify-content-center">
                                <div className="mx-2">
                                    <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                                        Удалить аккаунт
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Загрузка данных пользователя...</p>
            )}
        </div>
    )
}

export default Profile