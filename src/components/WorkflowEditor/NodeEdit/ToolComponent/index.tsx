import React, {useEffect, useMemo, useState} from 'react'
import {ToolPropType} from "@/components/WorkflowEditor/nodeTypes";
import {ToolParamsPropType, ToolParamsType} from "@/types/workflow-editor";
import {useWatch} from "react-hook-form";
import {
    createToolOptions,
    getCategoryFromTool,
    getToolByName
} from "@/components/WorkflowEditor/NodeEdit/node-edit-utils";
import Select from "@/components/FormBuilder/Select";
import {FormFieldTypes, WidthType} from "@/types/forms";
import {nodeToolField} from "@/components/WorkflowEditor/NodeEdit/node-fields";
import FormFieldsBlock from "@/components/FormFieldsBlock";
import './styles.scss'
import Icon from "@/components/Icon";

type ToolComponentPropsType = {
    toolIndex: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: any;
    toolParams: ToolParamsType[];
    toolCategories: { label: string; value: string }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any;
    canRemoveTool: boolean;
    removeTool: () => void;
}

const ToolComponent:React.FC<ToolComponentPropsType> = ({toolCategories, toolParams, toolIndex, control, setValue, errors, canRemoveTool, removeTool}) => {
    const toolName = useWatch({ control, name: `tools.${toolIndex}.name` });

    const [selectedCategory, setSelectedCategory] = useState<string | null>(toolName ? getCategoryFromTool(toolParams, toolName, toolCategories) : '');
    const [currentTool, setCurrentTool] = useState<ToolParamsType|null>(getToolByName(toolParams, toolName));

    const filteredTools = useMemo(() => {
        if (!selectedCategory) return toolParams;
        return toolParams.filter(tp => tp.category === selectedCategory);
    }, [toolParams, selectedCategory]);

    const currentToolProps = useWatch({ control, name: `tools.${toolIndex}.toolProps` });

    useEffect(() => {
        setCurrentTool(getToolByName(toolParams, toolName))
    }, [toolParams, toolName]);

    useEffect(() => {
        if (!currentTool) return;

        const newProps = (currentTool.props || []).map((paramProp: ToolParamsPropType, i: number) => {
            console.log('paramProps: ', paramProp)
            const existing = currentToolProps?.find((p: ToolPropType) => p.name === paramProp.name);
            return {
                key: `${paramProp.name}_${i}`,
                name: paramProp.name,
                value: existing?.value || '',
            };
        });

        setValue(`tools.${toolIndex}.toolProps`, newProps);
    }, [toolName]);



    const toolField = useMemo(()=> nodeToolField(
        {name: `tools.${toolIndex}.name`, toolsOptions: createToolOptions(filteredTools)}
    ), [selectedCategory, filteredTools]);

    const propsFields = useMemo(() =>
        (currentTool?.props || []).map((prop: ToolParamsPropType, propIndex: number) => ({
            fieldType: prop.type === 'boolean'
                ? FormFieldTypes.TOGGLE
                : prop.type === 'number'
                    ? FormFieldTypes.NUMBER
                    : FormFieldTypes.TEXT,
            name: `tools.${toolIndex}.toolProps.${propIndex}.value`,
            label: prop.name,
            placeholder: "",
            width: WidthType.w100,
            classNames: "",
            description: prop.description,
        })), [currentTool, toolIndex]);

    useEffect(() => {
        if (!currentTool) return;

        currentTool.props?.forEach((prop, i) => {
            setValue(`tools.${toolIndex}.toolProps.${i}.name`, prop.name);
        });
    }, [currentTool, toolIndex]);

    return (
        <div className={`tool-block width-100 ${canRemoveTool ? 'can-remove':''} ${toolIndex > 0 ? 'need-border':''}`}>
            <div className={`grid-row `}>
                <Select
                    name='toolCategory'
                    label={'Tool category'}
                    value={selectedCategory || ''}
                    options={toolCategories}
                    onChange={(val)=>setSelectedCategory(val as string)}
                    width={WidthType.w50}
                />
                <FormFieldsBlock control={control} fieldsArray={toolField} errors={errors} isDisabled={false} />
                {currentTool ? <p className={`node-editor__tool-description`}><span className={`highlight-bold`}>{currentTool.name} - </span>{currentTool.description}</p> : null}

                <FormFieldsBlock control={control} fieldsArray={propsFields} errors={errors} isDisabled={false} />

                {canRemoveTool && <button className="remove-tool-btn" type='button' onClick={removeTool}>
                    <Icon name="waste-bin"/>
                </button>  }
            </div>
        </div>
    );
}

export default ToolComponent;