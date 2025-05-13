'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function ExecutionClient({ id }: { id: string }) {
    const [execution, setExecution] = useState<any>(null);
    const [question, setQuestion] = useState('');
    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('openai/gpt-3.5-turbo');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const loadExecution = async () => {
        try {
            const res = await fetch(`http://192.168.1.250:3000/executions/${id}`);
            if (!res.ok) throw new Error('Ошибка загрузки');
            const data = await res.json();
            setExecution(data);
        } catch (e) {
            console.error('[UI] Ошибка при загрузке execution:', e);
        }       
    };

    useEffect(() => {
        loadExecution();
    }, [id]);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const res = await fetch('http://192.168.1.250:3000/models');
                const data = await res.json();
                if (Array.isArray(data.data)) {
                    setModels(data.data.map((m: any) => m.id));
                } else {
                    console.error('Некорректный ответ от /models:', data);
                }
            } catch (e) {
                console.error('[UI] Ошибка при загрузке моделей:', e);
            }
        };

        loadModels();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch(`http://192.168.1.250:3000/executions/${id}/steps`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'agent',
                input: { question, model: selectedModel },
            }),
        });

        setQuestion('');

        // Ожидаем появления output
        startTransition(() => {
            const pollUntilOutput = async () => {
                for (let i = 0; i < 10; i++) {
                    const res = await fetch(`http://192.168.1.250:3000/executions/${id}`);
                    const data = await res.json();
                    setExecution(data);

                    const lastStep = data.steps[data.steps.length - 1];
                    if (lastStep?.output?.result || lastStep?.error) break;

                    await new Promise((r) => setTimeout(r, 1000));
                }
            };

            pollUntilOutput();
        });
    };

    if (!execution) return <main className="p-6">Загрузка...</main>;

    return (
        <main className="p-6 text-black bg-white">
            <h1 className="text-2xl font-bold mb-4">Execution ID: {execution.id}</h1>

            <div className="mb-6 space-y-1">
                <p><strong>Status:</strong> {execution.status}</p>
                <p><strong>Started At:</strong> {execution.startedAt}</p>
                <p><strong>Finished At:</strong> {execution.finishedAt || '—'}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Steps</h2>

            <div className="space-y-4">
                {execution.steps?.map((step: any) => (
                    <div
                        key={step.id}
                        className="p-4 border rounded bg-white text-sm shadow-sm"
                    >
                        <p><strong>Type:</strong> {step.type}</p>
                        <p><strong>Input:</strong> <code>{JSON.stringify(step.input)}</code></p>
                        <p><strong>Output:</strong> {step.output?.result || '—'}</p>
                        {step.error && <p className="text-red-600"><strong>Error:</strong> {step.error}</p>}
                    </div>
                ))}
            </div>

            <hr className="my-8 border-gray-300" />

            <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-lg font-semibold">➕ Добавить шаг</h3>

                <label className="block text-sm font-medium text-gray-700 mb-1">Модель</label>
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2 rounded border border-gray-400 bg-white text-black mb-4"
                >
                    {models.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Введите вопрос..."
                    className="w-full p-2 rounded border border-gray-400 bg-white text-black"
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? 'Отправка...' : 'Добавить шаг'}
                </button>
            </form>
        </main>
    );
}
