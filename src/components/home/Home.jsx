import React, { useContext } from "react"
import MainHeader from "../layout/MainHeader"
import AgencyService from "../common/AgencyService"
import Parallax from "../common/Parallax"
// import RoomCarousel from "../common/RoomCarousel"
// import RoomSearch from "../common/RoomSearch"
// import { useLocation } from "react-router-dom"
// import { useAuth } from "../auth/AuthProvider"
const Home = () => {
    return (
        <section>
            {/* <h2>Быстрее бы уже этот курсач дописать...</h2> */}

            <MainHeader />

            {/* <section className="container">
                <Parallax />
                <AgencyService />
                <Parallax />
            </section> */}
        </section>
    )

    // const location = useLocation()

    // const message = location.state && location.state.message
    // const currentUser = localStorage.getItem("userId")
    // return (
    //     <section>
    //         {message && <p className="text-warning px-5">{message}</p>}
    //         {currentUser && (
    //             <h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
    //         )}
    //         <MainHeader />
    //         <div className="container">
    //             <RoomSearch />
    //             <RoomCarousel />
    //             <Parallax />
    //             <RoomCarousel />
    //             <HotelService />
    //             <Parallax />
    //             <RoomCarousel />
    //         </div>
    //     </section>
    // )
}

export default Home