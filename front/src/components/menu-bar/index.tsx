import { menuLinks } from "@/libs/utils/constants";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./index.css";

export default function MenuBar() {
    const { t } = useTranslation("menu");

    return (
        <Stack gap={3} direction="horizontal" className="d-none d-md-flex ps-3">
            {menuLinks.map(item => <NavLink key={item} to={`/${item == "dishes" ? "" : item}`} className="text-decoration-none menu-bar-item text-light">
                {t(item)}
            </NavLink>)}
        </Stack>
    );
}