import { Link } from "react-router-dom";

type Props = {
    to: string;
    icon: string;
    linkClass?: string;
    iconClass?: string;
    onClick?: () => void;
};

export default function IconLink({ to, icon, linkClass, iconClass, onClick } : Props) {
    return (
        <Link to={to} className={`text-decoration-none text-light ${linkClass}`} onClick={onClick}>
            <i className={`bi bi-${icon} ${iconClass}`}></i>
        </Link>
    );
}