import { useCallback, useEffect, useRef } from "react";

const mountedEventDispatchers = [];

const dispatchReactUnityEvent = (eventName, ...parameters) => {
    // Loops through all of the mounted event systems and dispatches the event.
    // In case there are multiple event systems, the return value origin is
    // undefined.
    let returnValue;
    mountedEventDispatchers.forEach((dispatchEvent) => {
        returnValue = dispatchEvent(eventName, ...parameters);
    });
    return returnValue;
};
window.dispatchReactUnityEvent = dispatchReactUnityEvent;

const useEventSystem = () => {
    const eventListeners = useRef([]);
    const addEventListener = useCallback(
        (eventName, callback) => {
            // eventListeners.current = [...eventListeners.current, { eventName, callback }];
            eventListeners.current.push({ eventName, callback });
        },
        [eventListeners]
    );

    // const addEventListener = (eventName, callback) => {
    //     eventListeners.current.push({ eventName, callback });
    // };

    const removeEventListener = useCallback(
        (eventName, callback) => {
            eventListeners.current = eventListeners.current.filter(
                (eventListener) =>
                    eventListener.eventName !== eventName && eventListener.callback !== callback
            );
        },
        [eventListeners]
    );

    // const removeEventListener = (eventName) => {
    //     eventListeners.current = eventListeners.current.filter(
    //         (eventListener) => eventListener.eventName !== eventName
    //     );
    // };

    const dispatchEvent = useCallback(
        (eventName, ...parameters) => {
            const eventListener = eventListeners.current.find(
                (eventListener) => eventListener.eventName === eventName
            );
            if (eventListener) return eventListener.callback(...parameters);
            else console.warn(`Event "${eventName}" not found`);
        },
        [eventListeners]
    );

    // Effect ensures that the dispatch event function is available to the
    // global array of event listeners. This allows the global method to dispatch
    // events within the event system hooks.
    useEffect(() => {
        mountedEventDispatchers.push(dispatchEvent);
        console.log("mountedEventDispatchers: ", mountedEventDispatchers);
        return () => {
            mountedEventDispatchers.splice(mountedEventDispatchers.indexOf(dispatchEvent), 1);
        };
    }, [dispatchEvent]);

    return {
        addEventListener,
        removeEventListener,
    };
};

export default useEventSystem;
