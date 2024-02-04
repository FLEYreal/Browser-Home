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
import { getItemsKey } from "@/shared/api/item-api/use-items";

// Insides
import { getShelvesQuery } from "./types/query";
import { createShelvesBody, deleteShelvesBody, updateShelvesBody } from "./types/body";

// Hook to get list of shelves, has a filter to get a single shelf id... by id
export interface getShelvesProps extends customQuery {
    query?: getShelvesQuery;
}
export const getShelvesKey: QueryKey = ['get-shelves']
export const useGetShelves = (
    { query, ...props }: getShelvesProps = {})
    : UseQueryResult<BackendResponseType, unknown> => {

    return useQuery({

        // Unique keys for this query + keys to define backend query hook
        queryKey: [...getShelvesKey, ...QUERY_KEYS],

        // Get list of shelves from backend
        queryFn: () => axios.get(`${BACKEND_URL}/shelf`, {
            params: query
        }),

        // 1. After queryFn worked out, we get data and select the JSON body that backend sent
        // 2. Interface "BackendResponseType" contains type of backend's body response
        select: (data) => {
            return (data as AxiosResponse<BackendResponseType, any>).data;
        },

        ...props
    }) as UseQueryResult<BackendResponseType, unknown>;

}

export const createShelvesKey: QueryKey = ['create-shelves']
export const useCreateShelves = (
    props: customMutation = {})
    : UseMutationResult<AxiosResponse<BackendResponseType, any>, unknown, createShelvesBody, MutationKey> => {

    // Get RQ context
    const queryClient = useQueryClient()

    return useMutation({

        // Unique keys for this query + keys to define backend query hook
        mutationKey: [...createShelvesKey, ...QUERY_KEYS],

        mutationFn: (body: createShelvesBody) => axios.post(`${BACKEND_URL}/shelf/`, body),

        // Invalidate & Refetch shelves once list's updated (Created items)
        onSuccess: () => {

            // Expire old shelves
            queryClient.invalidateQueries({ queryKey: getShelvesKey })

        },

        ...props

    })

}

export const updateShelvesKey: QueryKey = ['update-shelves']
export const useUpdateShelves = (
    props: customMutation = {})
    : UseMutationResult<AxiosResponse<BackendResponseType, any>, unknown, updateShelvesBody, MutationKey> => {

    // Get RQ context
    const queryClient = useQueryClient()

    return useMutation({

        // Unique keys for this query + keys to define backend query hook
        mutationKey: [...updateShelvesKey, ...QUERY_KEYS],

        mutationFn: (body: updateShelvesBody) => axios.post(`${BACKEND_URL}/shelf/update`, body),

        // Invalidate & Refetch shelves once list's updated (Created items)
        onSuccess: () => {

            // Expire old shelves
            queryClient.invalidateQueries({ queryKey: getShelvesKey })

        },

        ...props

    })

}

export const deleteShelvesKey: QueryKey = ['delete-shelves']
export const useDeleteShelves = (
    props: customMutation = {})
    : UseMutationResult<AxiosResponse<BackendResponseType, any>, unknown, deleteShelvesBody, MutationKey> => {

    // Get RQ context
    const queryClient = useQueryClient()

    return useMutation({

        // Unique keys for this query + keys to define backend query hook
        mutationKey: [...deleteShelvesKey, ...QUERY_KEYS],

        mutationFn: (body: deleteShelvesBody) => axios.post(`${BACKEND_URL}/shelf/delete`, body),

        // Invalidate & Refetch shelves once list's updated (Created items)
        onSuccess: () => {

            // Expire old shelves and shelf's items as they're deleted with shelf as well
            queryClient.invalidateQueries({ queryKey: getShelvesKey })
            queryClient.invalidateQueries({ queryKey: getItemsKey })

        },

        ...props

    })

}

