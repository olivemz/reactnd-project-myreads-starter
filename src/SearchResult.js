import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'

class SearchResult extends Component{

  static propType = {
    searchBook: PropTypes.array.isRequired,
    searchResult: PropTypes.array.isRequired,
    listBooks: PropTypes.array.isRequired
  }

  searchBook = (event) => {
    if (this.props.searchBook)
      this.props.searchBook(event.target.value)
  }

  checkBookShelf = (bookId) => {
    let books = this.props.listBooks
    let foundBook = books.filter((book) => bookId == book.id)
    if (foundBook.length > 0)
       return foundBook[0].shelf
    else
       return 'none'
  }

  render(){
    const {searchBook, searchResult, moveToOtherShelf, listBooks} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
           to="/"
           className="close-search"
           >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <Debounce time="200" handler="onChange">
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBook(event)}/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            (searchResult && searchResult.length > 0)&& (searchResult.map((book) =>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book != undefined && book.imageLinks!=undefined && book.imageLinks.smallThumbnail != undefined)&&(`url(${book.imageLinks.smallThumbnail})`) }}></div>
                    <div className="book-shelf-changer">
                      <select value={this.checkBookShelf(book.id)} onChange={(event) => moveToOtherShelf(event.target.value , book)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{(book.title !== undefined)&&book.title}</div>
                  <div className="book-authors">{(book.authors !== undefined)&& book.authors.join(" and ")}</div>
                </div>
              </li>
            )))
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchResult
