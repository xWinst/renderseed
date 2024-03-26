import { useState } from "react";
import { textures } from "textures";
import { colors } from "settings";
import s from "./Panel.module.css";

const Panel = () => {
    const [settings, setSettings] = useState({
        color: null,
        texture: null,
        intensity: 0.8,
        ambient: 0.78,
        sun: 0.6,
        coeff: 20,
    });

    const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
    // const [intesity, setIntensity] = useState(1);

    const changeProp = (name, value) => {
        console.log("value: ", value);
        setSettings((prev) => ({ ...prev, [name]: value }));
        const param = name === "texture" ? value.name : value;
        // console.log("value.name: ", value.name);
        // console.log("value: ", value);
        document.body.dispatchEvent(new CustomEvent(name, { detail: { [name]: param } }));
    };

    const changeLight = (e) => {
        const { name, value } = e.target;
        changeProp(name, value);
    };

    const setColor = (e) => {
        const { name, value } = e.target;
        setRgb((prev) => ({ ...prev, [name]: Number(value) }));
    };

    return (
        <div>
            <p className={s.prop}>Intensity</p>
            <div className={s.prop}>
                <p className={s.p}>Sun</p>
                <div className={s.flexBox}>
                    <input
                        type="range"
                        name="sun"
                        min={0}
                        max={2}
                        step={0.01}
                        value={settings.sun}
                        onChange={changeLight}
                    />
                    <span>{settings.sun}</span>
                </div>
            </div>

            <div className={s.prop}>
                <p className={s.p}>Bulbs</p>
                <div className={s.flexBox}>
                    <input
                        type="range"
                        name="intensity"
                        min={0}
                        max={2}
                        step={0.01}
                        value={settings.intensity}
                        onChange={changeLight}
                    />
                    <p>{settings.intensity}</p>
                </div>
            </div>

            <div className={s.prop}>
                <p className={s.p}>Bloom</p>
                <div className={s.flexBox}>
                    <input
                        type="range"
                        name="coeff"
                        min={0}
                        max={50}
                        value={settings.coeff}
                        onChange={changeLight}
                    />
                    <p>{settings.coeff}</p>
                </div>
            </div>

            <div className={s.prop}>
                <p className={s.p}>Ambient</p>
                <div className={s.flexBox}>
                    <input
                        type="range"
                        name="ambient"
                        min={0}
                        max={1}
                        step={0.01}
                        value={settings.ambient}
                        onChange={changeLight}
                    />
                    <p>{settings.ambient}</p>
                </div>
            </div>

            <div className={s.prop}>
                <p>Color</p>
                <ul className={s.colorList}>
                    {colors.map((color) => (
                        <li
                            className={color === settings.color ? s.active : s.item}
                            key={color}
                            onClick={() => changeProp("color", color)}
                        >
                            <div className={s.color} style={{ backgroundColor: color }}></div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={s.prop}>
                <p>Custom color</p>
                <div className={s.flexBox}>
                    <p>R </p>
                    <input type="range" name="r" max={255} value={rgb.r} onChange={setColor} />
                    <p>{rgb.r}</p>
                </div>
                <div className={s.flexBox}>
                    <p>G </p>
                    <input type="range" name="g" max={255} value={rgb.g} onChange={setColor} />
                    <p>{rgb.g}</p>
                </div>
                <div className={s.flexBox}>
                    <p>B </p>
                    <input type="range" name="b" max={255} value={rgb.b} onChange={setColor} />
                    <p>{rgb.b}</p>
                </div>
                <div
                    className={
                        `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` === settings.color ? s.active : s.item
                    }
                    onClick={() => changeProp("color", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                >
                    <div
                        className={s.color}
                        style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
                    ></div>
                </div>
            </div>

            <div className={s.prop}>
                <p>Texture</p>
                <ul className={s.colorList}>
                    {textures.map((image, i) => (
                        <li
                            className={image === settings.texture ? s.activeTexture : s.texture}
                            key={image.name}
                            onClick={() => changeProp("texture", image)}
                        >
                            <img src={image.img} width={60} alt="" />
                        </li>
                    ))}
                    <li
                        className={"empty" === settings.texture?.name ? s.activeTexture : s.texture}
                        onClick={() => changeProp("texture", { name: "empty" })}
                    >
                        <p className={s.p}>No texture</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Panel;
