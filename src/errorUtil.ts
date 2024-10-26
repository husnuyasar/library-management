export class ErrorUtil {
    static createError(message: string, status: number): Error {
        const error = new Error(message);
        (error as any).status = status; 
        return error;
    }
}