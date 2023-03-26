import { Button } from "@mui/material";
import React, {Component} from "react";
import { VscGithub } from "react-icons/vsc"
import {FaFilePdf} from "react-icons/fa"
import {SiArxiv} from "react-icons/si"

const AuthorBlock = (props) => (
    <span className="author-block">
        <a href={props.link}>{props.name}</a>
        <sup>{props.number}</sup>,
    </span>
)

const LinkButton = (props) => (
    <Button sx={{m: '0.3rem'}}
            style={{
                borderRadius: 35,
                backgroundColor: "black",
                padding: "0.5rem 1.0rem"
            }}
            href={props.link}
            variant="contained"
            startIcon={props.icon}>
        {props.text}
    </Button>
);

export default class Header extends Component{
    render(){
        return (
            <section className="hero information">
                <div className="container is-max-desktop">
                    <div className="columns is-centered">
                        <div className="column has-text-centered">
                            <h1 className="title is-1 publication-title">
                                Parallel Diffusion Model of Operator and Image for Blind Inverse Problems
                            </h1>
                            <div className="is-size-5 publication-authors">
                                <AuthorBlock name="Hyungjin Chung" link="https://hj-chung.com" number="*" />
                                <AuthorBlock name="Jeongsol Kim" link="https://jeongsol.dev" number="*" />
                                <AuthorBlock name="Sehui Kim" link="https://bispl.weebly.com/members.html" />
                                <AuthorBlock name="Jong Chul Ye" link="https://bispl.weebly.com/professor.html"  />
                            </div>
                            <div className="is-size-5 publication-authors">
                                <span className="author-block">Korea Advanced Institute of Science & Technology (KAIST),</span>
                                <br></br> 
                                <span className="author-block-small">* Equal contribution</span>
                            </div>
                            {/*Publication links*/}
                            <div className="column has-text-centered">
                                <LinkButton link={"."} icon={<FaFilePdf />} text="Paper"/>
                                <LinkButton link={"https://arxiv.org/abs/2211.10656"} icon={<SiArxiv />} text="arXiv"/>
                                <LinkButton link={"https://github.com/BlindDPS/blind-dps"} icon={<VscGithub />} text="Code"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
