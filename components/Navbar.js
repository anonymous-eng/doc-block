import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-center items-center bg-gradient-to-b from-slate-400 h-20 absolute w-full top-0'>
        <Link className='text-2xl flex gap-2 justify-center items-center' href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>
 Home
        </Link>
    </div>
  )
}

export default Navbar