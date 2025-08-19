import React, { useEffect } from 'react'

function useClickOutside(ref, handler) {

    function handleFocusOutside(event) {
        if (ref.current && !ref.current.contains(event.relatedTarget)) {
            handler(event);
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" ) {
          handler(event);
        }
    }

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        document.addEventListener("keydown", handleKeyDown);
        element.addEventListener("focusout", handleFocusOutside);
        return () => {
            element.removeEventListener("focusout", handleFocusOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    
    },[]);
}

export default useClickOutside