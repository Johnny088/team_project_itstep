export const PostCard = () => {
  return (
    <section className="mx-5 mt-24">
      <div className="flex items-center flex-col">
        <h1 className=" text-amber-300 mb-16">Welcome to the home page</h1>

        <button
          className="bg-white text-black p-2 rounded-xl cursor-pointer hover:bg-gray-400 duration-300 mb-16"
          onClick={() => {
            setIsFormOpen((prev) => !prev);
          }}
        >
          create new post
        </button>
        {isFormOpen && (
          <CreatePostForm
            onSubmit={(data) => mutate(data)}
            isPending={isPending}
            isError={isError}
          />
        )}
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <div>
                <img
                  className="w-3xs h-80"
                  src={
                    typeof post.image === 'string' &&
                    post.image.startsWith('http')
                      ? post.image
                      : `http://127.0.0.1:8000${post.image}`
                  }
                  alt="cover"
                />
                <p>{post.author}</p>
                <p>{post.title}</p>
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
