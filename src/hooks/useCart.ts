import { useMemo, useState } from "react";
import { Dish, CartItem } from "../types";

type ExtrasMap = Record<string, number>; // { extraId: count }

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);

    // Ürünü sepete ekle (opsiyonel olarak ekstralarla birlikte)
    const add = (dish: Dish, extras?: ExtrasMap) => {
        let selectedExtras: CartItem["selectedExtras"] = [];
        let extrasPrice = 0;

        if (extras && dish.extras) {
            selectedExtras = dish.extras
                .filter((ex) => (extras[ex.id] ?? 0) > 0)
                .map((ex) => ({
                    id: ex.id,
                    name: ex.name,
                    price: ex.price,
                    count: extras[ex.id],
                }));

            extrasPrice = selectedExtras.reduce(
                (sum, e) => sum + e.price * e.count,
                0
            );
        }

        const newItem: CartItem = {
            ...dish,
            selectedExtras,
            totalPrice: dish.price + extrasPrice,
        };

        setItems((prev) => [...prev, newItem]);
    };

    const remove = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const clear = () => {
        setItems([]);
    };

    const total = useMemo(
        () => items.reduce((sum, d) => sum + (d.totalPrice ?? d.price), 0),
        [items]
    );

    return { items, add, remove, clear, total };
}
