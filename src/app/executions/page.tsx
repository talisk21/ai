'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function ExecutionsPage() {
    const [executions, setExecutions] = useState<any[]>([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const loadExecutions = async () => {
        const res = await fetch('http://192.168.1.250:3000/executions');
        const data = await res.json();
        setExecutions(data);
    };

    useEffect(() => {
        loadExecutions();
    }, []);

    const createExecution = async () => {
        const res = await fetch('http://192.168.1.250:3000/executions', {
            method: 'POST',
        });
        const data = await res.json();
        router.push(`/executions/${data.id}`);
    };

    return (
        <main className="p-6 bg-white text-black">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Executions</h1>
                <button
                    onClick={() => startTransition(createExecution)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? 'Создание...' : '➕ Новый запуск'}
                </button>
            </div>

            <ul className="space-y-3">
                {executions.map((e) => (
                    <li
                        key={e.id}
                        className="p-4 bg-white border rounded text-sm shadow"
                    >
                        <a href={`/executions/${e.id}`} className="text-blue-700 underline">
                            <strong>ID:</strong> {e.id}
                        </a>
                        <br />
                        <strong>Status:</strong> {e.status}
                        <br />
                        <strong>Started:</strong> {e.startedAt}
                    </li>
                ))}
            </ul>
        </main>
    );
}