'use client'

// Basics
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Shared
import { SearchContextProps } from '@/shared/utils/search-context';

// Insides
import { bingFormat, googleFormat, yandexFormat, duckduckgoFormat, youtubeFormat } from './formtatter';

export const openEngine = (searchContext: SearchContextProps, router: AppRouterInstance, engine: string, query: string) => {
    const engineFormats: { [key: string]: (query: string) => string } = {
        'google': googleFormat,
        'youtube': youtubeFormat,
        'duckduckgo': duckduckgoFormat,
        'bing': bingFormat,
        'yandex': yandexFormat,
    };

    const formattedLink = engineFormats[engine](query);

    if (searchContext.sameTab) {
        router.push(formattedLink);
    } else {
        window.open(formattedLink, '_blank');
    }
}

export const handleSearch = (searchContext: SearchContextProps, router: AppRouterInstance, query: string) => {
    if (searchContext.engines) {
        searchContext.engines.forEach(engine => {
            openEngine(searchContext, router, engine, query);
        });
    }
}

export const toggleSameTab = (searchContext: SearchContextProps, toast: (props: any) => any) => {
    const { engines, sameTab, setSameTab } = searchContext;

    if (engines) {
        if (!sameTab && engines.length > 1) {
            toast({
                title: 'Only 1 Search Engine Allowed',
                description: 'You cannot open more than 1 search engine in the same tab!',
                variant: 'destructive'
            })

            return true;
        }
        else setSameTab(prev => !prev);
    }

    return false;
}