// Supported Currencies
export const currencies = [
    {
        id: "usd",
        type: 'fiat',
        label: "🇺🇸",
        className: "mr-[10px]"
    },
    {
        id: "eur",
        type: 'fiat',
        label: "🇪🇺",
        className: "mr-[10px]"
    },
    {
        id: "rub",
        type: 'fiat',
        label: "🇷🇺",
        className: "mr-[10px]"
    },
    {
        id: "byn",
        type: 'fiat',
        label: "🇧🇾",
        className: "mr-[10px]"
    },
    {
        id: "uah",
        type: 'fiat',
        label: "🇺🇦",
        className: "mr-[10px]"
    },
    {
        id: "try",
        type: 'fiat',
        label: "🇹🇷",
        className: "mr-[10px]"
    },
    {
        id: "btc",
        type: 'crypto',
        label: "₿",
        className: "text-yellow-500 mr-[16px]"
    },
    {
        id: "eth",
        type: 'crypto',
        label: "Ξ",
        className: "text-purple-500 mr-[16px]"
    },
] as const;

export type currencyType = {
    id: typeof currencies[number]['id'],
    type: typeof currencies[number]['type'],
    label: typeof currencies[number]['label'],
    className: typeof currencies[number]['className']
}