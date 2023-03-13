import React, { useState } from "react";
import { Stack, Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
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

const Carousel = ({images, kernels, task, index, onButton}) => {
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

    return (
            <Grid container direction="column" style={{margin: '1.5rem 0 0 0'}}>
                <Grid container direction="row">
                    <Grid item xs={8} md={8} sm={8}>
                        <p style={{margin: '0 1rem 0 0', fontWeight: 'bold'}}>Input → Reconstruction</p>
                        <ReactSwipe
                            className="carousel"
                            swipeOptions={{continuous: true}}
                            ref={el => (reactSwipeEl = el)}
                            childCount={images.length}
                            >
                            {images.map((image_pair) => {
                                return (
                                    <div>
                                        <IamgeComareSlider imgs={image_pair}/>
                                    </div>
                                );
                                })}
                        </ReactSwipe>
                    </Grid>
                    <Grid item xs={4} md={4} sm={4}>
                        <div style={{margin: '0 0 0 1.4rem'}}>
                            <GridKernel task={task} kernels={kernels[index]} />
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs style={{margin: '1rem 0 0 0'}}>
                    <Stack justifyContent="center" alignItems="center" direction="row" spacing={2}>
                        <Button startIcon={<AiFillLeftCircle />} variant={"outlined"} onClick={() => pushPrev()}> Prev </Button>
                        <Button endIcon={<AiFillRightCircle />}variant={"outlined"} onClick={() => pushNext()}> Next </Button>
                    </Stack>
                </Grid>
            </Grid>
    );
}

const GridKernel = ({kernels}) => {
    return (
        <Grid item xs >
            <Grid item md={6}>
                <Stack direction="column" style={{display: 'flex'}}>
                <p style={{fontSize: "1rem", fontWeight:"bold", margin:0}}>Estimated</p>
                <img id="method"
                    src={kernels.recon}
                    alt={"loading.."}/>
                </Stack>
            </Grid>
            <Grid item md={6} >
                <Stack direction="column" style={{display: 'flex'}}>
                    <p style={{fontSize: "1rem", fontWeight:"bold", margin:'1rem 0 0 0'}}>Truth</p>
                    <img id="method"
                        src={kernels.truth}
                        alt={"loading.."}/>
                </Stack>
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
        <Carousel images={images} kernels={kernels} task={task} index={index} onButton={setIndex}/>
    )
}


const Content = () => {
    const tasks = ['gaussian', 'motion', 'non-sparse'];
    const [task, setTask] = useState('motion');

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