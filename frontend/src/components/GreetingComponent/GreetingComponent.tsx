import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const GreetingComponent = ({ greeting }: { greeting: string }) => {
    const navigate = useNavigate();
    // tells typescript to check for valid css properties.
    const [style, ] = useState<React.CSSProperties>({
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom, green, limegreen, palegoldenrod)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2em",
        textAlign: "center",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
    });

    const [buttonStyle,] = useState<React.CSSProperties>({
        textAlign: "center",
        border: "5px solid #5E4C8B",
        padding: "1em",
        borderRadius: "2em",
        cursor: "pointer",
        fontSize: "1.5em",
        backgroundColor: "rgba(255,255,255,0)",
        color: "#5E4C8B"

    });

    const [h1Style, setH1Style] = useState<React.CSSProperties>({
        fontWeight: "boldest",
        marginTop: "2em",
        border: "5px solid #5E4C8B",
        padding: "1em",
        borderRadius: "1em",
        color: " #5E4C8B",
        backgroundColor: "rgba(255,255,255,0)",
        cursor: 'pointer'
    });


    useEffect(() => {

    }, [style.color]);

    const greetingClick = (e: any) => {
        e.preventDefault();
        // Make a copy of the style object and modify the copy,
        // TSX doesn't like mutating the style object directly;
        const newStyle = { ...h1Style };
        if (newStyle.color === "#5E4C8B") {
            newStyle.color = "palegoldenrod";
        } else {
            newStyle.color = "#5E4C8B";
        }
        setH1Style(newStyle);
    };

    const loginClick = (e: any) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <div style={style}>
            <h1 onClick={greetingClick} style={h1Style}>
                {greeting} from kiwi lemonade! 🥝 🍋 <br />
                A starter template, built on: <br />
                MongoDB Atlas, Koa, React, Node, Docker, TS & JS
            </h1>
            <button className="login-portal" onClick={loginClick} style={buttonStyle}>click to login to the application</button>
        </div>
    );
}
