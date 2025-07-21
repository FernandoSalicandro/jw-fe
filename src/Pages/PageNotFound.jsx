import { useNavigate } from "react-router-dom"

export default function PageNotFound() {

    const navigate = useNavigate();


    return (
        <>
            <div className="container" style={{minHeight: "700px"}}>
                <div className="section-separator"></div>
                <div className="section-separator"></div>
                <div className="main-page mb-5 text-center">
                    <h1 className="mt-5 text-center">ERROR 404 PAGE NOT FOUND</h1>
                    <h3>This page has taste too refined to be found.
                        It might be off sipping champagne on a yacht somewhere.
                        </h3>
                        <h5 className="mt-4">In the meantime, why not return to where luxury always feels at home?</h5>
                        <button className="btn border-black show-details mt-4" onClick={() => navigate("/")}>Back to the glamour</button>
                </div>
            </div>

        </>
    )
}