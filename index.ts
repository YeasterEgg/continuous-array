const config = {
	get: (obj: number[], key: string | number | symbol) => {
		if (typeof key === 'symbol') return obj[key]
		const keyNum = Number(key)
		if (isNaN(keyNum) || keyNum < 0) return obj[key]
		const remainder = keyNum % 1
		if (remainder === 0) return obj[keyNum]
		const previous = obj[Math.floor(keyNum)]
		if (previous === undefined) return undefined
		const next = obj[Math.ceil(keyNum)]
		if (next === undefined) return undefined
		const diff = next - previous
		return previous + diff * remainder
	},
}

export const continuousArray = (arr: number[]) => new Proxy(arr, config)
