import { Card, Typography } from '@material-tailwind/react'

function CardForm({ children, title = 'Title', desc = '' }) {
	return (
		<Card className='w-full lg:w-[600px] py-4 px-8'>
			<div className='mb-10'>
				<Typography variant='h4' color='blue-gray'>
					{title}
				</Typography>
				{desc && (
					<Typography color='gray' className='mt-1 font-normal'>
						{desc}
					</Typography>
				)}
			</div>
			{children}
		</Card>
	)
}

export default CardForm
