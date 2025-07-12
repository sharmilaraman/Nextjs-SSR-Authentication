import React from 'react'
import PostCard from './postcard'
import { PostProps } from '@/types/type';

async function getData() {
     const res=await fetch ('https://jsonplaceholder.typicode.com/posts')
     if (!res.ok) {
         throw new Error('Failed to fetch data')
     }    
     return res.json();
}
const Postlist = async () => {
     const data = await getData();
  return (
    <div className=''>
            PostList
       
            {/* <PostCard title='nextjs' body="next js tutorial"/> */}
            { data.map((post:PostProps)=>(
            <PostCard
                key={post.id}
                {...post} />
            ))}
    </div>
  )
}

export default Postlist
