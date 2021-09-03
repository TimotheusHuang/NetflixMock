import React from 'react'
import Movies from "./Movies";
import './App.css'


class TitleList extends React.Component {
    constructor(props) {
      super(props); 
      this.state = {
        myList: Movies.myList,
        recommendations: Movies.recommendations
      };
    }

    handleRemove = (movieId) => {
        var myList = {...this.state.myList};
        var recommendations = {...this.state.recommendations};
        var tempMyList = Object.keys(myList).map(
            (key) => myList[key]
         );
        var tempRecommendations = Object.keys(recommendations).map(
            (key) => recommendations[key]
         );

        const j = tempMyList.findIndex(movie => movie.id === movieId);
        tempRecommendations.unshift(tempMyList[j]);
        tempMyList.splice(j, 1);
        // tempMyList = JSON.parse(JSON.stringify(tempMyList));
        // tempRecommendations = JSON.parse(JSON.stringify(tempRecommendations));
        
        this.setState({
            myList: tempMyList,
            recommendations: tempRecommendations
        });        
    }

    handleAdd = (movieId) => {
        var myList = {...this.state.myList};
        var recommendations = {...this.state.recommendations};
        const tempMyList = Object.keys(myList).map(
            (key) => myList[key]
         );
        const tempRecommendations = Object.keys(recommendations).map(
            (key) => recommendations[key]
         );

        const j = tempRecommendations.findIndex(movie => movie.id === movieId);
        tempMyList.unshift(tempRecommendations[j]);
        tempRecommendations.splice(j, 1);

        this.setState({
            myList: tempMyList,
            recommendations: tempRecommendations
        });   
    }

    render() {
        var moviesMy = "";
        var moviesRec = "";
        moviesMy = this.state.myList.map(movie => {
            return (
                <div className="Item" style={{backgroundImage: 'url(' + movie.img+ ')'}}> 
                    <div className="overlay">
                        <div className="title">{movie.title}</div>
                        <button 
                            onClick={this.handleRemove.bind(this, movie.id)}
                            style={{
                                width: "80px",
                                fontSize: "16px",
                                borderRadius: "40px",
                                border: "1px solid black",
                                color: "#fafafa",
                                textAlign: 'center',
                                margin: "0.5em 0em",
                                padding: "0.25em 0.5em",
                                background: "#c83f49",}}
                        >Remove</button>
                    </div>
                </div>
            );
        });
        moviesRec = this.state.recommendations.map(movie => {
            return (
                <div className="Item" style={{backgroundImage: 'url(' + movie.img+ ')'}}> 
                    <div className="overlay">
                        <div className="title">{movie.title}</div>
                        <button 
                            onClick={this.handleAdd.bind(this, movie.id)}
                            style={{
                                width: "80px",
                                fontSize: "16px",
                                borderRadius: "40px",
                                border: "1px solid black",
                                color: "#fafafa",
                                textAlign: 'center',
                                margin: "0.5em 0em",
                                padding: "0.25em 0.5em",
                                background: "#c83f49",}}
                        >Add</button>
                    </div>
                </div>
            );
        });

        return (
            <div ref="titlecategory" className="TitleList" >
                <div className="Title">
                    <h1>My List</h1>
                    <div className="titles-wrapper">
                    {moviesMy}
                    </div>
                    <h1>Recommendations</h1>
                    <div className="titles-wrapper">
                    {moviesRec}
                    </div>
                    <h1>List of Titles in My List</h1>
                    <ol style={{
                            fontSize: "20px",
                            color: "#7B9BCC"}}>
                        {this.state.myList.map((item, index) => <li key={index}>{item.title}</li>)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default TitleList