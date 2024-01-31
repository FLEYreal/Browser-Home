export const googleFormat = (query: string) => {
    return query.replace(/\+|\?|\&| /g, (match) => '%' + match.charCodeAt(0).toString(16).toUpperCase());
};
