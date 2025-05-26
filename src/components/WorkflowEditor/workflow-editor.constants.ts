export enum AGENTS {
    LLM_AGENT = 'llm-agent',
    LLM_TOOL_AGENT = 'llm-tool-agent',
    LLM_TOOL_DECISION_AGENT = 'llm-tool-decision-agent',
}

export const agentOptions = [
    { label: 'llm-agent', value: AGENTS.LLM_AGENT },
    { label: 'llm-tool-agent', value: AGENTS.LLM_TOOL_AGENT },
    { label: 'llm-tool-decision-agent', value: AGENTS.LLM_TOOL_DECISION_AGENT },
];