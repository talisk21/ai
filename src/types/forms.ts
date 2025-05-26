import React, {ChangeEvent } from 'react'
import {OptionType} from "@/types/utility";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RefType=any;

export const enum FormFieldTypes {
    NUMBER = 'number',
    SELECT = 'select',
    TEXT = 'text',
    DATE = 'date',
    DATE_TIME = 'date-time',
    CHECKBOX = 'checkbox',
    RADIO = 'radio-switch',
    OTHER = 'other',
    TOGGLE = 'toggle-switch',
    GRID = 'grid',
    TEXT_AREA = 'text-area',
    RADIO_BUTTON = 'radio-button',
    //PHONE_NUMBER = 'phone-number',
}

export type TextFieldType = string

// export type OptionType = {
//     value: string
//     label: string
//     extraInfo?: string;
//     amount?: number;
//     color?: string;
//     isDisabled?: boolean;
// }

export const enum WidthType {
    w100 = "100",
    w75 = '75',
    w50 = "50",
    w33 = '33',
    w67 = '67',
    w25 = '25',
    w17 = '17',
    autoGrow = 'auto-grow',
    autoNoGrow = 'auto-no-grow',
}

export enum ALIGN_FLEX {
    CENTER ='center',
    START = 'start',
    END = 'end',
}

export type FieldPropsType = {
    classNames?: string
    key?: string
    name: string
    label?: string
    extraDescription?: string;
    type?: string
    placeholder?: string
    errorMessage?: string | undefined
    isSearchable?: boolean
    isFullWidth?: boolean
    width?: WidthType
    isRequired?: boolean
    rows?: number | undefined
    count?: number | undefined
    maxLength?: number | undefined
    disabled?: boolean
    // size?: SizeTypes.large | SizeTypes.medium | SizeTypes.small;
    innerRef?: RefType
    value?: string | number | boolean | Date ;
    checked?: boolean;
    onChange?: (event: ChangeEvent | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | string | OptionType) => void;
    onPaste?: (event: React.ClipboardEvent<HTMLTextAreaElement> | React.ClipboardEvent<HTMLInputElement> | ChangeEvent | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | string | OptionType) => void
    onDrop?: (event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLTextAreaElement>)=>void;
    onDragOver?: (event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLTextAreaElement>)=>void;
    inputValue?: string
    //registerInput?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules?: any
    // onInputChange?: (inputValue: string, meta: InputActionMeta) => void;
    options?: OptionType[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
    isClearable?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    otherComponent?: any;
    isDisplayed?: boolean;
    autoComplete?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref?: any | null;
    hideTextOnMobile?: boolean;
    extraLabel?: string;
    isCheckboxHidden?: boolean;
    circleColor?: string;
    isCountry?: boolean;
    flagBefore?: boolean;
    noCounters?: boolean;
    alignFlexH?: ALIGN_FLEX;
    //rows?: number;
    hint?: string;
    notDisable?: boolean;
    disableWeekends?: boolean;
    disablePreviousDays?: boolean; //today is considered as previous day (as per delivery assumption)
    disableDaysAfterToday?: number;
    disableDaysTime?: string; //if current time (in Italy) if before this time, disableDaysAfterToday=disableDaysAfterToday-1
    onlyAllowedSymbols?: boolean;
    countryName?: string;
    description?: string;
}

export type FormBuilderType = FieldPropsType & {
    fieldType: FormFieldTypes;
    fields?: FormBuilderType[];
}
