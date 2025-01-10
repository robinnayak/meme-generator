export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    imageUrl?: string;
}

export interface BlogState {
    posts: BlogPost[];
}