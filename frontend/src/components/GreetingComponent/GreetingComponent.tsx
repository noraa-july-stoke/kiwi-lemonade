import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GreetingComponent = ({greeting} : {greeting: string}) => {
    const navigate = useNavigate();
    // tells typescript to check for valid css properties.
    const [style, setStyle] = useState<React.CSSProperties>({
        height: "100vh",
        width: "100%",
        backgroundColor: "limegreen",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        cursor: "pointer"
    });

    const [buttonStyle,] = useState<React.CSSProperties>({
        width: "100%",
        backgroundColor: "limegreen",
        textAlign: "center",
        cursor: "pointer",
        border: "2px solid white",
        padding: "1em",
        borderRadius: "2em",
        color: "white"
    });

    useEffect(() => {

    }, [style.color]);

    const greetingClick = (e: any) => {
        e.preventDefault();
        // Make a copy of the style object and modify the copy,
        // TSX doesn't like mutating the style object directly;
        const newStyle = { ...style };
        if (newStyle.color === "white") {
            newStyle.color = "yellow";
        } else {
            newStyle.color = "white";
        }
        setStyle(newStyle);
    };

    const loginClick = (e: any) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <div style={style}>
            <h1 onClick={greetingClick}>
                {greeting} from kiwi lemonade! 🥝 🍋, <br />
                A starter template, built on: <br />
                MongoDB Atlas, Koa, React, Node, Docker, TS & JS
            </h1>
            <button onClick={loginClick} style={buttonStyle}>click to login to the application</button>
        </div>
    );

}
