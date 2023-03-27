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
            <h2 className="title is-3">Uniform Prior vs. Diffusion Prior</h2>
            <img 
                src= {process.env.PUBLIC_URL + '/imgs/ablation_uniformprior.webp'}
                alt='loading...'/>
            <div className="content has-text-justified" style={{padding: "1rem 0 0 0 "}}>
            <p>
            One may question why the score function for the kernel is necessary in the
            first place, since one could also estimate the kernel solely
            through gradient descent using the gradient of the likelihood. 
            </p>
            <p>
            This corresponds to using the uniform prior
            for the kernel distribution, which we compare against the
            proposed diffusion prior (BlindDPS). We clearly
            see that <b>using the uniform prior yields heavily distorted result, with poorly estimated kernel</b>.
            </p>
            From this experiment,
            we observe that using another diffusion process specifically
            for the forward model is crucial for the performance.
            </div>
        </div>
    )
}

const Section5 = () => {
    return (
        <CenterWrapper content={<Content />} />
    );
}

export default Section5;
