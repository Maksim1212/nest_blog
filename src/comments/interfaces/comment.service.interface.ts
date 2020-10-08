interface AllCommentsInterface {
    [index: number]: {
        id: number;
        author_id: number;
        body: string;
        likes: string[];
        post_id: number;
        creation_time: Date;
    };
}

interface OneCommentInterface {
    id: number;
    author_id: number;
    body: string;
    likes: string[];
    post_id: number;
    creation_time: Date;
}

interface CommentDataInterface {
    post_id: number;
    body: string;
    author_id: number;
    accessToken: string;
}
export { AllCommentsInterface, OneCommentInterface, CommentDataInterface };
