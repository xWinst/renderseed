let eventListeners = [];

export const addEventListener = (eventName, callback) => {
    eventListeners.push({ eventName, callback });
};

export const removeEventListener = (eventName) => {
    eventListeners = eventListeners.filter(
        (eventListener) => eventListener.eventName !== eventName
    );
};

const dispatchEvent = (eventName, ...parameters) => {
    const listener = eventListeners.find((listener) => listener.eventName === eventName);
    if (listener) return listener.callback(...parameters);
    else console.warn(`Event "${eventName}" not found`);
};

window.dispatchReactUnityEvent = (eventName, ...params) => dispatchEvent(eventName, ...params);
