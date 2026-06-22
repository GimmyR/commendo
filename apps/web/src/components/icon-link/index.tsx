import { Link } from "react-router-dom";

type Props = {
    to: string;
    icon: string;
    linkClass?: string;
    iconClass?: string;
};

export default function IconLink({ to, icon, linkClass, iconClass } : Props) {
    return (
        <Link to={to} className={`text-decoration-none text-light ${linkClass}`}>
            <i className={`bi bi-${icon} ${iconClass}`}></i>
        </Link>
    );
}