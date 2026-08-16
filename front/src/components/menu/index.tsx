import MenuItem from "@/components/menu/menu-item";
import { Offcanvas, Stack } from "react-bootstrap";
import "./menu.css";
import { useTranslation } from "react-i18next";
import { menuLinks } from "@/libs/utils/constants";

type Props = {
    show: boolean;
    onHide: () => void;
};

export default function Menu({ show, onHide } : Props) {
    const { t } = useTranslation("menu");

    return (
        <Offcanvas show={show} onHide={onHide} className="menu">
            <Offcanvas.Header closeButton className="fw-bold fs-5 text-bg-success" closeVariant="white">
                Commendo
            </Offcanvas.Header>
            <Offcanvas.Body className="pt-0">
                <Stack direction="vertical">
                    {menuLinks.map(option => <MenuItem key={option} to={`/${option == "dishes" ? "" : option}`} title={t(option)}/>)}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}