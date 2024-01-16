import React from "react";
import { Input } from 'antd';

const { TextArea } = Input;

function Description({ setDescription, value }) {
    return (
        <div>
            <TextArea
                showCount
                maxLength={280}
                style={{
                    height: 150,
                    resize: 'none',
                }}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="can resize"
                value={value}
            />
        </div>
    );
}

export default Description;