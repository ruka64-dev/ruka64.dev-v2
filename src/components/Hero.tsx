import * as motion from 'motion/react-client';

export default function Hero() {
	return (
		<>
			<motion.div className='hello' initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
				<img src='/icon.webp' draggable='false' loading='eager' fetchPriority='high' width={160} height={160} alt='icon' aria-hidden='true' className='rounded-full' />
				<h1 className='text-[2rem] font-light text-center'>ruka</h1>
				<h2 className='text-[1rem] font-light text-center'>I'm a 16y/o developer.</h2>
			</motion.div>
		</>
	);
}
