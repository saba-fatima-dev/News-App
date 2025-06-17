// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  static defaultProps = {
    category: 'general',
    pageSize: 6
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    // console.log("News Component constructor called");
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsPanda`;
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=17110a04110142b1a9dd693739f7ddb8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults, 
      loading: false});
  }

  async componentDidMount() {
    // console.log("News Component did mount called");
    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=17110a04110142b1a9dd693739f7ddb8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });
      this.updateNews();
  }

  handlePrevClick = async()=>{
    // console.log("Previous button clicked");

    // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=17110a04110142b1a9dd693739f7ddb8&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //     loading: false
    // })
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async()=>{
    // console.log("Next button clicked");
    // if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=17110a04110142b1a9dd693739f7ddb8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   // console.log(parsedData);

    //   this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page + 1,
    //     loading: false
    //   })
    // }
    this.setState({page: this.state.page + 1});
    this.updateNews();
    console.log("Next button clicked", this.state.page);
  }

  render() {
    // console.log("News Component render called");
    return (
      <>
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "35px 0px"}}>NewsPanda - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4 mb-3" key={element.url}>
              <NewsItem 
              title={element.title?element.title.slice(0, 45):""} 
              description={element.description?element.description.slice(0, 70):""} 
              imageUrl={element.urlToImage?element.urlToImage:"https://tse2.mm.bing.net/th/id/OIP.EjAL2jn03BXr8OOlqUFm7gHaEK?rs=1&pid=ImgDetMain"} 
              newsUrl={element.url} 
              author={element.author}
              date={element.publishedAt}
              />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>
          <button disabled={this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr; </button>
        </div>
      </div>
      </>
    )
  }
}

export default News