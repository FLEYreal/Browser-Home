'use client'

// Basics
import axios, { AxiosResponse } from "axios";
import {
    useQuery,
    useMutation,
    UseQueryResult,
    UseMutationResult,
    MutationKey,
    useQueryClient,
    QueryKey
} from "@tanstack/react-query";

// Shared
import { BACKEND_URL, QUERY_KEYS } from "@/shared/config/vars";
import { customQuery, customMutation, BackendResponseType } from "@/shared/config/types";

// Insides
import { getItemQuery } from "./types/query";
import { createItemBody, deleteItemBody, updateItemBody } from "./types/body";

// Hook to get list of items, has 2 filters, see them in "getItemQuery"
export interface getItemsProps extends customQuery {
    query?: getItemQuery
}
export const getItemsKey: QueryKey = ['get-items']
export const useGetItems = (
    { query, ...props }: getItemsProps = {}) // Props types
    : UseQueryResult<AxiosResponse<BackendResponseType, any>, unknown> => // Return types
{
    return useQuery({

        // Unique keys for this query + keys to define backend query hook
        queryKey: [...getItemsKey, ...QUERY_KEYS],

        // Gets response from backend in a promise to process
        queryFn: () => axios.get(`${BACKEND_URL}/item/`, {
            params: query
        }),

        // 1. After queryFn worked out, we get data and select the JSON body that backend sent
        // 2. Interface "BackendResponseType" contains type of backend's body response
        select: (data) => {
            return (data as AxiosResponse<BackendResponseType, any>).data;
        },

        // Custom hook inherits all useQuery's props and provides them with rest operator
        ...props
    }) as UseQueryResult<AxiosResponse<BackendResponseType, any>, unknown>;
}


// Hook to get create new item(s), see required and optional fields in "createItemBody"
export const createItemsKey: QueryKey = ['create-items']
export const useCreateItems = (
    props: customMutation = {}) // Props types
    : UseMutationResult<AxiosResponse<BackendResponseType, any>, unknown, createItemBody, MutationKey> => // Return types
{

    // Get RQ context
    const queryClient = useQueryClient()

    return useMutation({

        // Unique keys for this query + keys to define backend query hook
        mutationKey: [...createItemsKey, ...QUERY_KEYS],

        mutationFn: (body: createItemBody) => axios.post(`${BACKEND_URL}/item/`, body),

        // Invalidate & Refetch items once list's updated (Created items)
        onSuccess: () => {

            // Expire old item list
            queryClient.invalidateQueries({ queryKey: getItemsKey })

        },
        ...props
    })

}

export const updateItemsKey: QueryKey = ['update-items']
export const useUpdateItems = (
    props: customMutation = {}) // Props types
    : UseMutationResult<AxiosResponse<BackendResponseType, any>, unknown, updateItemBody, MutationKey> => // Return types
{

    // Get RQ context
    const queryClient = useQueryClient()

    return useMutation({

        // Unique keys for this query + keys to define backend query hook
        mutationKey: [...updateItemsKey, ...QUERY_KEYS],

        mutationFn: (body: updateItemBody) => axios.post(`${BACKEND_URL}/item/update`, body),

        // Invalidate & Refetch items once list's updated
        onSuccess: () => {

            // Expire old item list
            queryClient.invalidateQueries({ queryKey: getItemsKey })

        },
        ...props
    })

}


export const deleteItemsKey: QueryKey = ['delete-items']
export const useDeleteItems = (
    props: customMutation = {}) // Props types
    : UseMutationResult<AxiosResponse<BackendResponseType, any>, unknown, deleteItemBody, MutationKey> => // Return types
{

    // Get RQ context
    const queryClient = useQueryClient()

    return useMutation({

        // Unique keys for this query + keys to define backend query hook
        mutationKey: [...deleteItemsKey, ...QUERY_KEYS],

        mutationFn: (body: deleteItemBody) => axios.post(`${BACKEND_URL}/item/delete`, body),

        // Invalidate & Refetch items once list's updated (Deleted items)
        onSuccess: () => {

            // Expire old item list
            queryClient.invalidateQueries({ queryKey: getItemsKey })

        },
        ...props
    })

}