import React, { Component } from "react";
import axios from "axios";
import "../components/styles/JokeList.css";
import Jokes from "./Jokes";
import { v4 as uuidv4 } from "uuid";
const API_URL = "https://icanhazdadjoke.com/";
export default class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
    };
    this.handelClick = this.handelClick.bind(this);
    this.getJokes = this.getJokes.bind(this)
  }

  async componentDidMount() { 
      const jokes = [];
      if(this.state.jokes.length === 0){
    this.getJokes();
  }}
   
  handelVote = (id, number) => {
    this.setState((st) => ({
      jokes: st.jokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + number } : joke
      ),
    }));
  };

   handelClick () {
     this.setState({isLoading: true}, this.getJokes)

  }

   async getJokes () {
    let jokes= []
    while (jokes.length < 10) {
      let res = await axios.get(API_URL, {
        headers: { Accept: "application/json" },
      });
      jokes.push({ id: uuidv4(), joke: res.data.joke, votes: 0 });
    }
    this.setState({
      isLoading: false,
      jokes: jokes,
    });
    window.localStorage.setItem("jokes", JSON.stringify(jokes));
  }

  render() {
    const jokes = this.state.jokes.map((joke) => {
      return (
        <Jokes
          upvote={() => this.handelVote(joke.id, 1)}
          downvote={() => this.handelVote(joke.id, -1)}
          key={joke.id}
          votes={joke.votes}
          text={joke.joke}
        ></Jokes>
      );
    });

    if(this.state.isLoading){
      return (
        <div className="loader">
            <i className="far fa-8x fa-laugh fa-spin loader-icon"></i>
            <h1 className="jokeList-title">Loading....</h1>
        </div>
      )
    }
    return (
      <div className="jokeList">
        <div className="jokeList-sidebar">
          <h1 className="jokeList-title">
            <span>Ruds</span> Jokes!
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button className="jokeList-getmore" onClick={this.handelClick}>New Jokes</button>
        </div>

        <div className="jokeList-jokes">{jokes}</div>
      </div>
    );
  }
}
