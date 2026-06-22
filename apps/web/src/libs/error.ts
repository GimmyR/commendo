export class CmdError extends Error {
    constructor(data: any) {
        console.error(data);
        
        if(data.message && Array.isArray(data.message))
            super(data.message[0]);

        if(data.message && !Array.isArray(data.message))
            super(data.message);
    }
}