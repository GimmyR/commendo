type Props = {
    status: number;
};

export default function OrderStatus({ status } : Props) {
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
                "To confirm"
            : status == 1 ? 
                "To do"
            : status == 2 ?
                "In progress"
            : status == 3 ?
                "Done"
            : "Archived"}
        </strong>
    );
}