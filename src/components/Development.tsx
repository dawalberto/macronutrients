import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import Draggable from 'react-draggable'

export const Development = () => {
	const { height, weight, genre, age, lbm, bmrAndExercise, goal } = useStore($userAttributes)
	return (
		<Draggable>
			<div className='fixed -right-40 bottom-2 cursor-move p-8 font-semibold active:shadow-xl'>
				<div className='w-full text-red-600'>
					<code>
						<pre>TODO</pre>
						<ul>
							<li>👉 Default proteins, fats, carbs</li>
							<li>👉 Default proteins and fats values to multiply by</li>
							<li>👉 Refactor Chart</li>
							<li>👉 Chart responsive, labels and colors</li>
						</ul>
						<br />
						<pre className='text-amber-600'> height: {height},</pre>
						<pre className='text-amber-600'> weight: {weight},</pre>
						<pre className='text-amber-600'> age: {age},</pre>
						<pre className='text-amber-600'> genre: "{genre}",</pre>
						<pre className='text-pink-600'> goal: "{goal}",</pre>
						<pre className='text-lime-600'> lbm: {JSON.stringify(lbm, null, 2)}</pre>
						<pre className='text-sky-600'> bmrAndExercise: {JSON.stringify(bmrAndExercise, null, 2)}</pre>
					</code>
				</div>
			</div>
		</Draggable>
	)
}
