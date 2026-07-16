import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frNavBar from "./locales/fr/navbar/index.json";
import engNavBar from "./locales/eng/navbar/index.json";
import frMenu from "./locales/fr/menu.json";
import engMenu from "./locales/eng/menu.json";
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
                navbar: frNavBar,
                menu: frMenu,
                dishes: frDishes,
                tables: frTables,
                table: frTable,
                orders: frOrders
            },
            eng: {
                navbar: engNavBar,
                menu: engMenu,
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