'use client'

// Basics
import { QueryKey, UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Shared
import { customQuery } from "@/shared/config/types";
import { BACKEND_URL, QUERY_KEYS } from "@/shared/config/vars";

// Insides
import { getIconQuery } from "./types/query";

// Hook to get Icon of the provided item's id. It extends customQuery inter 
// to have all props of useQuery.
export interface getIconProps extends customQuery {
    query?: getIconQuery
}
export const getIconKey: QueryKey = ['get-icon']
export const useGetIcon = ({ query, ...props }: getIconProps = {}): UseQueryResult<string, unknown> => {

    return useQuery({

        // Unique keys for this query + keys to define backend query hook
        queryKey: [...getIconKey, ...QUERY_KEYS],

        queryFn: async () => {

            const response = await axios.get(`${BACKEND_URL}/item/icon`, {
                params: query,
                responseType: 'arraybuffer'
            });

            // Get the content type from the response
            const contentType = response.headers['content-type'];

            // Convert the array buffer to base64
            const icon = Buffer.from(response.data, 'binary').toString('base64');

            // Construct the data URI with appropriate content type
            return `data:${contentType};base64,${icon}`;
        },

        ...props,
    }) as UseQueryResult<string, unknown>;
};

export const useUpdateIcon = () => {

}