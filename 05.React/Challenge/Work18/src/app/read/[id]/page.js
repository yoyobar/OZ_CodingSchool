import axios from 'axios';
import { urls } from '/api/urls';
import DeleteBtn from '@/components/DeleteBtn';

export default async function Read({ params }) {
    const res = await axios.get(`${urls.topics}/${params.id}`);
    const topic = res.data;
    return (
        <>
            <div className='w-full flex flex-col'>
                <div className='bg-slate-100 border-b text-2xl font-bold p-2'>제목 : {topic.title}</div>
                <div className='bg-slate-100 p-2'>내용 : </div>
                <div className='bg-slate-100 p-2'>{topic.body}</div>
            </div>
            <DeleteBtn />
        </>
    );
}
