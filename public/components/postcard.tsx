import React from 'react'
import { PostProps } from '@/types/type';

const PostCard = async ({ title, body }:PostProps) => {
  return (
<div className="grid grid-cols-2 gap-4 w-full">
            PostCard
            <h1 className='text-4xl text-blue-500 '>{title}</h1>
            <p className=' text-md text-pink-600'>{body}</p>

    </div>
  )
}

export default PostCard;
