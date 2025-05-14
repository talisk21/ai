export type ExecutionType = {
    id: string;
    status: string;
    startedAt: string;
    finishedAt: string;
    steps: {
        output?: {
            result?: string;
        }
        error?: string;
    }[];
}