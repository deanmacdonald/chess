import { useState, useEffect } from "react";

export const useTheme = (themeName = "light") => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        import(`../assets/themes/${themeName}.json`)
            .then((data) => setTheme(data))
            .catch(() => setTheme(null));
    }, [themeName]);

    return theme;
};
