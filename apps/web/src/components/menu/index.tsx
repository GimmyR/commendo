import MenuItem from "@/components/menu/menu-item";
import { Offcanvas, Stack } from "react-bootstrap";
import "./menu.css";

type Props = {
    show: boolean;
    onHide: () => void;
};

const links = [
    { href: "/", title: "Plats" },
    { href: "/tables", title: "Tables" },
    { href: "/ingredients", title: "Ingrédients" },
    { href: "/inventory", title: "Inventaire" },
    { href: "/employees", title: "Employés" }
];

export default function Menu({ show, onHide } : Props) {
    return (
        <Offcanvas show={show} onHide={onHide} className="menu">
            <Offcanvas.Header closeButton className="fw-bold fs-5 text-bg-success" closeVariant="white">
                Commendo
            </Offcanvas.Header>
            <Offcanvas.Body className="pt-0">
                <Stack direction="vertical">
                    {links.map(link => <MenuItem key={link.href} to={link.href} title={link.title}/>)}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}