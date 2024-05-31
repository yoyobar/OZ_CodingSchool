'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { urls } from '../../api/urls';
import Link from 'next/link';

export default function DeleteBtn() {
    const { id } = useParams();
    const router = useRouter();

    const deleteHandler = async () => {
        const check = confirm('삭제 하시겠습니까?');
        if (check) {
            axios.delete(`${urls.topics}/${id}`);
            router.push(`/read`);
            router.refresh();
        }
    };

    return (
        <>
            <div className='p-2 flex gap-2'>
                <button onClick={deleteHandler} className='bg-red-400 p-1 h-[30px] text-white hover:bg-red-600 rounded-md'>
                    DELETE
                </button>
                <Link href={`/update/${id}`}>
                    <button className='bg-indigo-400 p-1 h-[30px] text-white hover:bg-indigo-600 rounded-md'>REWRITE</button>
                </Link>
            </div>
        </>
    );
}
