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
        id: 'cny',
        type: 'fiat',
        label: "🇨🇳",
        className: "mr-[10px]"
    },
    {
        id: 'jpy',
        type: 'fiat',
        label: "🇯🇵",
        className: "mr-[10px]"
    },
    {
        id: 'pln',
        type: 'fiat',
        label: '🇵🇱',
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
    {
        id: "bnb",
        type: 'crypto',
        label: "₿",
        className: "text-orange-600 mr-[16px]"
    },
    {
        id: "ltc",
        type: 'crypto',
        label: "Ł",
        className: "text-blue-400 mr-[16px]"
    },
    {
        id: "usdt",
        type: 'crypto',
        label: "$",
        className: "text-green-400 mr-[16px]"
    },
] as const;

export type currencyType = {
    id: typeof currencies[number]['id'],
    type: typeof currencies[number]['type'],
    label: typeof currencies[number]['label'],
    className: typeof currencies[number]['className']
}