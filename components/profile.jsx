import PromptCard from "./PromptCard"

function Profile({ name, desc, data, handleEdit, handleDelete }) {
    return (
        <section className="w-full">
            <h1 class="text-10xl font-bold">
                <span class="text-gradient-violet-blue font-serif text-7xl">
                    <span class="gradient-text">{name}</span> Profile
                </span>
            </h1>
            <p className="desc text-left"> {desc}</p>
            <div className='mt-10 prompt_layout'>
                {data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))
                }
            </div>
        </section>
    )
}

export default Profile