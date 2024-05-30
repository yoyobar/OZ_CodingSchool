import axios from 'axios';
import { urls } from '/api/urls';

export default async function Read({ params }) {
    const res = await axios.get(`${urls.topics}/${params.id}`);
    const topic = res.data;
    return (
        <>
            <div className='text-2xl mb-2 mt-2'>{topic.title}</div>
            <div>{topic.body}</div>
        </>
    );
}
