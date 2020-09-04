import React from "react";

type PropsType = {
    text: string,
    name: string,
    value: string,
    onChange: Function,
    checked?: boolean
}

const Radio: React.FC <PropsType> = (props) => {
    const { text, name, value, onChange, checked = false } = props;

    return (
        <label className="radio">
            <input onChange={e => onChange(e)} defaultChecked={checked} value={value} type="radio" name={name} />
            <span className="radio__wrap">
                <span className="radio__text">{text}</span>
            </span>
        </label>
    )
};

export default Radio
