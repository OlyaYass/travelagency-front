import React from "react"
import { Container } from "react-bootstrap"

const Parallax = () => {
    return (
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-content-center">
                <div className="animated-texts bounceIn">
                    <h1>
                        Посмотри все самые красивые места <span className="hotel-color">вместе с нами</span>
                    </h1>
                    <h3>Мы предлагаем лучшие варинаты путешествий по самым приятным ценам</h3>
                </div>
            </Container>
        </div>
    )
}

export default Parallax