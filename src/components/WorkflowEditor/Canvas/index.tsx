'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
    ReactFlow,
    addEdge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    type Node,
    type Edge,
    type OnConnect,
    NodeMouseHandler, NodeProps
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';


import Button from "@/components/Button";
import PromptNode from '../Nodes/PromptNode';

import './styles.scss';
import {PromptNodeDataType} from "@/components/WorkflowEditor/nodeTypes";
import Sidebar from "@/components/SideBar";
import {apiMain} from "@/lib/axiosInstance";
import NodeEdit from "@/components/WorkflowEditor/NodeEdit";
import {AiModelType, ToolParamsType} from "@/types/workflow-editor";
import {OptionType} from "@/types/utility";
import {createOptions} from "@/utils/utility";
import Card from "@/components/Card";

type PromptNodeProps = NodeProps<Node<PromptNodeDataType>>;

const nodeTypes: Record<string, React.FC<PromptNodeProps>> = {
    prompt: (props: PromptNodeProps) => (
        <PromptNode {...props} />
    ),
};

type EditorCanvasProps = {
    data: {
        nodes: Node<PromptNodeDataType>[]
        edges: Edge[]
    }
}

export default function EditorCanvas({ data }: EditorCanvasProps) {
    const [tools, setTools] = useState<ToolParamsType[]>([]);
    const [toolCategories, setToolCategories] = useState<OptionType[]>([]);
    const [models, setModels] = useState<OptionType[]>([]);

    //get tools with their parameters
    useEffect(() => {
        const getParams = async () => {
            try {
                const res = await apiMain.get('/api/tools');

                if (res && res.status === 200 && res.data) {
                    setTools(res.data);

                    const categories = [...new Set(res.data.map((item: ToolParamsType) => item.category))] as string[];
                    setToolCategories(createOptions(categories) as OptionType[]);
                } else {
                    //display modal with error
                }
            } catch (error) {
                console.log(error);
            }
        };

        getParams();
    }, [setTools]);

    //get ai models
    useEffect(() => {
        const loadModels = async () => {
            try {
                const res = await apiMain.get('/models');
                if (res && res.data && res.status === 200 && Array.isArray(res.data?.data)) {

                    // console.log('models: ', res.data.data)

                    setModels(res.data.data.map((m: AiModelType) => ({value: m.id, label: m.name} as OptionType)));
                } else {
                    console.error('Некорректный ответ от /models:', data);
                }
            } catch (e) {
                console.error('[UI] Ошибка при загрузке моделей:', e);
            }
        };

        loadModels();
    }, []);

    const [nodes, setNodes, onNodesChange] = useNodesState<Node<PromptNodeDataType>>(data.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    const [activeNode, setActiveNode] = useState<Node<PromptNodeDataType> | null>(null);

    const closeSidebar = useCallback(() => {
        setActiveNode(null);
        setNodes((nds) =>
            nds.map((n) => ({
                ...n,
                data: { ...n.data, isActive: false }
            }))
        );
    }, [setNodes]);

    const [nodeCount, setNodeCount] = useState(data.nodes.length);


    const onNodeDoubleClick: NodeMouseHandler<Node<PromptNodeDataType>> = useCallback(
        (_evt, node) => {
            setActiveNode(node);
            setNodes((nds) =>
                nds.map((n) => ({
                    ...n,
                    data: { ...n.data, isActive: n.id === node.id }
                }))
            );
        },
        [setNodes]
    );

    const handleAddNode = useCallback(() => {
        const newNodeId = `node-${nodeCount + 1}`

        console.log('add: ', newNodeId)

        const newNode: Node<PromptNodeDataType> = {
            id: newNodeId,
            position: {
                x: 100 + Math.random() * 100,
                y: 100 + Math.random() * 300
            },
            data: {
                label: `New step`,
                isActive: false,
                isStart: false,
                model: '',
                agent: '',
                tools: [],
            },
            type: 'prompt'
        }

        setNodes((nds) => {
            return [...nds, newNode];
        })

        setNodeCount((n) => n + 1)
    }, [nodeCount, setNodes, setEdges])

    const saveNodeChanges = (id: string, val: PromptNodeDataType) => {
        if (val && id) {
            setNodes((nds) => {
                const editedNode = nds.find((n) => n.id === id);
                if (editedNode) {
                    return [...nds.filter(n => n.id !==id), {...editedNode, data: val}];
                }
                return [...nds];
            })
        }
    }

    const sendFlow = async () => {

        console.log('sendFlow', {data: {nodes, edges}});
        // try {
        //     const res = await apiMain.post('/api/tools', {data: {nodes, edges}});
        //
        //     if (res && res.status === 200 && res.data) {
        //         console.log('All is well!')
        //     } else {
        //         //display modal with error
        //         console.error(res)
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }


    return (
        <div className={`workflow-editor-canvas`}>
            {/* Панель инструментов */}
            <Card classNames={`workflow-editor-canvas__toolbar`}>
                <Button onClick={handleAddNode}>+ Add</Button>
                <Button onClick={sendFlow}>Save</Button>
                <Button onClick={()=>console.log('click fit view')}>Fit</Button>
            </Card>

            <div className={`workflow-editor-canvas__canvas`}>

                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        fitViewOptions={{ padding: 0.2 }}
                        // zoomOnScroll
                        // panOnScroll
                        // panOnDrag
                        onNodeDoubleClick={onNodeDoubleClick}
                        nodeTypes={nodeTypes}
                        panOnDrag={true}
                        selectionOnDrag={true}
                        selectionKeyCode="Shift"
                    >
                        <Background color="#f0f0f0" gap={16} />
                        <Controls />
                    </ReactFlow>

            </div>
            {activeNode ? <Sidebar
                title="Edit Step"
                isOpen={Boolean(activeNode)}
                onClose={closeSidebar}
            >
                <NodeEdit
                    data={activeNode.data}
                    toolParams={tools}
                    toolCategories={toolCategories}
                    models={models}
                    saveChanges={(val)=>saveNodeChanges(activeNode.id, val)}
                    cancelEdit={closeSidebar}
                />

            </Sidebar>
            : null }
        </div>
    )
}