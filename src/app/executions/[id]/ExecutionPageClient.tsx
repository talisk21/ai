'use client';

import ExecutionClient from './ExecutionClient';

export default function ExecutionPageClient({ id }: { id: string }) {
    return <ExecutionClient id={id} />;
}