import MenuItem from "@/components/menu/menu-item";
import { Offcanvas, Stack } from "react-bootstrap";
import "./menu.css";
import { useTranslation } from "react-i18next";

type Props = {
    show: boolean;
    onHide: () => void;
};

const links = [
    { href: "/", title: "dishes" },
    { href: "/tables", title: "tables" },
    { href: "/ingredients", title: "ingredients" },
    { href: "/inventory", title: "inventory" },
    { href: "/employees", title: "employees" }
];

export default function Menu({ show, onHide } : Props) {
    const { t } = useTranslation("menu");

    return (
        <Offcanvas show={show} onHide={onHide} className="menu">
            <Offcanvas.Header closeButton className="fw-bold fs-5 text-bg-success" closeVariant="white">
                Commendo
            </Offcanvas.Header>
            <Offcanvas.Body className="pt-0">
                <Stack direction="vertical">
                    {links.map(link => <MenuItem key={link.href} to={link.href} title={t(link.title)}/>)}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}