'use client'

// Basics
import axios, { AxiosResponse } from "axios";
import {
    useQuery,
    useMutation,
    UseQueryResult,
    UseMutationResult,
    MutationKey
} from "@tanstack/react-query";

// Shared
import { BACKEND_URL } from "@/shared/config/vars";
import { customQuery, customMutation, BackendResponseType } from "@/shared/config/types";
import { getItemQuery } from "./types/query";
import { createItemBody } from "./types/body";

// Hook to get list of items, has 2 filters, see them in "getItemQuery"
export interface getItemsProps extends customQuery {
    query?: getItemQuery
}
export const useGetItems = (
    { query, ...props }: getItemsProps = {} // Props types
    ): UseQueryResult<AxiosResponse<BackendResponseType, any>, unknown> => // Return types
{
    return useQuery({

        // Key of "useGetItems" hook
        queryKey: ['get-items'],

        // Gets response from backend in a promise to process
        queryFn: () => axios.get(`${BACKEND_URL}/item/`, {
            params: query
        }),

        // After queryFn worked out, we get data and we select the JSON body backend sent us
        // interface "BackendResponseType" contains type of backend's body response
        select: (data: unknown) => {
            return (data as AxiosResponse<BackendResponseType, any>).data;
        },

        // Custom hook inherits all useQuery's props and provides them with rest operator
        ...props
    }) as UseQueryResult<AxiosResponse<BackendResponseType, any>, unknown>;
}


// Hook to get create new item(s), see required and optional fields in "createItemBody"
export const useCreateItems = (
    props: customMutation = {}) // Props types
    : UseMutationResult<AxiosResponse<BackendResponseType, any>, unknown, createItemBody, MutationKey> => // Return types
{

    return useMutation({
        mutationKey: ['create-items'],
        mutationFn: async (body: createItemBody) => axios.post(`${BACKEND_URL}/item/`, body),
        ...props
    })

}

export const useUpdateItems = () => {

}

export const useDeleteItems = () => {

}