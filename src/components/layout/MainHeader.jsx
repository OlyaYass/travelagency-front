import React from "react"

const MainHeader = () => {
    return (
        <header className="header-banner">
            <div className="overlay"></div>
            <div className="animated-texts overlay-content content1">
                <h1 className="main-name">
                    Добро пожаловать в наше <span className="hotel-color color1"> Туристическое агентство</span>
                </h1>
                {/* <h4>Лучшие туры и незабываемые впечатления</h4> */}
            </div>
        </header>
    )
}

export default MainHeader