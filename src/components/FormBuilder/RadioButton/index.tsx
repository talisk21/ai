import React, {forwardRef, useCallback, useEffect, useState} from "react";
import {FieldPropsType} from "@/types/forms";
import "./styles.scss"
import {OptionType} from "@/types/utility";

const RadioButton = forwardRef<HTMLDivElement, FieldPropsType>(({
                                                   classNames= '',
                                                   name,
                                                   label = '',
                                                   options,
                                                   value,
                                                   onChange,
                                                   disabled = false,
                                                   errorMessage,
                                                   width,
                                                   isCountry = false,
                                                    alignFlexH,
                                                    extraDescription='',
                                               },ref) => {

    const [curValue, setCurValue] = useState(value || (options && options.length && options[0]!==undefined ? (options[0]?.value) : ''));

    useEffect(() => {
        if (value) {
            setCurValue(value as string);
        } else if (options && options.length) {
            setCurValue(options[0].value)
        }
    }, [options, value]);

    const handleChange = useCallback((selectedOption: string) => {
        if (!disabled) {
            setCurValue(selectedOption);

            if (onChange) {
                onChange(selectedOption);
            }
        }
    }, [onChange, disabled] );

    useEffect(() => {
        if (onChange && !value && options && options.length && options[0]?.value !== undefined) {
            onChange(options[0]?.value);
        }
    }, [onChange, options, value]);

    const getCountry = useCallback((options:OptionType[], value: string) => {
        const foundOption = options.filter(item => item.value === value);
        if (foundOption.length) {
            return foundOption[0].extraInfo || '';
        }
        return '';
    },[])


    return (
        <div className={`radio-button__wrapper ${classNames ? classNames : ""} ${width ? "width-"+width : ""} ${disabled ? 'is-disabled' : 'is-active'}`} ref={ref}>
            {label ? <label className="radio-button-label">{label}</label> : null}
            {extraDescription && <p className={`form-control__extra-description`}>{extraDescription}</p>}
            {options && options.length && <div className={`radio-button__group ${alignFlexH ? 'align-'+alignFlexH : ''}`}>
                {options && options.length && options.map((item, index) => (
                    item.isDisabled
                        ? <div key={`${name}_${index}`} className={`radio-button__option ${curValue===item.value ? 'is-checked' : ''} is-disabled`}>
                            <span className='radio-button__option-decor'/> <span>{item.label}{isCountry && getCountry(options, item.value as string) ? <span className={`fi fi-${getCountry(options, item.value as string).toLowerCase()} flag-icon`}></span> : null}</span>
                        </div>

                        : <button key={`${name}_${index}`} tabIndex={disabled || item.isDisabled ? -1 : 0} className={`radio-button__option ${curValue===item.value ? 'is-checked' : ''} ${item.isDisabled ? 'id-disabled' : ''}`}
                               onClick={()=>handleChange(item.value)}
                               onKeyDown={(e) => { if (e.key !== 'Tab') { if (!item.isDisabled) {handleChange(item.value);} e.preventDefault();} }}
                            >
                            <span className='radio-button__option-decor'/> <span>{item.label}{isCountry && getCountry(options, item.value as string) ? <span className={`fi fi-${getCountry(options, item.value as string).toLowerCase()} flag-icon`}></span> : null}</span>
                        </button>
                ))}
            </div>}
            {errorMessage && <p className="error">{errorMessage}</p>}

        </div>
    );
});

RadioButton.displayName = 'RadioButton';
export default RadioButton;
