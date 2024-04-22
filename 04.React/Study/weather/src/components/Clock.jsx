import { useMemo, useState } from 'react';

export default function Clock() {
    const [time, setTime] = useState('00:00');
    useMemo(() => {
        setInterval(() => {
            const date = new Date();
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const timePeriod = hour >= 0 && hour < 12 ? 'AM' : 'PM';
            setTime(`${hour}:${minute} ${timePeriod}`);
        }, 1000);
    }, []);

    return <div className='ml-64 text-xs text-white font-mono'>{time}</div>;
}
