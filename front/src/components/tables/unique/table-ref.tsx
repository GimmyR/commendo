import { useTranslation } from "react-i18next";

type Props = {
    reference: string;
};

export default function TableRef({ reference } : Props) {
    const { t } = useTranslation("tablesTable");

    return (
        <div className="d-flex flex-row align-items-center">
            <strong className="fs-5 me-2">{t("tableRef")} :</strong>
            <span className="fs-5">{reference}</span>
        </div>
    );
}