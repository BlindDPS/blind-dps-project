import React, { useState } from "react";
import { Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ReactSwipe from 'react-swipe'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';


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

const IamgeComareSlider = (props) => {
    const imgs = props.imgs
    return (
        <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={imgs.input} alt='input image'/>}
            itemTwo={<ReactCompareSliderImage src={imgs.recon} alt='recon image'/>}
        />
    );
}

const Carousel = ({images}) => {
    let reactSwipeEl;

    // console.log(images);
    return (
        <div>
            <ReactSwipe
                className="carousel"
                swipeOptions={{continuous: true}}
                ref={el => (reactSwipeEl = el)}
            >
                <div>
                    <IamgeComareSlider imgs={images[0]}/>
                </div>
                <div> Pane 2 </div>
                <div> Pane 3 </div>
            </ReactSwipe>
            <Button onClick={() => reactSwipeEl.prev()}> Prev </Button>
            <Button onClick={() => reactSwipeEl.next()}> Next </Button>
        </div>
    );
}

const GridKernel = ({task, kernels}) => {
    return (
        <>
        <Grid item md={6}>
            <span>Reconstructed Kernel</span>
            <div style={{backgroundColor: "blue"}}>
                what
            </div>
        </Grid>
        <Grid item md={6}>
            <span>True Kernel</span>
            <div style={{backgroundColor: "green"}}>
                {task}
            </div>
        </Grid>
        </>
    );
}

const IamgeDisplay = ({task}) => {
const images = [{
        'input': process.env.PUBLIC_URL + '/imgs/results/' + task + '/input.png',
        'recon': process.env.PUBLIC_URL + '/imgs/results/' + task + '/truth.png',
    }];

    const kernels = [{
        'recon': process.env.PUBLIC_URL + '/imgs/results/' + task + '/recon_ker.png',
        'truth': process.env.PUBLIC_URL + '/imgs/results/' + task + '/truth_ker.png',
    }];

    return (
        <Grid container spacing={2} style={{margin: "1rem 0"}}>
            <Grid item xs={8}>
                <Carousel images={images}/>
            </Grid> 
            <Grid item xs={4}>
                <GridKernel task={task} kernels={kernels} />
            </Grid>
        </Grid>
    )
}


const Content = () => {
    const tasks = ['gaussian', 'motion', 'turbulence'];
    const [task, setTask] = useState('gaussian');

    const onTaskToggle = (button_val) => {
        setTask(button_val);
    };

    return (
        <div>
            <h2 className="title is-3">Reconstruction Result</h2>
            <ToggleButtonGroup
                    color="primary"
                    value={task}
                    aria-label="Platform">
                {tasks.map(t => (
                    <ToggleButton value={t} onClick={()=>{onTaskToggle(t)}} id={t} key={t}>
                    {t}
                    </ToggleButton>))
                }
            </ToggleButtonGroup>

            <IamgeDisplay task={task}/>
        </div>
    );
}

const Section3 = () => {
    return (
        <CenterWrapper content={<Content />}/>
    );
}

export default Section3