import {OptionType} from "@/types/utility";

export const createOptions = (values: string[]) => {
    return values.map((val: string) => ({value: val, label: val} as OptionType));
}