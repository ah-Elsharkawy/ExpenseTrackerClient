// interface for this response
export interface Response {
    result: boolean;
    targetUrl: string | null;
    success: boolean;
    error: string | null;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}