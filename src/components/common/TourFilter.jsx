import React, { useState } from "react"

const TourFilter = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedType = e.target.value
        setFilter(selectedType)

        const filteredTours = data.filter((tour) =>
            tour.tourName.toLowerCase().includes(selectedType.toLowerCase())
        )
        setFilteredData(filteredTours)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const tourNames = ["", ...new Set(data.map((tour) => tour.tourName))]

    return (
        <div className="input-group mb-3">
            {/* <span className="input-group-text" id="room-type-filter">
                Отсортировать туры по названию
            </span> */}
            <select
                className="form-select"
                aria-label="romm type filter"
                value={filter}
                onChange={handleSelectChange}>
                <option value="">Фильтр</option>
                {tourNames.map((name, index) => (
                    <option key={index} value={String(name)}>
                        {String(name)}
                    </option>
                ))}
            </select>
            <button className="btn btn-hotel" type="button" onClick={clearFilter}>
                Очистить фильтр
            </button>
        </div>
    )
}
export default TourFilter