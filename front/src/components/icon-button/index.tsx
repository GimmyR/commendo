import { Button } from "react-bootstrap";

type Props = {
    icon: string;
    variant: string;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
};

export default function IconButton({ icon, variant, className, children, onClick } : Props) {
    return (
        <Button variant={variant} className={className} onClick={onClick}>
            <i className={`bi bi-${icon} me-lg-1`}></i>
            <span className="d-none d-lg-inline me-lg-1">{children}</span>
        </Button>
    );
}