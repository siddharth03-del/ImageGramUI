export function PostFrame({img, caption}){
    return(
        <div className="w-full h-full flex flex-col">
            <div>
                <img src={img} alt="image"/>
            </div>
            <div>
                <p>{caption}</p>
            </div>
        </div>
    )
}