import React, { forwardRef } from "react";
import { FormBuilderType, FormFieldTypes } from "@/types/forms";

// Import each directly
import TextField from "./TextInput";
import SelectField from "./Select";
import SingleDateInput from "./SingleDateInput";
import Checkbox from "./Checkbox";
import RadioSwitch from "./RadioSwitch";
import Other from "./Other";
import ToggleSwitch from "./ToggleSwitch";
import TextArea from "./TextArea";
import RadioButton from "./RadioButton";

const componentsMap = {
    [FormFieldTypes.TEXT]: TextField,
    [FormFieldTypes.NUMBER]: TextField,
    [FormFieldTypes.DATE]: SingleDateInput,
    [FormFieldTypes.DATE_TIME]: SingleDateInput,
    [FormFieldTypes.SELECT]: SelectField,
    [FormFieldTypes.CHECKBOX]: Checkbox,
    [FormFieldTypes.RADIO]: RadioSwitch,
    [FormFieldTypes.OTHER]: Other,
    [FormFieldTypes.TOGGLE]: ToggleSwitch,
    [FormFieldTypes.TEXT_AREA]: TextArea,
    [FormFieldTypes.RADIO_BUTTON]: RadioButton,
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormBuilder = forwardRef<any, FormBuilderType>(
    ({ fieldType, isDisplayed = true, ...otherProps }, ref) => {
        if (!isDisplayed) return null;

        const Component = componentsMap[fieldType as keyof typeof componentsMap];

        if (!Component) return null;

        return (
            <Component
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={ref as any}
                {...otherProps}
            />
        );
    }
);

FormBuilder.displayName = "FormBuilder";
export default FormBuilder;