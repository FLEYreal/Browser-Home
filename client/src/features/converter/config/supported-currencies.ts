// Supported Currencies
export const currencies = [
    {
        id: "USD",
        label: "🇺🇸",
        className: "mr-[6px]"
    },
    {
        id: "EUR",
        label: "🇪🇺",
        className: "mr-[6px]"
    },
    {
        id: "RUB",
        label: "🇷🇺",
        className: "mr-[6px]"
    },
    {
        id: "BUN",
        label: "🇧🇾",
        className: "mr-[6px]"
    },
    {
        id: "UAH",
        label: "🇺🇦",
        className: "mr-[6px]"
    },
    {
        id: "TRY",
        label: "🇹🇷",
        className: "mr-[6px]"
    },
    {
        id: "BTC",
        label: "₿",
        className: "text-yellow-500 mr-[12px]"
    },
    {
        id: "ETH",
        label: "Ξ",
        className: "text-purple-500 mr-[12px]"
    },
] as const;

export type currencyType = {
    id: typeof currencies[number]['id'],
    label: typeof currencies[number]['label'],
    className: typeof currencies[number]['className']
}