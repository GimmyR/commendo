import { useSearch } from "@/libs/hooks/use-search";
import { Modal } from "react-bootstrap";

type Props = {
    header: string;
    children: React.ReactNode;
};

export default function SearchModal({ header, children } : Props) {
    const show = useSearch((state) => state.show);
    const setShow = useSearch((state) => state.setShow);
    const handleHide = () => setShow(false);

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton className="fw-bold">
                {header}
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}