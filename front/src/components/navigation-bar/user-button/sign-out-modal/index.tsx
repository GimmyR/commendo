import { useAuth } from "@/libs/hooks/use-auth";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type Props = {
    isShown: boolean;
    close: () => void;
};

export default function SignOutModal({ isShown, close } : Props) {
    const { t } = useTranslation("navbar");
    const logout = useAuth((state) => state.logout);

    const confirm = () => {
        close();
        setTimeout(() => {
            logout();
        }, 200);
    };

    return (
        <Modal show={isShown} onHide={close}>
            <Modal.Body className="text-center">
                {t("sign-out-message")}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={close} className="col-5">{t("sign-out-cancel")}</Button>
                <Button variant="danger" onClick={confirm} className="col-5">{t("sign-out-confirm")}</Button>
            </Modal.Footer>
        </Modal>
    );
}