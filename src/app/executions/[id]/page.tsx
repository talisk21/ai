
import ExecutionClient from './ExecutionClient';

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ExecutionPage({ params }: PageProps) {
    const { id } = await params
    return <ExecutionClient id={id} />;
}