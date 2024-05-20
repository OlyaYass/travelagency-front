import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddTour from './components/tour/AddTour'
import ExistingTours from './components/tour/ExistingTours'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import EditTour from './components/tour/EditTour'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import TourListing from './components/tour/TourListing'
import Admin from './components/admin/Admin'
import Checkout from './components/booking/Checkout'
import BookingSuccess from './components/booking/BookingSuccess'
import Bookings from './components/booking/Bookings'
import FindBooking from './components/booking/FindBooking'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'
import Profile from './components/auth/Profile'
import Logout from './components/auth/Logout'
import { AuthProvider } from './components/auth/AuthProvider'
import RequireAuth from "./components/auth/RequireAuth"

function App() {

  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/edit-tour/:tourId" element={<EditTour />}></Route>
            <Route path="/existing-tours" element={<ExistingTours />}></Route>
            <Route path="/add-tour" element={<AddTour />}></Route>


            <Route
              path="/book-tour/:tourId"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }>

            </Route>


            <Route path="/browse-all-tours" element={<TourListing />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/booking-success" element={<BookingSuccess />}></Route>
            <Route path="/existing-bookings" element={<Bookings />}></Route>
            <Route path="/find-booking" element={<FindBooking />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Registration />}></Route>

            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>


          </Routes>
        </Router>

        <Footer />
      </main>
    </AuthProvider>
  )
}

export default App
