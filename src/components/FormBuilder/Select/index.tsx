import React, {useCallback, forwardRef} from "react";
import { FieldPropsType} from '@/types/forms';
import Select, {SingleValue} from 'react-select'
import "./styles.scss";
import {OptionType} from "@/types/utility";

const SelectField = forwardRef<HTMLInputElement, FieldPropsType>(({
    classNames,
    name,
    label='',
    placeholder = "",
    width,
    isRequired = false,
    options=[],
    onChange,
    value,
    disabled = false,
    errorMessage,
    isSearchable= true,
    isClearable = true,
    extraDescription='',
    ...otherProps
}, ref) => {

    const handleChange = useCallback((newValue: SingleValue<OptionType>) => {
        if (onChange) {
            if (newValue) {
                onChange(newValue.value);
            } else {
                onChange('');
            }
        }

        //return onChange(selectedOption.value);
    } ,[onChange] )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomValueContainer = ({ ...props }: any) => {

        return (<div className="select-field-val">
            {props.hasValue && (
                    props.getValue()[0].extraInfo ||  props.getValue()[0].label
            )}
        </div>)
    };

    const filteredOptions = options.filter((option) => option.value === value);
    const selectedOption = filteredOptions.length > 0 ? filteredOptions[0] : null;

    return (
        <div className={`${width ? "width-"+width : ""}`}>
            <div className={`input-select__container ${classNames ? classNames : ""} ${isRequired ? "required" : ''} ${errorMessage ? 'has-error' : ''} ${isSearchable ? "searchable": ''} ${disabled ? 'is-disabled' : ''}`} ref={ref}>
                {label && <label htmlFor={name}>{label}</label>}
                {extraDescription && <p className={`form-control__extra-description`}>{extraDescription}</p>}
                <Select
                    {...otherProps}
                    value={selectedOption}
                    components={{ SingleValue: CustomValueContainer }}
                    name={name}
                    options={options}
                    placeholder={placeholder}
                    onChange={handleChange} // Use the handleChange function to handle the change
                    isDisabled={!!disabled}
                    //required={!!isRequired}
                    classNamePrefix='select-field'
                    instanceId={`select-${name}`}
                    isClearable={isClearable}
                    aria-autocomplete='none'
                    //ref={ref}
                    //inputProps={{autoComplete: 'off', autoCorrect: 'off', spellCheck: 'off' }}
                    //formatGroupLabel={ CustomValueContainer }
                />
                {errorMessage && <p className="error">{errorMessage}</p>}

            </div>
        </div>
    );
});

SelectField.displayName = 'SelectField';
export default SelectField;
