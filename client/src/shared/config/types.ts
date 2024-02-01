// Basics
import {
    UseQueryOptions,
    QueryKey
} from "@tanstack/react-query";

// Root interface for custom useQuery hook. It inherits most of its properties
export interface customQuery extends Omit<UseQueryOptions<unknown, unknown, unknown, QueryKey>, 'queryKey' | 'queryFn'> {}
