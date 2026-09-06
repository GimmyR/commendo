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
import frIngredients from "./locales/fr/ingredients/index.json";
import engIngredients from "./locales/eng/ingredients/index.json";
import frCommon from "./locales/fr/common.json";
import engCommon from "./locales/eng/common.json";

i18n.use(initReactI18next)
    .init({
        resources: {
            fr: {
                navbar: frNavBar,
                menu: frMenu,
                dishes: frDishes,
                tables: frTables,
                table: frTable,
                orders: frOrders,
                ingredients: frIngredients,
                common: frCommon
            },
            eng: {
                navbar: engNavBar,
                menu: engMenu,
                dishes: engDishes,
                tables: engTables,
                table: engTable,
                orders: engOrders,
                ingredients: engIngredients,
                common: engCommon
            }
        },
        fallbackLng: "fr",
        defaultNS: "common"
    });

export default i18n;