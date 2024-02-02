import Link from 'next/link'
import React from 'react'

const RecordCard = ({date, IPFS_Hash}) => {

  const hashLink = 'https://ipfs.io/ipfs/' + IPFS_Hash

  date = new Date(date.toString() * 1000).toLocaleString()
  return (
    <div className='w-full bg-slate-200 bg-opacity-60 border-teal-400 border-2 rounded-xl p-3 my-3'>
        <div className=' flex gap-2 flex-col'>
                <p className=''>{date}</p>
                <Link  target="_blank" href={hashLink} className='text-lg'>{hashLink}</Link>
        </div>
    </div>
  )
}

export default RecordCard