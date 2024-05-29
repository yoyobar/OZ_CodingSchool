import Header from '@/components/Header';
import Post from '@/components/Post';
import posts from '@/utils/posts';
import { GetStaticPropsContext } from 'next';
import { PostType } from '@/utils/posts';

const SingleHostPage = ({ post }: { post: PostType }) => {
    return (
        <div>
            <Header />
            <Post post={post} />
        </div>
    );
};

export async function getStaticPaths() {
    const paths = [
        { params: { slug: 'post-1' } },
        { params: { slug: 'post-2' } },
        { params: { slug: 'post-3' } },
        { params: { slug: 'post-4' } },
    ];

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context;
    const post = posts[params!.slug as string];

    return {
        props: {
            post,
        },
    };
}

export default SingleHostPage;
