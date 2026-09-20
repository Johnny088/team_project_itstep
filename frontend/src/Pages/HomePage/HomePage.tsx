import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../api/postsService';

export const HomePage = () => {
  const { data: posts } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPosts(),
    retry: 1,
  });

  return (
    <section className="mx-5 mt-24">
      <div className="flex items-center flex-col">
        <h1 className=" text-amber-300 mb-16">Welcome to the home page</h1>

        <button className="bg-white text-black p-2 rounded-xl cursor-pointer hover:bg-gray-400 duration-300 mb-16">
          create new post
        </button>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <div>
                <img src={`./${post.image}`} alt="photo" />
                <p>{post.author}</p>
                <p>{post.Title}</p>
                <p>{post.content}</p>
                <p>{post.createdAt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
