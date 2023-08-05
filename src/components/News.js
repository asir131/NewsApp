import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category: 'general',
  }
  static propTypes={
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

 capitalize=(s)=>
        {
            return s[0].toUpperCase() + s.slice(1);
        }
  constructor(props){
    super(props);
    console.log("Hello constructor from news Comp")
    this.state={
      articles:[],
      loading:false,
      page:1,
      totalResults:0,
    }
    document.title=`${this.capitalize(this.props.category)} - NewsMonkey`;
  }
  async updateNews(pageNo){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8a02efb50db4d20ba7ff9df3629ef79&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData =await data.json()
    this.props.setProgress(50);
    console.log(parseData);
    this.setState({articles: parseData.articles, loading:false, totalResults:parseData.to})
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updateNews();
    
  }
   handlePrevClick=async()=>{
    
    this.setState({page: this.state.page-1});
    this.updateNews();
  }
   handleNextClick=async()=>{
   
    this.setState({page: this.state.page+1});
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8a02efb50db4d20ba7ff9df3629ef79&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parseData =await data.json()
    console.log(parseData);
    this.setState({articles:this.state.articles.concat(parseData.articles), totalResults:parseData.to})
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey - Top Headlines On {this.capitalize(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          
          <div className="container">
          <div className="row">
            {this.state.articles.map((element)=>{ 
              return <div className="col-md-4 " key={element.url}>
              <NewsItem  title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
              </div>
            })}
        
            
            
        </div>
          </div>
            
        </InfiniteScroll>
        
         
      </div>
    )
  }
}

export default News
