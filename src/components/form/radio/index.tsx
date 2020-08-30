import React from "react";

function Radio (props: any) {
    const { text, name, value, onChange, checked = false } = props;

    return (
        <label className="radio">
            <input onChange={e => onChange(e)} defaultChecked={checked} value={value} type="radio" name={name} />
            <span className="radio__wrap">
                <span className="radio__text">{text}</span>
            </span>
        </label>
    )
}

export default Radio
