import React, { Component } from 'react'
import axios from 'axios'
import '../components/styles/JokeList.css'
import Jokes from './Jokes';
import { v4 as uuidv4 } from 'uuid'
const API_URL = "https://icanhazdadjoke.com/"
export default class JokeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes: []
        }
    }

    async componentDidMount() {
        const jokes = []
        while (jokes.length < 7) {
            let res = await axios.get(API_URL, { headers: { Accept: "application/json" } })
            jokes.push({ id: uuidv4() ,joke: res.data.joke, votes:0})
        }
        this.setState({
            jokes: jokes
        })
    }
    handelVote = (id, number) => {
    this.setState(
      st => ({
        jokes: st.jokes.map(joke =>
          joke.id === id ? { ...joke, votes: joke.votes + number} : joke
        )
      })
    )
    
    }
    render() {
        const jokes = this.state.jokes.map(joke => {
            return (
                <Jokes upvote={()=> this.handelVote(joke.id,1)} downvote={()=> this.handelVote(joke.id, -1)} key={joke.id} votes={joke.votes} text={joke.joke}></Jokes>
            )
        })
        return (
            <div className="jokeList">
                <div className="jokeList-sidebar">
                    <h1 className="jokeList-title"><span>Ruds</span> Jokes!</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className="jokeList-getmore">New Jokes</button>
                    </div>

                <div className="jokeList-jokes">{jokes}</div>

            </div>
        )
    }
}
