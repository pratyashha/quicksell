type JSONResponse = {
    tickets: Ticket[];
    users: User[];
}

type Ticket = {
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
};

type User = {
    id: string;
    name: string;
    available: boolean;
};