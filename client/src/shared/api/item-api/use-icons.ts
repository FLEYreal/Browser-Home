'use client'

// Basics
import { QueryKey, UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Shared
import { customQuery, customMutation } from "@/shared/config/types";
import { BACKEND_URL, QUERY_KEYS } from "@/shared/config/vars";

// Insides
import { getIconQuery } from "./types/query";
import { updateIconBody } from "./types/body";
import { getItemsKey } from "./use-items";

// Hook to get Icon of the provided item's id. It extends customQuery inter 
// to have all props of useQuery.
export interface getIconProps extends customQuery {
    query: getIconQuery
}
export const getIconKey: QueryKey = ['get-icon']
export const useGetIcon = ({ query, ...props }: getIconProps): UseQueryResult<string, unknown> => {

    return useQuery({

        // Unique keys for this query + keys to define backend query hook
        queryKey: [...getIconKey, query.item_id, ...QUERY_KEYS],

        queryFn: async () => {

            const response = await axios.get(`${BACKEND_URL}/item/icon`, {
                params: query,
                responseType: 'arraybuffer'
            });

            // Item exists but no icon found for the image
            if (response.status === 204) return null;

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


export const updateIconKey = ['update-icon']
export const useUpdateIcon = (props: customMutation = {}) => {

    const queryClient = useQueryClient();

    return useMutation({

        // Unique keys for this query + keys to define backend query hook
        mutationKey: [...updateIconKey, ...QUERY_KEYS],

        mutationFn: (body: updateIconBody) => {

            // Create form data and append new icon for the item
            const formData = new FormData()
            formData.append('file', body.icon)

            // Send request to backend
            return axios.post(`${BACKEND_URL}/item/icon`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    item_id: body.item_id
                }
            })

        },

        // Invalidate & Refetch items once list's updated (new icon uploaded)
        onSuccess: () => {

            // Expire old item list
            queryClient.invalidateQueries({ queryKey: getItemsKey })

        },

        ...props
    });

}