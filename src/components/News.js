import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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
      page:1
    }
    document.title=`${this.capitalize(this.props.category)} - NewsMonkey`;
  }
  async updateNews(pageNo){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8a02efb50db4d20ba7ff9df3629ef79&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData =await data.json()
    console.log(parseData);
    this.setState({articles: parseData.articles, loading:false})
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
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey - Top Headlines On {this.capitalize(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        
        <div className="row">
        {this.state.articles.map((element)=>{ 
          return <div className="col-md-4 " key={element.url}>
          <NewsItem  title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
        })}
            
            
        </div>
        <div className="container d-flex justify-content-between" >
        <button disabled={this.state.page<=1}type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous </button>
        <button disabled={this.state.page>=4} type="button" class="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
        
          </div> 
         
      </div>
    )
  }
}

export default News
