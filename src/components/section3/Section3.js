import React, { useState } from "react";
import { Stack, Fade, Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ReactSwipe from 'react-swipe'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { AiFillLeftCircle, AiFillRightCircle} from 'react-icons/ai'

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

const IamgeComareSlider = ({imgs}) => {
    return (
        <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={imgs.input} alt='input image'/>}
            itemTwo={<ReactCompareSliderImage src={imgs.recon} alt='recon image'/>}
        />
    );
}

const Carousel = ({images, index, onButton}) => {
    let reactSwipeEl;

    const nextIndex = (index, change, length) => {
        let next_idx = (index + change);
        if (next_idx < 0){
            next_idx = length + next_idx;
        }
        else {
            next_idx = next_idx % length;
        }
        return next_idx;
    }

    const pushPrev = () => {
        reactSwipeEl.prev();
        onButton(nextIndex(index, -1, images.length));
    }

    const pushNext = () => {
        reactSwipeEl.next();
        onButton(nextIndex(index, 1, images.length));
    }

    // console.log(images);
    return (
        <div>
            <ReactSwipe
                className="carousel"
                swipeOptions={{continuous: true}}
                ref={el => (reactSwipeEl = el)}
                childCount={images.length}
            >
                {images.map((image_pair) => {
                    console.log(image_pair);
                    return (
                        <div>
                        <IamgeComareSlider imgs={image_pair} />
                        </div>
                    );
                    })}
            </ReactSwipe>
            <br />
            <Stack justifyContent="center" alignItems="center" direction="row" spacing={2}>
                <Button startIcon={<AiFillLeftCircle />} variant={"outlined"} onClick={() => pushPrev()}> Prev </Button>
                <Button endIcon={<AiFillRightCircle />}variant={"outlined"} onClick={() => pushNext()}> Next </Button>
            </Stack>
        </div>
    );
}

const GridKernel = ({kernels}) => {
    return (
        <Grid container spacing={2}>
            <Grid item md={6}>
                <>
                <span style={{fontWeight:"bold"}}>Estimated Kernel</span>
                <img id="method"
                    height={"100%"}
                    src={kernels.recon}
                    alt={"loading.."}/>
                </>
            </Grid>
            <Grid item md={6}>
                <>
                <span style={{fontWeight:"bold"}}>True Kernel</span>
                <img id="method"
                    height={"100%"}
                    src={kernels.truth}
                    alt={"loading.."}/>
                </>
            </Grid>
        </Grid>
    );
}

function range(start, end){
    let array = [];
    for (let i=start; i<end; i++){
        array.push(i);
    }
    return array;
}

const IamgeDisplay = ({task}) => {

    const [index, setIndex] = useState(0);

    const images = range(0, 3).map((idx) => {
        return ({
            'input': process.env.PUBLIC_URL + '/imgs/results/' + task + '/input_'+idx+'.png',
            'recon': process.env.PUBLIC_URL + '/imgs/results/' + task + '/recon_'+idx+'.png',
        });
    })

    const kernels = range(0,3).map((idx) => {
        return ({
            'recon': process.env.PUBLIC_URL + '/imgs/results/' + task + '/recon_ker_'+idx+'.png',
            'truth': process.env.PUBLIC_URL + '/imgs/results/' + task + '/truth_ker_'+idx+'.png',
        });
    });

    return (
        <Grid container spacing={2} style={{margin: "1rem 0"}}>
            <Grid item xs={8}>
                <Carousel images={images} index={index} onButton={setIndex}/>
            </Grid> 
            <Grid item xs={4}>
                <GridKernel task={task} kernels={kernels[index]} />
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