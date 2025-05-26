import React, {forwardRef} from "react";
import {FieldPropsType} from "@/types/forms";
import "./styles.scss"

const ToggleSwitch =  forwardRef<HTMLInputElement, FieldPropsType>(({
        classNames= '',
        name,
        label = '',
        value,
        checked = false,
        onChange,
        width,
        hideTextOnMobile = false,
        disabled = false,

        ...otherProps
   },ref) => {

    return (
        <div className={`${width ? "width-"+width : ""}`}>
            <div
                className={`toggle-switch ${classNames ? classNames : ""} ${hideTextOnMobile ? 'hide-text-on-mobile' : ''}`}>
                <input
                    {...otherProps}
                    className='toggle-switch-checkbox'
                    type='checkbox'
                    name={name}
                    id={`${name}-toggle`}
                    ref={ref}
                    checked={!!value || checked}
                    onChange={onChange}
                    disabled={disabled}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}
                />
                <label className={`toggle-switch-label ${disabled ? 'is-disabled' : ''}`} htmlFor={`${name}-toggle`}
                       aria-disabled={disabled}>
                <span className="toggle-switch-inner">
                    <span className="toggle-switch-inner--before" />
                    <span className="toggle-switch-inner--after" />
                </span>
                    <span className="toggle-switch-switch"/>
                </label>
                <span className='toggle-switch-label-text'>{label}</span>
            </div>

        </div>
    );
});

ToggleSwitch.displayName = 'ToggleSwitch';
export default ToggleSwitch;
