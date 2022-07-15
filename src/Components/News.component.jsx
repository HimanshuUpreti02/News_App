import React, { Component } from "react";
import NewsItem from "./NewsItem.component";
import Spinner from "./Spinner.component";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 5,
    country: "in",
  }

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
    country: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults:0
    };
  }

  componentDidMount() {
    this.props.setProgress(10);
    this.setState({
      loading: true,
    });
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=5d1b41c1eb08430e8d3505df5727ef22&page=1&pageSize=${this.props.pageSize}`
    )
      .then((response) => response.json())
      .then((value) =>
        
        this.setState(() => {
          return {
            articles: value.articles,
            totalResults: value.totalResults,
            loading: false,
          };
        },()=>{
          this.props.setProgress(100);
        }),
        
      );
    
    
  }

  fetchMoreData = async()=>{
    this.setState({
      page:this.state.page+1
    })

    fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=5d1b41c1eb08430e8d3505df5727ef22&page=${this.state.page}&pageSize=${this.props.pageSize}`
    )
      .then((response) => response.json())
      .then((value) =>
        this.setState(() => {
          return {
            articles: this.state.articles.concat(value.articles),
            totalResults: value.totalResults,
            loading: false,
          };
        })
      );
  }

  

  render() {
    let { country, category, pageSize } = this.props;
    return (
      <>
        <h1 className="text-center">News App</h1>
        <div className="text-center">{this.state.loading && <Spinner />}</div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.publishedAt}>
                    {/* news item component starts here */}
                    <NewsItem
                      title={
                        element.title
                          ? element.title.slice(0, 45)
                          : "Lorem ipsum dolor sit amet, consectetuer a,"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 75)
                          : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo li"
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://media.istockphoto.com/vectors/newspaper-vector-id165977597?k=20&m=165977597&s=612x612&w=0&h=D7QXE1Ckz--_Cc8NWP2rL35PmF_B79dp_HkzYLsjjAc="
                      }
                      url={element.url}
                    />
                    {/* newsitem component ends here */}
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
    
  }
}

export default News;
































// next and previous button functionalities

// handleNextClick = async () => {
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     this.setState({
  //       loading: true,
  //     });
  //     fetch(
  //       `https://newsapi.org/v2/top-headlines?country=${
  //         this.props.country
  //       }&category=${
  //         this.props.category
  //       }&apikey=5d1b41c1eb08430e8d3505df5727ef22&page=${
  //         this.state.page + 1
  //       }&pageSize=${this.props.pageSize}`
  //     )
  //       .then((response) => response.json())
  //       .then((value) => value.articles)
  //       .then((data) =>
  //         this.setState({
  //           articles: data,
  //           page: this.state.page + 1,
  //           loading: false,
  //         })
  //       );
  //   }
  // };

  // handlePrevClick = async () => {
    
  //   fetch(
  //     `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${
  //       this.props.category
  //     }&apikey=5d1b41c1eb08430e8d3505df5727ef22&page=${
  //       this.state.page - 1
  //     }&pageSize=${this.props.pageSize}`
  //   )
  //     .then((response) => response.json())
  //     .then((value) => value.articles)
  //     .then((data) =>
      
  //       this.setState({
  //         articles: data,
  //         page: this.state.page - 1,
  //         loading: false,
  //       })
  //     );
  // };