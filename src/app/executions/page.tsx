'use client';

import {useCallback, useEffect, useState, useTransition} from 'react';
import { useRouter } from 'next/navigation';
import {apiMain} from "@/lib/axiosInstance";
import {ExecutionType} from "@/types/execution";
import Loader from '@/components/Loader';
import Button from "@/components/Button";
import './styles.scss';
import Card from "@/components/Card";
import {formatDateTimeToStringWithDot} from "@/utils/date";


export default function ExecutionsPage() {
    const [loading, setLoading] = useState<boolean>(false);

    const [executions, setExecutions] = useState<ExecutionType[]>([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();



    useEffect(() => {
        const loadExecutions = async () => {
            setLoading(true);
            try {
                const res = await apiMain.get('/executions');
                console.log('res - executions:', res);
                const data = await res.data;
                setExecutions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadExecutions();
    }, []);

    const createExecution = useCallback(async () => {
        const res = await apiMain.get('/executions', {
            method: 'POST',
        });
        const data = await res.data;
        router.push(`/executions/${data.id}`);
    }, [router]);

    return (
        <main className="main">
            {loading && <Loader />}
            <div className="executions-page page-container">
                <div className="executions-page__header">
                    <h1 className="">Executions</h1>
                    <Button
                        onClick={() => startTransition(createExecution)}
                        disabled={isPending}
                    >
                        {isPending ? 'Создание...' : '➕ Новый запуск'}
                    </Button>
                </div>



                <ul className="executions-page__execution-list">
                    {executions.map((e) => (
                        <li
                            key={e.id}
                            className=""
                        >
                            <Card>
                                <a href={`/executions/${e.id}`} >
                                <strong>ID:</strong> {e.id}
                                </a>
                                <br />
                                <strong>Status:</strong> {e.status}
                                <br />
                                <strong>Started:</strong> {formatDateTimeToStringWithDot(e.startedAt)}
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}