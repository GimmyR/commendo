type Props = {
    availability: number;
};

export default function AvailabilityIcon({ availability } : Props) {
    if(availability == 0)
        return <i className="bi bi-exclamation-circle-fill text-danger"></i>;

    else if(availability == 1)
        return <i className="bi bi-check-circle-fill text-success"></i>

    else if(availability == 2)
        return <i className="bi bi-x-circle-fill text-secondary"></i>

    else return null;
}