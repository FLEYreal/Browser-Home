'use client'

// Basics
import axios from "axios";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

// Shared
import { BACKEND_URL } from "@/shared/config/vars";
import { customQuery } from "@/shared/config/types";
import { getItemQuery } from "./types/query";

export interface getItemsProps extends customQuery {
    query?: getItemQuery
}
export const useGetItems = ({ query, ...props }: getItemsProps = {}) => {

    return useQuery({
        queryKey: ['get-items'],
        queryFn: async (_: QueryFunctionContext) => axios.get(`${BACKEND_URL}/item/`, {
            params: query
        }),
        ...props
    })

}

export const useCreateItems = () => {

}

export const useUpdateItems = () => {

}

export const useDeleteItems = () => {

}