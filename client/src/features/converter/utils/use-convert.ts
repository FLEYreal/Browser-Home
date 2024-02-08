// Insides
import { currencyType } from "../config/supported-currencies"

/**
 * Calculates the conversion rate between two currencies based on the current exchange rates.
 * @param rates - an object that maps currency codes to exchange rates
 * @param from - the currency code of the currency to convert from
 * @param to - the currency code of the currency to convert to
 * @param amount - the amount to convert
 * @returns the converted amount
 */
export function useConvert(
    rates: { [key in currencyType['id']]: number },
    from: currencyType['id'],
    to: currencyType['id'],
    amount: number
): number {

    // Formula to get rates & Return results
    amount = amount / rates[from];
    return Math.round(amount * rates[to] * 100) / 100;

}