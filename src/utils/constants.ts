import type { Age, Genre, Height, LBM } from 'src/types'
import { calculateAge } from './functions'

export const defaultWeight: Height = 63
export const defaultHeight: Height = 169
export const defaultAge: Age = calculateAge('1997-12-30')
export const defaultGenre: Genre = 'male'
const lbm = 0.407 * defaultWeight + 0.267 * defaultHeight - 19.2
export const defaultLbm: LBM = {
	formula: 'Boer',
	lbmKg: Number(lbm.toFixed(1)),
	lbmPercentage: Math.round((lbm / defaultWeight) * 100),
	bodyFatPercentage: Math.round(((defaultWeight - lbm) / defaultWeight) * 100),
}
