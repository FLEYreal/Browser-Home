// Basics
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

// Shared
import { SERVER_IP, SERVER_PORT, API_PREFIX } from "../../config/vars";
import { getItemQuery } from "./types/query";
import { createItemBody } from './types/body';

export const useGetItems = (
    query?: getItemQuery,
) => {

    return useQuery({
        queryKey: ['get-items'],
        queryFn: () => axios.get(`${SERVER_IP}:${SERVER_PORT}${API_PREFIX}/`)
    })

}

export const useCreateItems = (
    body: createItemBody
) => {

    return useMutation({
        mutationFn: () => axios.post(`${SERVER_IP}:${SERVER_PORT}${API_PREFIX}/`, body)
    })

}