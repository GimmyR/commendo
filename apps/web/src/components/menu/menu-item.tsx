import { NavLink } from "react-router-dom";
import "./menu-item.css";

type Props = {
    to: string;
    title: string;
};

export default function MenuItem({ to, title } : Props) {
    return (
        <NavLink to={to} className="text-secondary text-decoration-none menu-item border-bottom px-1 py-3">
            {title}
        </NavLink>
    );
}