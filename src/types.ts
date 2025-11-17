// Üründeki rozetler
export type DishBadge =
    | "Çok Satan"
    | "Yeni"
    | "İndirim"
    | "Şefin Önerisi"
    | "Popüler"
    | "Vegan"
    | "Fit"
    | "Acılı";

// Ekstra seçenek tipi
export type DishExtra = {
    id: string;
    name: string;
    price: number;
};

// Menü ürünü
export type Dish = {
    id: string;
    name: string;
    price: number;
    image: string;        // emoji veya URL
    category: string;

    description?: string;
    kcal?: number;
    rating?: number;
    ratingCount?: number;
    prepTime?: string;    // "10-15 dk"

    badges?: DishBadge[];
    extras?: DishExtra[];

    isRecommended?: boolean;
    isAvailable?: boolean;
};

// Sepette tutulacak ürün tipi (Dish + seçilen ekstralar + total)
export type CartItem = Dish & {
    selectedExtras?: { id: string; name: string; price: number; count: number }[];
    totalPrice?: number;
};
