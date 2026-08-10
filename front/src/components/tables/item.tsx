import IconLink from "@/components/icon-link";
import type { ITable } from "@/libs/actions/tables";

type Props = {
    table: ITable;
};

export default function TableItem({ table } : Props) {
    const iconColor = "text-secondary";

    const availabilityColor = () => {
        if(table.availability == 0)
            return "danger";
        else if(table.availability == 1)
            return "success";
        else if(table.availability == 2)
            return "primary";
        else if(table.availability == 1)
            return "dark";
    };

    return (
        <div className="col-8 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 p-3">
            <div className="d-flex flex-column px-5 pt-5 pb-4 border rounded-4">
                <div className={`d-flex flex-row justify-content-center align-items-center border border-5 border-${availabilityColor()} rounded-4`}>
                    <span className={`text-${availabilityColor()}`} style={{ fontSize: "100px" }}>{table.tableRef}</span>
                </div>
                <div className="d-flex flex-row justify-content-around align-items-center mt-4">
                    <IconLink to={`/tables/${table.id}`} icon="clipboard" linkClass={iconColor}/>
                    <IconLink to="#" icon="archive" linkClass={iconColor}/>
                    <IconLink to="#" icon="trash" linkClass={iconColor}/>
                </div>
            </div>
        </div>
    );
}