
export interface Group {
    id: string;
    name: string;
    image?: string | null;
    children?: Group[];
}

export interface Question {
    id: number;
    text: string;
    image?: string | null;
    options?: Option[];
    explanation: string;
    explanation_image?: string | null;
}

export interface Option {
    text: string;
    istrue?: boolean;
}

