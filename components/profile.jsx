import PromptCard from "./PromptCard";

function Profile({ name, desc, data, handleEdit, handleDelete }) {
    return (
        <section className="w-full">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-gradient-violet-blue font-serif">
                    <span className="gradient-text">{name}</span> Profile
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
                ))}
            </div>
        </section>
    );
}

export default Profile;
