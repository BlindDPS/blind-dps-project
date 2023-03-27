import React, {Fragment} from "react";

const OverviewBlock = () => (
    <section className="hero overview">
        <div className="container is-max-desktop">
            <img id="overview"
                 height={"100%"}
                 src={process.env.PUBLIC_URL + "/imgs/cover.webp"}
                 alt={"overview"}>
            </img>
            <h2 className="subtitle has-text-centered">
                Representative results and overall concept of the proposed method.
            </h2>
        </div>
    </section>
)

const AbstactBlock = () => (
    <section className="section">
        <div className="container is-max-desktop">
            <div className="columns is-centered has-text-centered">
                <div className="column is-four-fifths">
                    <h2 className="title is-3">Abstract</h2>
                    <div className="content has-text-justified">
                        <p>
                            Diffusion model-based inverse problem solvers have demonstrated 
                            state-of-the-art performance in cases where the forward operator is known (i.e. non-blind). 
                            However, the applicability of the method to blind inverse problems has yet to be explored. 
                        </p>
                        <p>
                            In this work, we show that we can indeed solve a family of blind inverse problems 
                            by constructing another diffusion prior for the forward operator. 
                            Specifically, parallel reverse diffusion guided by gradients from the intermediate stages 
                            enables joint optimization of both the forward operator parameters as well as the image, 
                            such that both are jointly estimated at the end of the parallel reverse diffusion procedure. 
                        </p>
                        <p>    
                            We show the efficacy of our method on two representative tasks --- 
                            blind deblurring, and imaging through turbulence --- 
                            and show that our method yields state-of-the-art performance, 
                            while also being flexible to be applicable to general blind inverse problems when we know the functional forms.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const Section1 = () => {
return (
    <Fragment>
        <br />
        <OverviewBlock />
        <AbstactBlock />
    </Fragment>
);
}

export default Section1;
