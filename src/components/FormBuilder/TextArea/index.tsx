import React, {FormEvent, forwardRef, useCallback} from "react";
import { FieldPropsType } from "@/types/forms";
import "./styles.scss";


const TextArea= forwardRef<HTMLTextAreaElement, FieldPropsType>(({
     classNames='',
     name,
     label='',
     onChange,
     isRequired = false,
     placeholder = '',
     errorMessage,
     disabled = false,
     value='',
     width,
     rows = 4,
    extraDescription='',
    description='',
     ...otherProps
 }, ref) => {

    const handleChange = useCallback((event: FormEvent) => {
        const {value} = event.target as HTMLTextAreaElement;
        if (onChange) onChange(value);
    } ,[onChange] )

    return (
        <div className={`${width ? "width-"+width : ""}`}>
            <div className={`form-control ${classNames ? classNames : ""} ${isRequired ? "required" : ''} ${disabled ? "is-disabled" : ''}  ${errorMessage ? 'has-error' : ''}`}>
                {label && <label htmlFor={name}>{label}</label>}
                {extraDescription && <p className={`form-control__extra-description`}>{extraDescription}</p>}
                <textarea
                    id={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value as string}
                    disabled={disabled}
                    rows={rows}
                    //onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    {...otherProps}
                    ref={ref}
                    autoComplete="new-user-email"
                    aria-autocomplete='none'
                />
                {description && <p className={`form-control__extra-description`}>{description}</p>}
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>
    );
});

TextArea.displayName = 'TextArea';
export default TextArea;
