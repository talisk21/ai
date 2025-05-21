'use client';

import { useEffect, useState, useTransition } from 'react';
import { apiMain } from "@/lib/axiosInstance";
import { ExecutionType } from "@/types/execution";
import Loader from "@/components/Loader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { formatDateTimeToStringWithDot } from "@/utils/date";
import './styles.scss';

export default function ExecutionClient({ id }: { id: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [execution, setExecution] = useState<ExecutionType | null>(null);
    const [question, setQuestion] = useState('');
    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('openai/gpt-4o');
    const [selectedAgent, setSelectedAgent] = useState<string>('llm-tool-decision-agent');
    const [isPending, startTransition] = useTransition();

    const agentOptions = [
        'llm-agent',
        'llm-tool-agent',
        'llm-tool-decision-agent',
    ];

    useEffect(() => {
        const loadExecution = async () => {
            setLoading(true);
            try {
                const res = await apiMain.get<ExecutionType>(`/executions/${id}`);
                if (res.status === 200) {
                    setExecution(res.data);
                } else {
                    console.error('Ошибка загрузки execution:', res);
                }
            } catch (e) {
                console.error('[UI] Ошибка при загрузке execution:', e);
            } finally {
                setLoading(false);
            }
        };

        loadExecution();
    }, [id]);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const res = await apiMain.get('/models');
                const data = await res.data;
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

        try {
            await apiMain.post(`/executions/${id}/steps`, {
                type: selectedAgent,
                input: {
                    question,
                    model: selectedModel,
                },
            });

            setQuestion('');

            startTransition(() => {
                const pollUntilOutput = async () => {
                    for (let i = 0; i < 10; i++) {
                        const res = await apiMain.get<ExecutionType>(`/executions/${id}`);
                        const data = res.data;
                        setExecution(data);

                        const lastStep = data.steps[data.steps.length - 1];
                        if (lastStep?.output?.result || lastStep?.error) break;

                        await new Promise((r) => setTimeout(r, 1000));
                    }
                };

                pollUntilOutput();
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (!execution) return <main className="p-6">Загрузка...</main>;

    return (
      <main className="main">
          {loading && <Loader />}
          <div className="page-container execution-page">
              <h1 className="text-2xl font-bold mb-4">Execution ID: {execution.id}</h1>

              <Card>
                  <p><strong>Status:</strong> {execution.status}</p>
                  <p><strong>Started At:</strong> {formatDateTimeToStringWithDot(execution.startedAt)}</p>
                  <p><strong>Finished At:</strong> {execution.finishedAt || '—'}</p>
              </Card>

              <h2 className="text-xl font-semibold mb-4">Steps</h2>

              <div className="execution-page__step-list">
                  {execution.steps?.map((step: any) => (
                    <div key={step.id}>
                        <Card classNames='light-card'>
                            <p><strong>Type:</strong> {step.type}</p>
                            <p><strong>Input:</strong></p>
                            <code>
                                <p><strong>model:</strong> {step.input.model}</p>
                                <p><strong>question:</strong> {step.input.question}</p>
                            </code>
                            <p><strong>Output:</strong> {step.output?.result || '—'}</p>
                            {step.error && (
                              <p className="text-red-600"><strong>Error:</strong> {step.error}</p>
                            )}
                        </Card>
                    </div>
                  ))}
              </div>

              <hr />

              <form onSubmit={handleSubmit} className="execution-page__form">
                  <h3 className="text-lg font-semibold">➕ Добавить шаг</h3>

                  <div className="execution-page__form-wrapper">
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

                      <label className="block text-sm font-medium text-gray-700 mb-1">Агент</label>
                      <select
                        value={selectedAgent}
                        onChange={(e) => setSelectedAgent(e.target.value)}
                        className="w-full p-2 rounded border border-gray-400 bg-white text-black mb-4"
                      >
                          {agentOptions.map((agent) => (
                            <option key={agent} value={agent}>{agent}</option>
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
                      <Button type="submit" disabled={isPending}>
                          {isPending ? 'Отправка...' : 'Добавить шаг'}
                      </Button>
                  </div>
              </form>
          </div>
      </main>
    );
}