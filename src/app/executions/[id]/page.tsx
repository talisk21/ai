import ExecutionPageClient from './ExecutionPageClient';

export default function ExecutionPage({ params }: { params: { id: string } }) {
    return <ExecutionPageClient id={params.id} />;
}