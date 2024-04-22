import { useEffect } from 'react';

const useGoogleTranslateScript = () => {
    useEffect(() => {
        const scriptId = 'google-translate-script';
        if (document.getElementById(scriptId)) return; // script already added

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
    }, []);
};

export default useGoogleTranslateScript;
