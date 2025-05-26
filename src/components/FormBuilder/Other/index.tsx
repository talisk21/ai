import React, {forwardRef} from "react";
import { FieldPropsType } from "@/types/forms";
import "./styles.scss"

const Other = forwardRef<HTMLDivElement, FieldPropsType>(({
        classNames= '',
        name,
        label,
        otherComponent,
        width,
    extraDescription='',

    }, ref) => {

    return (
        <div className={`${width ? "width-"+width : ""}`} >
            <div className={`other-component ${classNames ? classNames : ""} `} ref={ref}>
                {label && <label htmlFor={name}>{label}</label>}
                {extraDescription && <p className={`form-control__extra-description`}>{extraDescription}</p>}
                <div className="other-component__content">
                    {otherComponent}
                </div>
            </div>
        </div>
    );
});

Other.displayName = 'Other';
export default Other;
