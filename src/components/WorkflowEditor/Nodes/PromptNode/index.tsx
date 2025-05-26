import {memo} from "react";
import { Handle, Position, NodeProps } from '@xyflow/react';

import './styles.scss';
import {PromptNodeType} from "@/components/WorkflowEditor/nodeTypes";


const PromptNode = ({
    data,
    selected,
    isConnectable,
}: NodeProps<PromptNodeType> )=>  {

    return (
        <>
            <div className={`prompt-node${selected ? ' prompt-node--selected' : ''}${data.isActive ? ' prompt-node--active' : ''}`}>
                <p className={`prompt-node__title`}>{data.label}</p>

                {!data.isStart && <Handle type="target" position={Position.Top} isConnectable={isConnectable} />}
                <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
            </div>

        </>
    );
}

export default  memo(PromptNode);