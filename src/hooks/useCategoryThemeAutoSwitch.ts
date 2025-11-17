import { useEffect, useRef } from "react";
import { ThemeName } from "../theme/theme";

type Category = string;

interface Params {
    category: Category;
    changeTheme: (t: ThemeName, fireConfetti?: boolean) => void;
    autoSwitchEnabled?: boolean;
}

/**
 * Kategori değiştikçe temayı otomatik atan hook.
 * Sushi → asianFusion
 * Burger → gourmetDark
 * Pizza → italianBistro
 * Sağlıklı → foodieFresh
 * Atıştırmalık → modernNeutral
 * Hepsi → dark
 */
export function useCategoryThemeAutoSwitch({
                                               category,
                                               changeTheme,
                                               autoSwitchEnabled = true,
                                           }: Params) {
    const lastCategory = useRef<Category | null>(null);

    useEffect(() => {
        if (!autoSwitchEnabled) return;

        if (lastCategory.current === category) return;
        lastCategory.current = category;

        let newTheme: ThemeName = "dark";

        switch (category) {
            case "Sushi":
                newTheme = "asianFusion";
                break;
            case "Burger":
                newTheme = "gourmetDark";
                break;
            case "Pizza":
                newTheme = "italianBistro";
                break;
            case "Sağlıklı":
                newTheme = "foodieFresh";
                break;
            case "Atıştırmalık":
                newTheme = "modernNeutral";
                break;
            case "Hepsi":
            default:
                newTheme = "dark";
        }

        // Tema değiştir
        changeTheme(newTheme, false); // konfeti yok — kategori temasında patlamasın
    }, [category, autoSwitchEnabled, changeTheme]);
}
