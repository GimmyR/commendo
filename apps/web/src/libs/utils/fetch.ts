import { API_URL } from "../constants/url";
import { CmdError } from "../error";

export async function cmdFetch(path: string, options?: RequestInit) {
    const res = await fetch(`${API_URL}${path}`, options);
    const data = await res.json();

    if(res.ok)
        return data;
    else throw new CmdError(data);
}