export type ToolParamsPropType = {
    name: string;
    description: string;
    type: string;
    required: boolean;
}

export type ToolParamsType = {
    category: string;
    name: string;
    description: string;
    inputSpec: ToolParamsPropType[];
}

export type AiModelType = {
    id: string;
    name: string;
    description: string;
}