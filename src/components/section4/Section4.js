import React, {useState} from "react";
import { Grid, Slider, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { GiBackwardTime } from "react-icons/gi"
import Chart from "react-apexcharts";
import { MathJax } from 'better-react-mathjax';

let _ = require('lodash');

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

const ErrorGraph = ({data, task}) => {
    let color = (task==="deblur") ? "#d4526e":"#33b2bf";
    let state = {
        series: data,
        options: {
            chart: {
            height: '10rem',
            type: 'rangeArea',
            animations: {
                // speed: 500
                enabled: false
            },
        },
        grid: {show: false},
        zoom: {enabled: false},
        xaxis: {
            overwriteCategories: ["1000", "900", "800", "700", "600", "500", "400", "300", "200", "100", "0"],
            tickAmount: 10,
            max:1000,
        },
        yaxis: {
            title: {
              text: 'Residue'
            }
          },
        colors: [color, color],
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: [0.24, 1]
        },
        legend: {
            show: false
        },
        stroke: {
          curve: 'straight',
          width: [0, 2]
        },
        tooltip: {
            x: {
                formatter: function(value) {
                    return 't='+ (1000-value).toString();
                },
            },
        }
      },
    }
    
    return (
    <div>
        <Chart options={state.options} series={state.series} type="rangeArea" height="300rem"/>
    </div>);
};


function generate_path(task, time){
    let base = process.env.PUBLIC_URL + '/imgs/progress/' + task
    let time_str = (typeof time === 'number') ? time.toString():time;
    let number = time_str.padStart(4, '0');

    return {
        'img_input': base + '/io/input.png',
        'img_progress': base + '/img/x0_' + number + '.png',
        'ker_progress': base + '/ker/x0_' + number + '.png',
        'img_label': base + '/io/truth.png',
        'ker_label': base + '/io/truth_ker.png'
    }
}

const ImageGrid = ({task, time}) => {
    let paths = generate_path(task, 1000-time);
    return (
        <Grid container spacing={2} direction='row'>
            <Grid item xs={4} sm={4}>
                <p style={{fontWeight: "bold"}}>Input</p>
                <div style={{display: 'flex'}}>
                    <img alt='input' src={paths['img_input']} loading="lazy" />
                </div>
            </Grid>
            <Grid item xs={4} sm={4}>
                <p><MathJax>{"$ \\mathbf{\\hat{x}_0}$"}</MathJax></p>
                <div style={{display: 'flex'}}>
                    <img alt='x0' src={paths['img_progress']} loading="lazy"/>
                </div>
            </Grid>
            <Grid item xs={4} sm={4}>
                <p style={{fontWeight: "bold"}}>Truth</p>
                <div style={{display: 'flex'}}>
                    <img alt='truth' src={paths['img_label']} loading="lazy"/>
                </div>
            </Grid>
        </Grid>
    );
}

const KernelGrid = ({task, time}) => {
    let paths = generate_path(task, 1000-time);
    return (
        <Grid container spacing={2} direction='row'>
            <Grid item xs={4} sm={4} style={{display: 'flex'}}>
                {/* <img alt='input' src={paths['ker_input']}/> */}
            </Grid>
            <Grid item xs={4} sm={4} style={{display: 'flex'}}>
                <img alt='x0' src={paths['ker_progress']}/>
            </Grid>
            <Grid item xs={4} sm={4} style={{display: 'flex'}}>
                <img alt='truth' src={paths['ker_label']}/>
            </Grid>
        </Grid>
    );
}

const Content = () => {
   
    const [time, setTime] = useState(1000);
    const [task, setTask] = useState("deblur");
    const tasks = ['deblur', 'turbulence'];
    const data = {'deblur': require('./deblur_data.json'),
                  'turbulence': require('./turbulence_data.json')};
    const [partialData, setPartialData] = useState(data['deblur']);

    function sliceData(idx, task){
        let discrete_idx = parseInt(idx/10);
        let current = _.cloneDeep(data[task]);
        if (discrete_idx > 2){
            current[0].data = current[0].data.slice(0, discrete_idx);
            current[1].data = current[1].data.slice(0, discrete_idx);
        }
        return current;
    }

    const handleSlider = (e, v) => {
        setTime(v);
        setPartialData(sliceData(v, task))
    }
    
    const onTaskToggle = (task) => {
        setTask(task);
        setPartialData(sliceData(time, task));
    }

    return (
        <div>
            <h2 className="title is-3">Progress and Estimation Error</h2>
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
            <div style={{margin: "2rem"}}></div>
            <ErrorGraph data={partialData} task={task}/>

            <MathJax>
                <p>Measured on 20 samples. Mean {'$\\pm 1.0\\sigma$'} is displayed.</p>
            </MathJax>
            
            <Grid container direction="column">
                <Grid item>
                    <ImageGrid time={time} task={task}/>
                </Grid>
                <Grid item>
                    <KernelGrid time={time} task={task}/>
                </Grid>
            </Grid>
            
            <Stack direction="row" spacing={2} style={{padding:'2rem 0 0 0'}} sx={{mb:1}} alignItems="center">
                <GiBackwardTime />
                <Slider defaultValue={0} step={20} min={0} max={1000} onChange={handleSlider}/>
            </Stack>
            <p style={{ margin: 0, fontSize:'0.8rem'}}>⎻⎻⎻ Drag time slider ⎻⎻→</p>

        </div>
    )
}

const Section4 = () => {
    return (
        <CenterWrapper content={<Content />} />
    );
}

export default Section4;


// slide value에 따라서 load하는 값을 조정.
