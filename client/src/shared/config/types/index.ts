// Basics
import {
    UseQueryOptions,
    QueryKey,
    UseMutationOptions,
    MutationKey
} from "@tanstack/react-query";

// Root interface for custom "useQuery" hook.
export interface customQuery extends Omit<UseQueryOptions<unknown, unknown, unknown, QueryKey>, 'queryKey' | 'queryFn'> { }

// Root interface for custom "useMutation" hook. 
export interface customMutation extends Omit<UseMutationOptions<unknown, unknown, unknown, MutationKey>, 'mutationKey' | 'mutationFn'> { }

// List of all HTTPs status codes
export const statusCodesArr = [
    100, 101, 102, 103, // Informational responses

    200, 201, 202, 203, 204, 205, 206, 207, 208, 226, // Successful responses

    300, 301, 302, 303, 304, 305, 306, 307, 308, // Redirection messages

    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, // Client error responses
    410, 411, 412, 413, 414, 415, 416, 417, 418, 421,
    422, 423, 424, 425, 426, 428, 429, 431, 451,

    500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511 // Server error responses
] as const

// Create type that can contain only elements from array "statusCodesArr"
export type statusCodes = typeof statusCodesArr[number]

// Backend response type
export type BackendResponseType = {
    status: statusCodes;
    title: string;
    description: string;
    payload: any[] | null;
    details: any;
}