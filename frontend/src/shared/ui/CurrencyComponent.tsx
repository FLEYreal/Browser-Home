// CurrencyComponent.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CurrencyComponent = () => {
	const [usdToRubRate, setUsdToRubRate] = useState(null)
	const [bitcoinRate, setBitcoinRate] = useState(null)

	useEffect(() => {
		const fetchUsdToRubRate = async () => {
			try {
				const response = await axios.get(
					'https://api.exchangerate-api.com/v4/latest/USD'
				)
				setUsdToRubRate(response.data.rates.RUB)
			} catch (error) {
				console.error('Error fetching USD to RUB rate', error)
			}
		}

		const fetchBitcoinRate = async () => {
			try {
				const response = await axios.get(
					'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
				)
				setBitcoinRate(response.data.bitcoin.usd.toFixed(2))
			} catch (error) {
				console.error('Error fetching Bitcoin rate', error)
			}
		}

		fetchUsdToRubRate()
		fetchBitcoinRate()
	}, [])

	return (
		<div className='text-white flex'>
			<h2>$ {usdToRubRate}</h2>
			<span className='mx-2'>|</span>
			<h2>₿ {bitcoinRate}</h2>
		</div>
	)
}

export default CurrencyComponent
