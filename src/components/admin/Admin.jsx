import React from "react"
import { Link } from "react-router-dom"

const Admin = () => {
    return (
        <section className="container mt-5">
            <h2>Панель администратора</h2>
            <hr />
            <Link to={"/existing-tours"}>Управление турами</Link> <br />
            <Link to={"/existing-bookings"}>Управление бронированиями</Link> <br />

            {/* <Link to={"/existing-tours"}>Управление бронированиями</Link> */}
        </section>
    )
}

export default Admin