import { Node } from '@xyflow/react';

export enum ACTION_NODE_TYPE {
    CHAT = 'chat',
    TOOLS = 'tools',
    CHAT_TOOLS = 'chat_tools'
}

export type ToolPropValueType = string | number | boolean;

export type ToolPropType = {
    name: string;
    value: ToolPropValueType;
    // prompt: string;
}

export type ToolType = {
    name: string;
    toolProps: ToolPropType[];
}

export type PromptNodeDataType = Record<string, unknown> & {
    label: string;
    model?: string;
    agent?: string;
    prompt?: string;
    isStart?: boolean;
    isActive: boolean;

    //main properties
    tools: ToolType[];

}

export interface ConditionNodeData extends Record<string, unknown> {
    conditionText: string;
    onToggle?: (enabled: boolean) => void;
}

// export type PromptNodeType = Node<PromptNodeDataType, 'prompt'>;

export type PromptNodeType = Node<PromptNodeDataType>;
export type ConditionNodeType = Node<ConditionNodeData, 'condition'>;


export type CustomNode = PromptNodeType | ConditionNodeType;