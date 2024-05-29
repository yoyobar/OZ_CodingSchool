import React from 'react';
import { PostType } from '@/utils/posts';
const Post = ({ post }: { post: PostType }) => {
    return (
        <div className='relative border-b border-b-black p-4 w-full h-[600px] bg-slate-100'>
            <div className='text-3xl font-bold mb-4'>{post.title}</div>
            <div className='text-xl mb-4'>{post.content}</div>
            <div className='absolute bottom-0 font-mono text-gray-900'>{post.date} 작성</div>
        </div>
    );
};

export default Post;
