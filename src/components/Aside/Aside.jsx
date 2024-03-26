import { useState, useEffect, useCallback } from "react";
import { Panel } from "components";
import { addEventListener, removeEventListener } from "services";
import s from "./Aside.module.css";

const Aside = ({ functions }) => {
    const [name, setName] = useState();
    const [showMenu, setShowMenu] = useState();
    const { sendMessage } = functions;

    const toggleMenu = useCallback((event) => {
        if (event.code === "KeyH") {
            setShowMenu((prev) => !prev);
        }
    }, []);

    const setColor = useCallback(
        (event) => {
            const { color } = event.detail;
            if (name) sendMessage("RoomController", "setColor", JSON.stringify({ name, color }));
        },
        [name, sendMessage]
    );
    const setIntensity = useCallback(
        (event) => {
            const { intensity } = event.detail;
            // console.log("intensity: ", intensity);
            sendMessage("RoomController", "setIntensity", Number(intensity));
        },
        [sendMessage]
    );

    const setAmbient = useCallback(
        (event) => {
            const { ambient } = event.detail;
            // console.log("ambient: ", ambient);
            sendMessage("RoomController", "setAmbient", Number(ambient));
        },
        [sendMessage]
    );

    const setSun = useCallback(
        (event) => {
            const { sun } = event.detail;
            sendMessage("RoomController", "setSunIntensity", Number(sun));
        },
        [sendMessage]
    );

    const setCoeff = useCallback(
        (event) => {
            const { coeff } = event.detail;
            sendMessage("RoomController", "setEmmissiveCoeff", Number(coeff));
        },
        [sendMessage]
    );

    const setTexture = useCallback(
        (event) => {
            const { texture } = event.detail;
            if (name)
                sendMessage("RoomController", "setTexture", JSON.stringify({ name, texture }));
        },
        [name, sendMessage]
    );

    useEffect(() => {
        document.body.addEventListener("color", setColor);
        document.body.addEventListener("intensity", setIntensity);
        document.body.addEventListener("texture", setTexture);
        document.body.addEventListener("ambient", setAmbient);
        document.body.addEventListener("sun", setSun);
        document.body.addEventListener("coeff", setCoeff);
        window.addEventListener("keydown", toggleMenu);
        addEventListener("picker", setName);
        return () => {
            document.body.removeEventListener("color", setColor);
            document.body.removeEventListener("intensity", setIntensity);
            document.body.removeEventListener("texture", setTexture);
            document.body.removeEventListener("ambient", setAmbient);
            document.body.removeEventListener("sun", setSun);
            document.body.removeEventListener("coeff", setCoeff);
            window.removeEventListener("keydown", toggleMenu);
            removeEventListener("picker", setName);
        };
    }, [setColor, setTexture, setName, toggleMenu, setIntensity, setAmbient, setSun, setCoeff]);

    return (
        <aside className={showMenu ? s.asideActive : s.aside}>
            <div className={s.container}>
                <p>Selected Object:</p>
                <p className={s.name}>{name}</p>
            </div>
            <Panel />

            <div className={s.text}>
                <p>
                    Camera rotation: mouse movement while holding down the left mouse button or the
                    “Q”, “E”, “R”, “F” keys.
                </p>
                <p>
                    Camera movement: mouse movement while holding down the right mouse button or the
                    “Left Shift”, “A”, “Left Ctrl”, “D” keys.
                </p>
                <p>Zoom: mouse wheel or "W", "S" keys.</p>
            </div>
        </aside>
    );
};

export default Aside;
