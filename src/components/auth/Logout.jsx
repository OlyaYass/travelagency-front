import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"

const Logout = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        navigate("/", { state: { message: " Вы вышли из своего аккаунта!" } })
    }

    return (
        <>
            <li>
                <Link className="dropdown-item" to={"/profile"}>
                    Профиль
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <button className="dropdown-item" onClick={handleLogout}>
                Выйти
            </button>
        </>
    )
}

export default Logout