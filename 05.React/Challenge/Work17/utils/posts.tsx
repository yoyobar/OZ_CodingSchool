export interface PostType {
    title: string;
    content: string;
    date: string;
}

const posts: { [key: string]: PostType } = {
    'post-1': {
        title: '첫 번째 포스트',
        content: '첫 번째 포스트 내용',
        date: '2024-05-01',
    },
    'post-2': {
        title: '두 번째 포스트',
        content: '두 번째 포스트 내용',
        date: '2024-05-02',
    },
    'post-3': {
        title: '세 번째 포스트',
        content: '세 번째 포스트 내용입니다. 자유롭게 수정할 수 있습니다.',
        date: '2024-05-29',
    },
    'post-4': {
        title: '네 번째 포스트',
        content: '네 번째 포스트 내용입니다. 이정도면 충분하겠지',
        date: '2024-05-29',
    },
};

export default posts;
