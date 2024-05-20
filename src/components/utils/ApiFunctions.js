import axious from "axios"


export const api = axious.create({
    baseURL: "http://localhost:8080"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

export const getHeaderMulti = () => {
    const token = localStorage.getItem("token")
    console.log(token)
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
    }
}


// Функция добавляет новый тур в БД
export async function addTour(photo, tourName, tourPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("tourName", tourName)
    formData.append("tourPrice", tourPrice)

    const response = await api.post("/tours/add/new-tour", formData, {
        headers: getHeaderMulti()
    })
    if (response.status === 201) {
        return true
    } else {
        return false
    }
}


// Функция возвращает все типы туров из БД
export async function getTourNames() {
    try {
        const response = await api.get("/tours/tour/names")
        return response.data

    } catch (error) {
        throw new Error("Имя тура не найдено")
    }
}


// Функция возвращает все туры из БД
export async function getAllTours() {
    try {
        const result = await api.get("/tours/all-tours")
        return result.data
    } catch (error) {
        throw new Error("Туры не найдены")
    }
}

// Удаляет тур
export async function deleteTour(tourId) {
    try {
        const result = await api.delete(`/tours/delete/tour/${tourId}`, {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Ошибка удаления тура ${error.message}`)
    }
}

// Редактирование тура
export async function updateTour(tourId, tourData) {
    const formData = new FormData()
    formData.append("tourName", tourData.tourName)
    formData.append("tourPrice", tourData.tourPrice)
    formData.append("photo", tourData.photo)
    const response = await api.put(`/tours/update/${tourId}`, formData, {
        headers: getHeaderMulti()
    })
    return response
}

export async function getTourById(tourId) {
    try {
        const result = await api.get(`/tours/tour/${tourId}`)
        return result.data
    } catch (error) {
        throw new Error(`Тур не найден ${error.message}`)
    }
}

export async function bookTour(tourId, booking) {
    try {
        const response = await api.post(`/bookings/tour/${tourId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Ошибка бронирования тура : ${error.message}`)
        }
    }
}


export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Бронирования не найдены : ${error.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Бронирование не найдено : ${error.message}`)
        }
    }
}

export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Ошибка отмены бронирования :${error.message}`)
    }
}


export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch (error) {
        if (error.reeponse && error.response.data) {
            throw new Error(error.response.data)
        } else {
            // throw new Error(`Ошибка регистрации пользователя : ${error.message}`)
            throw new Error(`Такой пользователь уже существует`)
        }
    }
}

export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}


export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}


export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}


export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Ошибка поиска бронирований:", error.message)
        throw new Error("Бронирования не найдены")
    }
}