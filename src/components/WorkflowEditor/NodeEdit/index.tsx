import React, {useEffect, useMemo} from "react";
import {PromptNodeDataType} from "@/components/WorkflowEditor/nodeTypes";
import './styles.scss';
import {useFieldArray, useForm} from "react-hook-form";
import {ToolParamsType} from "@/types/workflow-editor";
import {OptionType} from "@/types/utility";
import {agentOptions, AGENTS} from "@/components/WorkflowEditor/workflow-editor.constants";
import {nodeMainFields, nodePromptField} from "@/components/WorkflowEditor/NodeEdit/node-fields";
import FormFieldsBlock from "@/components/FormFieldsBlock";
import Button, {ButtonVariant} from "@/components/Button";
import {
    isToolsUsed
} from "./node-edit-utils";
import ToolComponent from "@/components/WorkflowEditor/NodeEdit/ToolComponent";

type PromptModeEditPropsType = {
    data: PromptNodeDataType;
    toolParams: ToolParamsType[];
    models: OptionType[];
    toolCategories: OptionType[];
    saveChanges: (data: PromptNodeDataType) => void;
    cancelEdit: () => void;
}



const NodeEdit: React.FC<PromptModeEditPropsType> = ({data, toolParams, models, toolCategories, saveChanges, cancelEdit}) => {


    const defaultFormValues = {
        label: data.label || 'New step',
        isStart: data.isStart || false,
        isActive: data.isActive || false,
        model: data.model || (models[0]?.value || ''),
        agent: data.agent || AGENTS.LLM_AGENT,
        prompt: data.prompt || '',
        tools: data.tools?.length
            ? data.tools.map((tool, tIndex) => ({
                name: tool.name || '',
                toolProps: (tool.toolProps || []).map((prop, pIndex) => ({
                    key: `${tool.name}_${tIndex}_${pIndex}`,
                    name: prop.name || '',
                    value: prop.value || '',
                }))
            }))
            : toolParams?.length
                ? [{
                    name: toolParams[0].name,
                    toolProps: (toolParams[0].inputSpec || []).map((prop, i) => ({
                        key: `${prop.name}_${i}`,
                        name: prop.name || '',
                        value: '',
                        prompt: ''
                    }))
                }]
                : []
    };

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        defaultValues: defaultFormValues
    });

    useEffect(() => {
        reset(defaultFormValues);
    }, [data]);

    const agent = watch('agent');
    const tools = watch('tools');

    // useEffect(() => {
    //     const availableTools = toolParams?.filter(t => t.category === currentToolCategory) || [];
    //
    //     if (
    //         availableTools.length > 0 &&
    //         (!tools || tools.length === 0 || !tools[0].name) // only set if no tool selected
    //     ) {
    //         const firstTool = availableTools[0];
    //         const defaultToolProps = (firstTool.props || []).map((prop, index) => ({
    //             key: `${prop.name}_${index}`,
    //             name: prop.name,
    //             value: '',
    //         }));
    //
    //         setValue('tools', [{
    //             name: firstTool.name,
    //             toolProps: defaultToolProps
    //         }]);
    //     }
    // }, [currentToolCategory, agent, toolParams]);

    const {
        fields,
        append: addTool,
        remove: removeTool
    } = useFieldArray({
        control,
        name: 'tools'
    });

    const handleRemoveTool = (index: number) => {
        removeTool(index);
    }

    const nodeMainFieldsArray = useMemo(()=>nodeMainFields({agentOptions, modelOptions:models,isDisabled: false}),[models]);
    const promptField = useMemo(()=>nodePromptField, []);


    const onSubmit = (data: PromptNodeDataType) => {
        console.log('send: ', data);
        saveChanges(data);
        cancelEdit();
    }

    console.log('fields: ', fields, typeof fields, Array.isArray(fields));

    return (
        <div className={`node-editor`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`node-editor__wrapper grid-row`}>
                    <FormFieldsBlock control={control} fieldsArray={nodeMainFieldsArray} errors={errors}
                                 isDisabled={false}/>
                    <FormFieldsBlock control={control} fieldsArray={promptField} errors={errors} isDisabled={false} />
                    {isToolsUsed(agent) && (
// <p>Hi</p>
                        <>
                            {Array.isArray(fields) && fields.map((tool, toolIndex: number) => (
                                <ToolComponent
                                    key={tool.name+'_'+toolIndex}
                                    toolIndex={toolIndex}
                                    control={control}
                                    setValue={setValue}
                                    toolParams={toolParams || []}
                                    toolCategories={toolCategories}
                                    errors={errors}
                                    canRemoveTool={tools.length > 1}
                                    removeTool={() => handleRemoveTool(toolIndex)}
                                />
                            ))}
                            {agent === AGENTS.LLM_TOOL_DECISION_AGENT ? (
                                <div className="node-editor__add-tool-btn-wrapper">
                                    <Button type='button' onClick={() => addTool({name: '', toolProps: []})}>Add tool</Button>
                                </div>
                            ) : null}
                        </>

                    )}

                </div>
                <div className={`node-editor__btn-wrapper`}>
                    <Button type="button" variant={ButtonVariant.SECONDARY} onClick={cancelEdit}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>

            </form>
        </div>
    )
}

export default NodeEdit;