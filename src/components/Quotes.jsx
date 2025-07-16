export default function Quotes({text, author}){
    return (
        <div className="text-center our-story">
                    <div className="container px-5">
                        <h2>{text}</h2>
                    </div>
                    <p>{`- ${author}`}</p>
                    <div className="section-separator">
                    </div>

                </div>
    )
}
