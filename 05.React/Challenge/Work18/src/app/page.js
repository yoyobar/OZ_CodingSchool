import Highlight from '../components/Highlight';

export default function Home() {
    return (
        <>
            <div className='p-2 text-2xl font-bold'>React 마지막과제 18일차 과제 입니다.</div>
            <div className='p-2 text-2xl font-bold'>
                <Highlight>Next.js</Highlight>의 <Highlight>App-Router</Highlight> 내용을 다루고 있습니다.
            </div>
        </>
    );
}
