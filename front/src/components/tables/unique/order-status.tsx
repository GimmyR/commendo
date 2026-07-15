import { useTranslation } from "react-i18next";

type Props = {
    status: number;
};

export default function OrderStatus({ status } : Props) {
    const {t} = useTranslation("table");

    return (
        <strong className={`px-2 py-1 
            ${status == 0 ?
                "text-bg-secondary"
            : status == 1 ?
                "text-bg-primary"
            : status == 2 ?
                "text-bg-warning"
            : status == 3 ?
                "text-bg-success"
            : "text-bg-dark"
            }
        `}>
            {status == 0 ? 
                t("to-confirm")
            : status == 1 ? 
                t("to-do")
            : status == 2 ?
                t("in-progress")
            : status == 3 ?
                t("done")
            : t("archived")}
        </strong>
    );
}