import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    onClick: () => void;
};

export default function LargeSearchButton({ onClick } : Props) {
    const { t } = useTranslation("largeSearchButton");

    return (
        <Button onClick={onClick} variant="outline-light" className="d-none d-md-inline col-md-5 col-lg-4 me-4 text-start rounded-5 cmd-btn">
            <i className="bi bi-search me-2"></i>{t("title")}
        </Button>
    );
}