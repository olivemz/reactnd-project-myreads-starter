import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchResult from './SearchResult'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     // TODO

    showSearchPage: false,
    currentlyReading: [],
    read: [],
    wantToRead: [],
    bookLists:[]
  }

  // initialize state when reload.
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
        let currentlyReading = []
        let read = []
        let wantToRead = []
        let bookLists = []
        books.map(function(book){
          bookLists.push(book)
          switch (book.shelf) {
          case 'currentlyReading':
            currentlyReading.push(book.id);
            break;
          case 'read':
            read.push(book.id);
            break;
          case 'wantToRead':
            wantToRead.push(book.id);
            break;
          default:
        }})
        this.setState({currentlyReading,read,wantToRead,bookLists})
    })
  }

  moveToOtherShelf = (shelfName, book) => {
    BooksAPI.update(book, shelfName).then((books)=>{
      this.setState(books)
    })
  }

  searchBook = (searchContent) => {
    BooksAPI.search(searchContent).then((books) => {
      this.setState({
        searchResult:books
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            bookLists={this.state.bookLists}
            currentlyReading={this.state.currentlyReading}
            read={this.state.read}
            wantToRead={this.state.wantToRead}
            moveToOtherShelf={this.moveToOtherShelf}
          />
        )}/>

        <Route path='/search' render={({ history }) => (
          <SearchResult
            searchBook={(searchContent) => {
              this.searchBook(searchContent)
            }}
            listBooks={this.state.bookLists}
            searchResult={this.state.searchResult}
            moveToOtherShelf={this.moveToOtherShelf}
          />
      )}/>
      </div>
    )
  }
}

export default BooksApp
