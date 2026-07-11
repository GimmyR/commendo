import { createRange } from "@/libs/utils/array";
import { useMemo } from "react";
import { Pagination } from "react-bootstrap";
import './index.css';

type Props = {
    pages: number;
    current: number;
    setCurrent: (page: number) => void;
};

export default function Pages({ pages, current, setCurrent } : Props) {
    const pagesRange = useMemo(() => createRange(1, pages), [pages]);

    return (
        <Pagination>
            <Pagination.First onClick={() => setCurrent(1)}/>
            <Pagination.Prev onClick={() => setCurrent(current - 1)} disabled={current === 1}/>
            {pagesRange.map(page => <Pagination.Item key={page} active={page === current} onClick={() => setCurrent(page)}>
                {page}
            </Pagination.Item>)}
            <Pagination.Next onClick={() => setCurrent(current + 1)} disabled={current === pages}/>
            <Pagination.Last onClick={() => setCurrent(pages)}/>
        </Pagination>
    );
}