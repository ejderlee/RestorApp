// --------------------------------------------------
// THEME TYPE
// --------------------------------------------------
export type AppTheme = {
    bg: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    subText: string;
    success: string;
    shadow: string;
    radius: number;
    cardBorder: string;
};

// Kullanılabilir tema isimleri:
export type ThemeName =
    | "light"
    | "dark"
    | "gourmetDark"
    | "foodieFresh"
    | "italianBistro"
    | "modernNeutral"
    | "asianFusion";

// --------------------------------------------------
// 🌞 DEFAULT LIGHT THEME
// --------------------------------------------------
export const lightTheme: AppTheme = {
    bg: "#f8f9fb",
    surface: "#ffffff",
    primary: "#ff6b6b",
    secondary: "#feca57",
    text: "#222222",
    subText: "#555555",
    success: "#1dd1a1",
    shadow: "rgba(0,0,0,0.12)",
    radius: 18,
    cardBorder: "rgba(0,0,0,0.06)",
};

// --------------------------------------------------
// 🌚 DEFAULT DARK THEME
// --------------------------------------------------
export const darkTheme: AppTheme = {
    bg: "#050714",
    surface: "#151826",
    primary: "#feca57",
    secondary: "#ff6b6b",
    text: "#ffffff",
    subText: "#9da3b4",
    success: "#1dd1a1",
    shadow: "rgba(0,0,0,0.45)",
    radius: 18,
    cardBorder: "rgba(255,255,255,0.04)",
};

// --------------------------------------------------
// 🥇 1 — GOURMET DARK (Premium restoran / UberEats)
// --------------------------------------------------
export const gourmetDark: AppTheme = {
    bg: "#0f1115",
    surface: "#1a1d23",
    primary: "#E4B34C",      // altın
    secondary: "#EFBF68",
    text: "#ffffff",
    subText: "#bfc3ce",
    success: "#4ade80",
    shadow: "rgba(0,0,0,0.55)",
    radius: 20,
    cardBorder: "rgba(255,255,255,0.05)",
};

// --------------------------------------------------
// 🥈 2 — FOODIE FRESH (Deliveroo / DoorDash tarzı)
// --------------------------------------------------
export const foodieFresh: AppTheme = {
    bg: "#f4f7fb",
    surface: "#ffffff",
    primary: "#0EA5E9",     // turkuaz
    secondary: "#22C55E",   // yeşil
    text: "#1f2937",
    subText: "#6b7280",
    success: "#22c55e",
    shadow: "rgba(0,0,0,0.15)",
    radius: 18,
    cardBorder: "rgba(0,0,0,0.06)",
};

// --------------------------------------------------
// 🍝 3 — ITALIAN BISTRO (Gurme pizzacı / bordo & altın)
// --------------------------------------------------
export const italianBistro: AppTheme = {
    bg: "#1A0808",
    surface: "#2B0A0A",
    primary: "#D4A373",  // sıcak altın
    secondary: "#E6B980",
    text: "#fff",
    subText: "#e5dddd",
    success: "#4ade80",
    shadow: "rgba(0,0,0,0.5)",
    radius: 20,
    cardBorder: "rgba(255,255,255,0.04)",
};

// --------------------------------------------------
// 🌫️ 4 — MODERN NEUTRAL (Apple tarzı minimal premium)
// --------------------------------------------------
export const modernNeutral: AppTheme = {
    bg: "#151515",
    surface: "#262626",
    primary: "#FF8A3D",   // modern turuncu
    secondary: "#FFB374",
    text: "#e5e5e5",
    subText: "#b3b3b3",
    success: "#4ade80",
    shadow: "rgba(0,0,0,0.6)",
    radius: 20,
    cardBorder: "rgba(255,255,255,0.05)",
};

// --------------------------------------------------
// 🍣 5 — ASIAN FUSION (Sushi / ramen restoranı modern)
// --------------------------------------------------
export const asianFusion: AppTheme = {
    bg: "#0F172A",
    surface: "#1E293B",
    primary: "#F472B6",  // pembe
    secondary: "#38BDF8", // turkuaz
    text: "#fff",
    subText: "#cbd5e1",
    success: "#4ade80",
    shadow: "rgba(0,0,0,0.55)",
    radius: 20,
    cardBorder: "rgba(255,255,255,0.04)",
};

// --------------------------------------------------
// 🎛️ TÜM TEMALAR — TEK OBJE
// --------------------------------------------------
export const allThemes: Record<ThemeName, AppTheme> = {
    light: lightTheme,
    dark: darkTheme,
    gourmetDark,
    foodieFresh,
    italianBistro,
    modernNeutral,
    asianFusion,
};
