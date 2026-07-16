import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frLargeSearchButton from "./locales/fr/large-search-button.json";
import engLargeSearchButton from "./locales/eng/large-search-button.json";
import frUserButtonMenu from "./locales/fr/user-button-menu.json";
import engUserButtonMenu from "./locales/eng/user-button-menu.json";
import frMenu from "./locales/fr/menu.json";
import engMenu from "./locales/eng/menu.json";
import frSignOutModal from "./locales/fr/sign-out-modal.json";
import engSignOutModal from "./locales/eng/sign-out-modal.json";
import frSignInModal from "./locales/fr/sign-in-modal.json";
import engSignInModal from "./locales/eng/sign-in-modal.json";
import frDishes from "./locales/fr/dishes/index.json";
import engDishes from "./locales/eng/dishes/index.json";
import frTables from "./locales/fr/tables/index.json";
import engTables from "./locales/eng/tables/index.json";
import frTable from "./locales/fr/tables/unique/index.json";
import engTable from "./locales/eng/tables/unique/index.json";
import frOrders from "./locales/fr/orders/index.json";
import engOrders from "./locales/eng/orders/index.json";

i18n.use(initReactI18next)
    .init({
        resources: {
            fr: {
                largeSearchButton: frLargeSearchButton,
                userButtonMenu: frUserButtonMenu,
                menu: frMenu,
                signOutModal: frSignOutModal,
                signInModal: frSignInModal,
                dishes: frDishes,
                tables: frTables,
                table: frTable,
                orders: frOrders
            },
            eng: {
                largeSearchButton: engLargeSearchButton,
                userButtonMenu: engUserButtonMenu,
                menu: engMenu,
                signOutModal: engSignOutModal,
                signInModal: engSignInModal,
                dishes: engDishes,
                tables: engTables,
                table: engTable,
                orders: engOrders
            }
        },
        fallbackLng: "fr",
        defaultNS: "common"
    });

export default i18n;