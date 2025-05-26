import {FormFieldTypes, WidthType} from "@/types/forms";
import {OptionType} from "@/types/utility";

export const nodeMainFields = (
    {
        isDisabled,
        agentOptions,
        modelOptions,
    }:{
        isDisabled: boolean;
        agentOptions: OptionType[];
        modelOptions: OptionType[];
    }) =>  [
    {
        fieldType: FormFieldTypes.TEXT,
        type: "text",
        name: 'label',
        label: 'Step name',
        placeholder: "",
        disabled: isDisabled,
        rules: {
            required: "Required field",
        },
        errorMessage: "Required field",
         width: WidthType.w100,
        classNames: "",
    },
    {
        fieldType: FormFieldTypes.SELECT,
        type: "text",
        name: 'agent',
        label: 'Agent',
        options: agentOptions,
        placeholder: "",
        rules: {
            required: "Required field",
        },
        errorMessage: "Required field",
        disabled: isDisabled,
        width: WidthType.w100,
        classNames: "",
    },
    {
        fieldType: FormFieldTypes.SELECT,
        type: "text",
        name: 'model',
        label: 'Model',
        options: modelOptions,
        placeholder: "",
        rules: {
            required: "Required field",
        },
        errorMessage: "Required field",
        disabled: isDisabled,
        width: WidthType.w100,
        classNames: "",
    }
];

export const nodeToolField = (
    {
        name,
        toolsOptions,
        // onChange,
    }:{
        name: string;
        toolsOptions: OptionType[];
        // onChange: (val: string) => void;
    }) =>  [
    {
        fieldType: FormFieldTypes.SELECT,
        type: "text",
        name: name,
        label: 'Choose a tool',
        placeholder: "",
        options: toolsOptions,
        rules: {
            required: "Required field",
        },
        errorMessage: "Required field",
        width: WidthType.w50,
        classNames: "",
        // onChange: onChange
    },
];

export const nodePromptField =  [
    {
        fieldType: FormFieldTypes.TEXT_AREA,
        type: "text",
        name: 'prompt',
        label: 'Prompt',
        placeholder: "",
        rules: {
            required: "Required field",
        },
        errorMessage: "Required field",
        width: WidthType.w100,
        classNames: "",
    },
];
