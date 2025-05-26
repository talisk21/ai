import React, {FormEvent, useCallback, forwardRef } from "react";
import { FieldPropsType } from "@/types/forms";
import "./styles.scss";

//const validRegex = /^[a-zA-Z0-9\s.,\-+_:;!?*()\[\]'"]+$/;
const invalidRegex = /[^a-zA-Z0-9\s.,\-+_:;!?—*'"%&#()\[\]]+/g;

const TextField = forwardRef<HTMLInputElement, FieldPropsType>(({
      classNames='',
      name,
      label='',
      type='text',
      onChange,
      isRequired = false,
      placeholder = '',
      errorMessage,
      disabled = false,
      value='',
      width,
      noCounters = true,
      onlyAllowedSymbols = false,
      extraDescription='',
    description,
      ...otherProps
}, ref) => {

  const handleChange = useCallback((event: FormEvent) => {
      const {value} = event.target as HTMLInputElement;
      if (onChange) {
          if (onlyAllowedSymbols) {
              const sanitizedValue = value.replace(invalidRegex, '');
              onChange(sanitizedValue);
          } else onChange(value);
      }
  }, [onlyAllowedSymbols, onChange] );

  const getDate = (dateStr: string) => {
      const date = !dateStr ? new Date() : new Date(dateStr);
      return date.toISOString().substring(0,10);
  }

  const curVal = (type === 'number') ? value as number : type=== 'date' ? (getDate(value as string)) : value as string;

  return (
    <div className={`${width ? "width-"+width : ""}`}>
        <div className={`form-control ${classNames ? classNames : ""}  ${isRequired ? "required" : ''} ${disabled ? "is-disabled" : ''}  ${errorMessage ? 'has-error' : ''}`}>
            {label && <label htmlFor={name}>{label}</label>}
            {extraDescription && <p className={`form-control__extra-description`}>{extraDescription}</p>}
              <input
                ref={ref}
                id={name}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                value={curVal || ""}
                disabled={disabled}
                onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                {...otherProps}
                autoComplete="new-user-email"
                aria-autocomplete='none'
                className={noCounters ? 'no-counters' : ''}
              />
            {description && <p className={`form-control__extra-description`}>{description}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    </div>

  );
});

TextField.displayName = 'TextField';
export default TextField;

// const TextField = () => <input />;
// export default TextField;
