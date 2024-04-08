import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import { useMemo } from 'react'

const LBM = () => {
	const userAttributes = useStore($userAttributes)

	const lbmBoer = useMemo(() => {
		const { genre, weight, height } = userAttributes
		let lbm = 0

		if (genre === 'male') {
			lbm = 0.407 * weight + 0.267 * height - 19.2
		} else {
			lbm = 0.252 * weight + 0.473 * height - 48.3
		}

		return {
			lbmKg: Number(lbm).toFixed(1),
			lbmPercentage: Math.round((lbm / weight) * 100),
			bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
		}
	}, [userAttributes.genre, userAttributes.weight, userAttributes.height])

	const lbmJames = useMemo(() => {
		const { genre, weight, height } = userAttributes
		let lbm = 0

		if (genre === 'male') {
			lbm = 1.1 * weight - 128 * (weight / height) ** 2
		} else {
			lbm = 1.07 * weight - 148 * (weight / height) ** 2
		}

		return {
			lbmKg: Number(lbm).toFixed(1),
			lbmPercentage: Math.round((lbm / weight) * 100),
			bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
		}
	}, [userAttributes.genre, userAttributes.weight, userAttributes.height])

	const lbmHume = useMemo(() => {
		const { genre, weight, height } = userAttributes
		let lbm = 0

		if (genre === 'male') {
			lbm = 0.3281 * weight + 0.33929 * height - 29.5336
		} else {
			lbm = 0.29569 * weight + 0.41813 * height - 43.2933
		}

		return {
			lbmKg: Number(lbm).toFixed(1),
			lbmPercentage: Math.round((lbm / weight) * 100),
			bodyFatPercentage: Math.round(((weight - lbm) / weight) * 100),
		}
	}, [userAttributes.genre, userAttributes.weight, userAttributes.height])

	return (
		<table className='w-full table-auto bg-green-200'>
			<thead>
				<tr>
					<th>Formula</th>
					<th>Lean Body Mass</th>
					<th>Body Fat</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Boer</td>
					<td>
						{lbmBoer.lbmKg} kg ({lbmBoer.lbmPercentage}%)
					</td>
					<td>{lbmBoer.bodyFatPercentage} %</td>
				</tr>
				<tr>
					<td>James</td>
					<td>
						{lbmJames.lbmKg} kg ({lbmJames.lbmPercentage}%)
					</td>
					<td>{lbmJames.bodyFatPercentage} %</td>
				</tr>
				<tr>
					<td>Hume</td>
					<td>
						{lbmHume.lbmKg} kg ({lbmHume.lbmPercentage}%)
					</td>
					<td>{lbmHume.bodyFatPercentage} %</td>
				</tr>
				<tr>
					<td>Manual</td>
					<td>0 kg</td>
					<td>0 %</td>
				</tr>
			</tbody>
		</table>
	)
}

export default LBM
