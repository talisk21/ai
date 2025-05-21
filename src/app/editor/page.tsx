'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Node, Edge } from 'reactflow'

const EditorCanvas = dynamic(() => import('@/components/Editor/EditorCanvas'), { ssr: false })

export default function RouteEditorPage() {
    const [data, setData] = useState<{ nodes: Node[]; edges: Edge[] } | null>(null)

    useEffect(() => {
        const nodes: Node[] = [
            {
                id: '1',
                position: { x: 100, y: 100 },
                data: { label: 'Начало' },
                type: 'default',
            },
            {
                id: '2',
                position: { x: 300, y: 200 },
                data: { label: 'Шаг 2' },
                type: 'default',
            }
        ]

        const edges: Edge[] = [
            {
                id: 'e1-2',
                source: '1',
                target: '2',
                label: '→',
                type: 'default'
            }
        ]

        setData({ nodes, edges })
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">🛠 Конструктор маршрута</h1>
            {data ? <EditorCanvas data={data} /> : <p>Загрузка...</p>}
        </div>
    )
}