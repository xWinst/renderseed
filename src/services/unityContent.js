// function unityShowBanner(msg, type) {
//     function updateBannerVisibility() {
//         warningBanner.style.display = warningBanner.children.length ? "block" : "none";
//     }
//     var div = document.createElement("div");
//     div.innerHTML = msg;
//     warningBanner.appendChild(div);
//     if (type == "error") div.style = "background: red; padding: 10px;";
//     else {
//         if (type == "warning") div.style = "background: yellow; padding: 10px;";
//         setTimeout(function () {
//             warningBanner.removeChild(div);
//             updateBannerVisibility();
//         }, 5000);
//     }
//     updateBannerVisibility();
// }

// import

// import * as createUnityInstance from "unity/Web.loader.js";

const loaderUrl = "unity/Web.loader.js";
const config = {
    dataUrl: "unity/Web.data",
    frameworkUrl: "unity/Web.framework.js",
    codeUrl: "unity/Web.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "MyCompany",
    productName: "MyProduct",
    productVersion: "0.1",
    showBanner: () => {
        console.log("Show Banner");
    },
};

export const loadUnity = (canvas, setUnity, setProgress) => {
    const script = document.createElement("script");
    script.src = loaderUrl;

    script.onload = (e) => {
        window
            .createUnityInstance(canvas, config, setProgress)
            .then(setUnity)
            .catch((message) => {
                alert(message);
            });
    };
    document.body.appendChild(script);
};
