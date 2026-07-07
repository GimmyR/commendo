import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frLargeSearchButton from "./locales/fr/large-search-button.json";
import engLargeSearchButton from "./locales/eng/large-search-button.json";
import frUserButtonMenu from "./locales/fr/user-button-menu.json";
import engUserButtonMenu from "./locales/eng/user-button-menu.json";

i18n.use(initReactI18next)
    .init({
        resources: {
            fr: {
                largeSearchButton: frLargeSearchButton,
                userButtonMenu: frUserButtonMenu
            },
            eng: {
                largeSearchButton: engLargeSearchButton,
                userButtonMenu: engUserButtonMenu
            }
        },
        fallbackLng: "fr",
        defaultNS: "common"
    });

export default i18n;