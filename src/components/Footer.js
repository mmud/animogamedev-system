import React,{useEffect} from 'react'
import "./footer.css"

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="sup">
                    <p className="s">Support us </p>
                    <a href="https://www.patreon.com/AnimoGamDev" target="_blank" rel="noreferrer"><p className="p">Patreon</p></a>
                </div>
                <p>
                    Copyright Animo site team 2021 - 2020
                </p>
                <div className="power">
                    <p className="p">POWERED BY</p>
                    <a href="https://www.facebook.com/moaaz.soliman.963871" target="_blank" rel="noreferrer"><p className="m">MOAAZ SOLIMAN</p></a>
                </div>
            </div>
        </footer>
    )
}
