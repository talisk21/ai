'use client'


import { useEffect, useState } from 'react'
import { Edge } from '@xyflow/react';
import Loader from "@/components/Loader";
import WorkflowCanvas from '@/components/WorkflowEditor/Canvas';
import { PromptNodeType} from "@/components/WorkflowEditor/nodeTypes";

// const EditorCanvas = dynamic(() => import('@/components/Editor/EditorCanvas'), { ssr: false })

export default function RouteEditorPage() {
    const [data, setData] = useState<{ nodes: PromptNodeType[]; edges: Edge[] } | null>(null)

    useEffect(() => {
        const nodes: PromptNodeType[] = [
            {
                id: 'node-1',
                position: { x: 100, y: 100 },
                data: {
                    label: 'Start',
                    isStart: true,
                    isActive: false,
                    tools: []
                },
                type: 'prompt',
            },
        ]

        const edges: Edge[] = [
            // {
            //     id: 'e1-2',
            //     source: '1',
            //     target: '2',
            //     label: '',
            //     type: 'default'
            // }
        ]

        setData({ nodes, edges })
    }, [])

    return (
        <main className="main">
            {data ? null : <Loader />}
            <div className="page-container workflow-editor-page">
                <h1 className="">🛠 Route editor</h1>
                {/*{data ? <EditorCanvas data={data} /> : null}*/}
                {data ? <WorkflowCanvas data={data} /> : null}
            </div>
        </main>
    )
}