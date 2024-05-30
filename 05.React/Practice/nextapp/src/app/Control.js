'use client';

import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { urls } from '../../api/urls';

export function Control() {
    const { id } = useParams();
    const router = useRouter();

    const deleteHandler = async () => {
        const check = confirm('삭제 하시겠습니까?');
        if (check) {
            axios.delete(`${urls.topics}/${id}`);
            router.push(`/`);
            router.refresh();
        }
    };

    return (
        <ul className='flex gap-2 p-1'>
            {id ? (
                <>
                    <li className='p-2'>
                        <button
                            onClick={() => router.push(`/update/${id}`)}
                            className='bg-indigo-400 p-1 text-white hover:bg-indigo-600 rounded-md'
                        >
                            Update
                        </button>
                    </li>
                    <li className='p-2'>
                        <button onClick={deleteHandler} className='bg-red-400 p-1 h-[30px] text-white hover:bg-red-600 rounded-md'>
                            Delete
                        </button>
                    </li>
                </>
            ) : (
                <li>
                    <Link className='bg-indigo-400 p-1 text-white hover:bg-indigo-600 rounded-md' href='/create'>
                        Create
                    </Link>
                </li>
            )}
            <button value='delete'></button>
        </ul>
    );
}
