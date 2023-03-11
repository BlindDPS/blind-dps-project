import React from "react";

const CenterWrapper = (props) => {
    return (
        <section className="section">
            <div className="container is-max-desktop">
                <div className="columns is-centered has-text-centered">
                    <div className="column is-four-fifths">
                        {props.content}
                    </div>
                </div>
            </div>
        </section>
    );
}

const Content = () => {
    return (
        <div>
        <h2 className="title is-3">Method</h2>
        <img id="method"
             height={"100%"}
             src={process.env.PUBLIC_URL + "/imgs/method.gif"}
             alt={"loading.."}/>
        </div>
    )
}

const Section2 = () => {
    return (
        <CenterWrapper content={<Content />}/>
    );
}

export default Section2
