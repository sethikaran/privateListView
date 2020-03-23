import React, { Component } from "react";
import "./App.css";
import PlayerList from "./components/PlayerList/PlayerList";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "./axios-default";
import Spinner from "./UI/Spinner/Spinner";
import NationalitySummary from "./components/NationalitySummary/NationalitySummary";

class App extends Component {
  state = {
    players: [],
    searchResult: [],
    loading: true,
    columns: [
      { name: "number", label: "Number" },
      { name: "name", label: "Name" },
      { name: "pos", label: "Position" },
      { name: "nat", label: "Nationality" },
      { name: "height", label: "Height" },
      { name: "weight", label: "Weight" },
      { name: "dob", label: "DOB (yyyy-mm-dd)" },
      { name: "birthplace", label: "City of Birth" }
    ],
    error: null
  };

  componentDidMount() {
    axios
      .get("/players")
      .then(res => {
        const fetchedPlayers = [];
        for (let key in res.data) {
          fetchedPlayers.push({
            ...res.data[key]
          });
        }
        this.setState({
          loading: false,
          players: fetchedPlayers,
          searchResult: fetchedPlayers
        });
      })
      .catch(err => {
        this.setState({ loading: false, error: err });
      });
  }

  onSearchTextChange = event => {
    const input = event.target.value.trim().toLowerCase();
    if (input.length === 0) {
      this.setState({ searchResult: [...this.state.players] });
    } else {
      this.setState({
        searchResult: this.state.players.filter(player => {
          let result = false;
          Object.keys(player).forEach(key => {
            if (
              player[key]
                .toString()
                .toLowerCase()
                .indexOf(input) !== -1
            ) {
              result = true;
              return;
            }
          });
          return result;
        })
      });
    }
  };

  render() {
    let playersData = <Spinner />;

    if (!this.state.loading) {
      if (this.state.error) {
        playersData = (
          <div className="App-intro">
            Unable to show players Data <br />
            {this.state.error.message}
          </div>
        );
      } else {
        playersData = (
          <div className="App-intro">
            <SearchBar onChange={event => this.onSearchTextChange(event)} />
            <NationalitySummary players={this.state.searchResult} />
            <PlayerList
              players={this.state.searchResult}
              columns={this.state.columns}
            />
          </div>
        );
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">AppNeta</h1>
        </header>
        {playersData}
      </div>
    );
  }
}

export default App;
