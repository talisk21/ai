import ExecutionClient from './ExecutionClient';

export default function ExecutionPage({ params }: { params: { id: string } }) {
    return <ExecutionClient id={params.id} />;
}