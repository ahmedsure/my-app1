import { memo, useState } from 'react';

export const WithTime = ({color }={color:'primary'}) => {
    const [time, setTime] = useState('');
    setInterval(() => {
        const newLocalMessage = new Date();
        setTime(Intl.DateTimeFormat('en-UD', { day: '2-digit', year: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit', 'second': '2-digit' }).format(newLocalMessage));
    }, 1000);

    return (<p className={"m-0 text text-"+color} style={{ fontStyle: 'italic' }}>{time}</p>);
};

export default memo( WithTime )
