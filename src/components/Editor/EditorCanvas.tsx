'use client'

import React, { useCallback, useState } from 'react'
import ReactFlow, {
    Background,
    Controls,
    Node,
    Edge,
    ReactFlowProvider,
    useNodesState,
    useEdgesState
} from 'reactflow'
import 'reactflow/dist/style.css'
import styles from './EditorCanvas.module.scss'

interface EditorCanvasProps {
    data: {
        nodes: Node[]
        edges: Edge[]
    }
}

export default function EditorCanvas({ data }: EditorCanvasProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges)
    const [nodeCount, setNodeCount] = useState(data.nodes.length)

    const handleAddNode = useCallback(() => {
        const newNodeId = `node-${nodeCount + 1}`
        setNodeCount(prevState => prevState + 1);
        const newNode: Node = {
            id: newNodeId,
            position: {
                x: 100 + Math.random() * 300,
                y: 100 + Math.random() * 300
            },
            data: { label: `Шаг ${nodeCount + 1}` },
            type: 'default'
        }

        setNodes((nds) => {
            const updated = [...nds, newNode]

            // Добавляем связь только если был предыдущий узел
            if (nds.length > 0) {
                const previousNode = nds[nds.length - 1]
                const newEdge: Edge = {
                    id: `e${previousNode.id}-${newNodeId}`,
                    source: previousNode.id,
                    target: newNodeId,
                    type: 'default',
                    label: '→'
                }

                setEdges((eds) => [...eds, newEdge])
            }

            return updated
        })

        setNodeCount((n) => n + 1)
    }, [nodeCount, setNodes, setEdges])

    return (
        <div className={styles.wrapper}>
            {/* Панель инструментов */}
            <div className={styles.toolbar}>
                <button
                    className={`${styles.button} ${styles.buttonAdd}`}
                    onClick={handleAddNode}
                >
                    ➕ Добавить шаг
                </button>
                <button className={`${styles.button} ${styles.buttonSave}`}>
                    💾 Сохранить
                </button>
                <button
                    className={`${styles.button} ${styles.buttonFit}`}
                    onClick={() => setNodes((nds) => [...nds])} // заглушка под fitView
                >
                    🔍 Fit View
                </button>
            </div>

            <div className={styles.canvas}>
                <ReactFlowProvider>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        fitView
                        fitViewOptions={{ padding: 0.2 }}
                        zoomOnScroll
                        panOnScroll
                        panOnDrag
                    >
                        <Background color="#f0f0f0" gap={16} />
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </div>
    )
}