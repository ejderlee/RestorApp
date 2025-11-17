import React, { useState, useMemo } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Dish } from "../../types";
import { allThemes, ThemeName } from "../../theme/theme";
import { useThemeManager } from "../../hooks/useThemeManager";
import { useCategoryThemeAutoSwitch } from "../../hooks/useCategoryThemeAutoSwitch";
import { useCart } from "../../hooks/useCart";

import Header from "./Header";
import CategoriesSection, { CategoryType } from "./CategoriesSection";
import RecommendedSection from "./RecommendedSection";
import DishesGrid from "./DishesGrid";
import ThemeSelector from "./ThemeSelector";
import FloatingCartButton from "./FloatingCartButton";

import FadeScaleTransition from "./transitions/FadeScaleTransition";
import ConfettiBlast from "./transitions/ConfettiBlast";
import CartFooter from "../../components/CartFooter";

import { DISHES } from "../../data/dishes";
import DishDetailSheet from "./DishDetailSheet";

export default function MainScreen() {
    const insets = useSafeAreaInsets();

    // ------------------- THEME -------------------
    const {
        theme,
        themeName,
        changeTheme,
        fadeScaleStyle,
        confettiSignal,
    } = useThemeManager();

    // ------------------- CART --------------------
    const { items: cart, add, remove, clear, total } = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const openDishDetail = (d: Dish) => {
        setSelectedDish(d);
        setDetailOpen(true);
    };

    const addToCart = (dish: Dish) => {
        add(dish);
        setCartOpen(true);
    };

    // ------------------- CATEGORY ----------------
    const [category, setCategory] = useState<CategoryType>("Hepsi");

    useCategoryThemeAutoSwitch({
        category,
        changeTheme,
        autoSwitchEnabled: true,
    });

    // ------------------- FILTERED LIST -----------
    const filtered = useMemo(
        () => DISHES.filter((d) => category === "Hepsi" || d.category === category),
        [category]
    );

    const recommended = useMemo(
        () => DISHES.filter((d) => d.isRecommended),
        []
    );

    // ------------------- THEME SELECTOR ----------
    const [themeModalOpen, setThemeModalOpen] = useState(false);

    // ------------------- STATUS BAR --------------
    const statusBarStyle =
        themeName === "light" || themeName === "foodieFresh"
            ? "dark-content"
            : "light-content";

    // ------------------- UI ----------------------
    return (
        <View style={[styles.container, { backgroundColor: theme.bg }]}>
            <StatusBar barStyle={statusBarStyle} />

            {/* CONFETTI */}
            <ConfettiBlast signal={confettiSignal} />

            {/* THEME SELECTOR */}
            <ThemeSelector
                visible={themeModalOpen}
                onClose={() => setThemeModalOpen(false)}
                currentTheme={themeName}
                onSelect={(t) => changeTheme(t, true)}
            />

            {/* GLOBAL FADE-SCALE TRANSITION */}
            <FadeScaleTransition animatedStyle={fadeScaleStyle}>
                <>
                    {/* HEADER */}
                    <Header
                        theme={theme}
                        onOpenThemeSelector={() => setThemeModalOpen(true)}
                    />

                    {/* CATEGORY FILTER */}
                    <View style={{ marginTop: 8 }}>
                        <CategoriesSection
                            theme={theme}
                            selected={category}
                            onSelect={setCategory}
                        />
                    </View>

                    {/* RECOMMENDED SECTION */}
                    <RecommendedSection
                        theme={theme}
                        data={recommended}
                        onAdd={addToCart}
                        onPressCard={openDishDetail}
                    />

                    <DishesGrid
                        theme={theme}
                        data={filtered}
                        countLabel={`${filtered.length} ürün`}
                        onAdd={addToCart}
                        onPressCard={openDishDetail}
                    />

                </>
            </FadeScaleTransition>

            {/* FLOATING CART BUTTON */}
            <FloatingCartButton
                theme={theme}
                onPress={() => setCartOpen(!cartOpen)}
                itemCount={cart.length}
            />

            <DishDetailSheet
                visible={detailOpen}
                dish={selectedDish}
                theme={theme}
                onClose={() => setDetailOpen(false)}
                onAddToCart={(dish, extras) => {
                    add(dish, extras);
                    setCartOpen(true);
                }}
            />


            {/* CART FOOTER */}
            <CartFooter
                cart={cart}
                onRemove={remove}
                theme={theme}
                open={cartOpen && cart.length > 0}
                onClose={() => setCartOpen(false)}
                onPayment={() => {
                    clear();
                    setCartOpen(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
