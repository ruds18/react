import React, { Component } from 'react'
import './styles/Joke.css'
export default class Jokes extends Component {
    render() {
        return (
            <div className="joke">
                <div className="joke-buttons">
                    <i className=" fas fa-arrow-up" onClick={this.props.upvote}></i>
                    <span className="joke-votes">{this.props.votes}</span>
                    <i className=" fas fa-arrow-down" onClick={this.props.downvote}></i>
                </div>
                <div className="joke-text">
                   {this.props.text}
                </div>
                <div className="joke-emoji">
                <i class="em em-rolling_on_the_floor_laughing" aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
                </div>
            </div>
        )
    }
}
