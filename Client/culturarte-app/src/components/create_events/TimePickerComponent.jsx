import React, { useState, useEffect } from "react";
import TimeKeeper from 'react-timekeeper';
import { Input } from 'antd';
import { AiOutlineClockCircle } from "react-icons/ai";

function TimePickerComponent(params) {
    const [time, setTime] = useState('');
    const [selected, setSelected] = useState('');
    const [showTime, setShowTime] = useState(false);

    useEffect(() => {
        if(params)
            setTime(params.time)
        else
            setTime(selected)
    }, []);

    return (
        <div class="w-full" style={{width:'14vw'}}>
            <Input
                size="large"
                placeholder="Select time"
                prefix={<AiOutlineClockCircle color="#9d9d9d" size={24} onClick={() => setShowTime(true)}/>}
                style={{display:'flex', gap:'2%'}}
                onClick={() => setShowTime(true)}
                value={time}
            />

            <div class="absolute z-20">
            {showTime && (
                <TimeKeeper
                    time={time}
                    onChange={(newTime) => {
                        console.log(`${newTime.formatted24}:00`)
                        setSelected(newTime)
                        localStorage.setItem("EventHour", `${newTime.formatted24}:00`)
                    }}
                    onDoneClick={() => setShowTime(false)}
                    switchToMinuteOnHourSelect
                    style={{display:'absolute', zIndex:'10'}}
                />
            )}
            </div>
        </div>
    );
}

export default TimePickerComponent;
