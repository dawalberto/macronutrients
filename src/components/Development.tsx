import { useStore } from '@nanostores/react'
import { $userAttributes } from '@store/user-attributes'

export const Development = () => {
	const { height, weight, genre, age, lbm } = useStore($userAttributes)
	return (
		<div className='fixed bottom-2 right-2 rounded-lg bg-amber-200 p-8 shadow-md'>
			<div className='w-full'>
				<code>
					<pre> height: {height},</pre>
					<pre> weight: {weight},</pre>
					<pre> age: {age},</pre>
					<pre> genre: "{genre}",</pre>
					<pre> lbm: {JSON.stringify(lbm, null, 2)}</pre>
				</code>
			</div>
		</div>
	)
}
