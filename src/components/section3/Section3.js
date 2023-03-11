import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

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

const TaskButtons = () => {

    const [task, setTask] = useState('gaussian');

    const onTaskToggle = (button_val) => {
        setTask(button_val);
    };

    const tasks = ["gaussian", "motion", "turbulence"];

    return (
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
    );
}

const Content = () => {
    return (
        <div>
            <h2 className="title is-3">Reconstruction Result</h2>
            <TaskButtons />
        </div>
    );
}

const Section3 = () => {
    return (
        <CenterWrapper content={<Content />}/>
    );
}

export default Section3