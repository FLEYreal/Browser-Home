// Format string into a query string for search engines
export const globalFormatter = (query: string) => {
    return query.replace(/\+|\?|\&| /g, (match) => '%' + match.charCodeAt(0).toString(16).toUpperCase());
}

export const googleFormat = (query: string) => {
    return (
        'https://google.com/search?q=' +
        globalFormatter(query)
    );
};

export const youtubeFormat = (query: string) => {
    return (
        'https://www.youtube.com/results?search_query=' +
        globalFormatter(query)
    )
}

export const yandexFormat = (query: string) => {
    return (
        'https://yandex.ru/search/?text=' +
        globalFormatter(query) +
        '&search_source=dzen_desktop_safe'
    )
}

export const bingFormat = (query: string) => {
    return (
        'https://www.bing.com/search?q=' +
        globalFormatter(query)
    );
}

export const duckduckgoFormat = (query: string) => {
    return (
        'https://duckduckgo.com/?q=' +
        globalFormatter(query)
    );
}