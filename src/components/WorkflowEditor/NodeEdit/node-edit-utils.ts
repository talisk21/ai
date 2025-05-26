import {AGENTS} from "@/components/WorkflowEditor/workflow-editor.constants";
import {ToolParamsType} from "@/types/workflow-editor";
import {OptionType} from "@/types/utility";

export const isToolsUsed = (agent: string) => {
    return agent && agent !== AGENTS.LLM_AGENT;
}

export const getCategoryFromTool = (toolParams: ToolParamsType[], curToolName: string, toolCategories: OptionType[]) => {
    if (curToolName) {
        const curChosenTool = toolParams.filter(item => item.name == curToolName);

        if (curChosenTool && curChosenTool.length) {
            return curChosenTool[0].category || (toolCategories && toolCategories.length ? toolCategories[0].value : '');
        }
    }

    return (toolCategories && toolCategories.length ? toolCategories[0].value : '');
}

export const createToolOptions = (toolParams: ToolParamsType[]) => {
    return toolParams && toolParams.length ? toolParams.map(item => ({label: item.name, value: item.name})) as OptionType[] : [] as OptionType[];
}

export const getFirstToolInCategory = (curCategory: string,  toolParams: ToolParamsType[], toolCategories: OptionType[]) => {
    let curCat = curCategory;
    if (!curCategory && toolCategories && toolCategories.length) {
        curCat = toolCategories[0].value;
    }

    if (curCat) {
        const res = toolParams.filter(item => item.category == curCat);
        if (res.length) {
            return res[0];
        }
    }

    return null;
}

export const getToolDescription = (toolName: string, toolParams: ToolParamsType[]) => {
    if (toolName && toolParams?.length) {
        const res = toolParams.filter(item => item.name == toolName);
        if (res.length) {
            return res[0].description;
        }
    }
    return '';
}

export const getToolByName = (toolParams: ToolParamsType[], name: string) =>
    toolParams.find(t => t.name === name) || null;