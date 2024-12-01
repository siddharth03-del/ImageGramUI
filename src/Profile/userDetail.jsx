function UserDetail({followers, following, posts, bio, name}){
    return(
        <div className="flex flex-col ml-10 mt-4">
            <div className="flex flex-row">
                <div>
                    <h1 className="font-mono text-xl font-bold">Followers {followers}</h1>
                </div>
                <div>
                    <h1 className="font-mono text-xl font-bold ml-3">Following {following}</h1>
                </div>
                <div>
                    <h1 className="font-mono text-xl font-bold ml-3">Posts {posts}</h1>
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    <h1 className="font-bold">{name}</h1>
                </div>
                <div>
                    <h1>{bio}</h1>
                </div>
            </div>
        </div>
    )
}
export default UserDetail;