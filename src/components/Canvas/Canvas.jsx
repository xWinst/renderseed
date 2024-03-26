import { useState, useEffect, useRef, useCallback } from "react";
import { ProgressBar, Aside } from "components";
// import { useEventSystem } from "hooks";
import { loadUnity } from "services";

let canvasCount = 0;
let renderCount = 0;
let effectCount = 0;

const Canvas = (unityProps) => {
    const [unity, setUnity] = useState();
    const [functions, setFunctions] = useState();
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // const { addEventListener, removeEventListener } = useEventSystem();
    const canvas = useRef();
    const id = "canvas-" + ++canvasCount;

    const onLoadUnity = useCallback((unity) => {
        setUnity(unity);
        setFunctions({ sendMessage: unity.SendMessage });
    }, []);

    useEffect(() => {
        console.log("effectCount: ", ++effectCount);
        if (unity) setTimeout(() => setIsLoaded(true), 2000);
        else loadUnity(canvas.current, onLoadUnity, setProgress);
    }, [unity, onLoadUnity]);

    useEffect(() => {
        const resize = () => {
            canvas.current.width = window.innerWidth;
            canvas.current.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);

        return () => {
            window.addEventListener("resize", resize);
        };
    }, []);

    const item = () => {
        return <p style={{ position: "absolute" }}>H - hide/show menu</p>;
    };

    console.log("renderCount: ", ++renderCount);
    return (
        <>
            {!unity && <ProgressBar percent={progress * 100} />}
            {isLoaded && <Aside functions={functions} />}
            {item()}
            <canvas id={id} ref={canvas} />
        </>
    );
};

export default Canvas;
