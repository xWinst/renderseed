import { useEffect, useState } from "react";
import s from "./ProgressBar.module.css";

const getDelta = (percent, lastValue) => Math.round((percent - lastValue) / 3) || 1;

const ProgressBar = ({ percent }) => {
    const [lastValue, setLastValue] = useState(0);
    const circumference = 140 * 2 * Math.PI;
    const offset = circumference - (lastValue / 100) * circumference;
    // console.log("delta: ", delta);

    useEffect(() => {
        if (lastValue < percent) setLastValue((prev) => prev + getDelta(percent, lastValue));
        console.log("getDelta(): ", getDelta(percent, lastValue));
    }, [lastValue, percent]);

    return (
        <div className={s.progressbar}>
            <svg width={320} height={320}>
                <circle
                    className={s.circle}
                    stroke="#0000ff"
                    strokeWidth={30}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    cx={160}
                    cy={160}
                    r={140}
                    fill="transparent"
                />

                <circle
                    stroke="#0000ff"
                    strokeWidth={3}
                    cx={160}
                    cy={160}
                    r={155}
                    fill="transparent"
                />

                <circle
                    stroke="#0000ff"
                    strokeWidth={3}
                    cx={160}
                    cy={160}
                    r={125}
                    fill="transparent"
                />
            </svg>
            {/* <p>Loading...</p> */}
            <p className={s.text}>
                Loading...
                <br /> {lastValue}%
            </p>
        </div>
    );
};

export default ProgressBar;
