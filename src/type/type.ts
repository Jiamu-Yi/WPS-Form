export interface IForm {
    author: string;
    ctime: number;
    id: string;
    isStar: boolean;
    problems: {
        required: boolean;
        title: string;
        type: string;
        id?: string,
        setting?: {
            options: {
                title: string
                status: 1 | 2
            }[]
        }
    }[];
    status: number;
    subTitle: string;
    title: string;
    utime: number;
}

export interface IproblemType {
    title: string,
    type: string,
}

export interface IproblemBasic {
    id: string,
    title: string,
    type: "input" | "singleSelect" | "multiSelect" | "pullSelect" | "date" | "time" | "score",
    required: boolean,
    setting?: {
        options: {
            title: string,
            status: 1 | 2,
        }[],
    },
}

