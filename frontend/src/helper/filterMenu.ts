import type { FoodType } from '@/types/dashboard';

export const sortAlphabeticallyAscending = (menu: FoodType[]) => {
    return menu.sort((a, b) =>
        a.name.toUpperCase() < b.name.toUpperCase() ? -1 : a.name.toUpperCase() > b.name.toUpperCase() ? 1 : 0
    );
};

export const sortAlphabeticallyDescending = (menu: FoodType[]) => {
    return menu.sort((a, b) =>
        a.name.toUpperCase() > b.name.toUpperCase() ? -1 : a.name.toUpperCase() < b.name.toUpperCase() ? 1 : 0
    );
};

export const sortPriceAscending = (menu: FoodType[]) => {
    return menu.sort((a, b) => a.price - b.price);
};

export const sortPriceDescending = (menu: FoodType[]) => {
    return menu.sort((a, b) => b.price - a.price);
};

export const getFavorite = (menu: FoodType[]) => {
    return menu.filter((data) => data.isMerchantFavorite === true);
};

export const getSpicy = (menu: FoodType[]) => {
    return menu.filter((data) => data.isSpicy === true);
};

export const returnMenu = (menu: FoodType[], choice: string) => {
    if (parseInt(choice) === 0) return menu;
    if (parseInt(choice) === 1) return sortPriceAscending(menu);
    if (parseInt(choice) === 2) return sortPriceDescending(menu);
    if (parseInt(choice) === 3) return sortAlphabeticallyAscending(menu);
    if (parseInt(choice) === 4) return sortAlphabeticallyDescending(menu);
    if (parseInt(choice) === 5) return getFavorite(menu);
    if (parseInt(choice) === 6) return getSpicy(menu);
    return menu;
};
