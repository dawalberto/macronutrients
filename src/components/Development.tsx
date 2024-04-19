import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'
import Draggable from 'react-draggable'

export const Development = () => {
	const { height, weight, genre, age, lbm, bmrAndExercise, goal } = useStore($userAttributes)
	return (
		<Draggable>
			<div className='fixed -bottom-6 -left-12 cursor-move p-8 font-semibold active:shadow-xl'>
				<div className='w-full text-amber-900'>
					<code>
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
