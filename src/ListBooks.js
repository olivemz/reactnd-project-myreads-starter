import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function BookShelf ({title, bookLists , container, moveToOtherShelf}){
    return (<div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">

                {bookLists.length > 0 && bookLists.filter((book) => container.includes(book.id)).map((book) =>(
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book != undefined && book.imageLinks!=undefined && book.imageLinks.smallThumbnail != undefined)&&(`url(${book.imageLinks.smallThumbnail})`) }}></div>
                                <div className="book-shelf-changer">
                                    <select value="read" onChange={(event) => moveToOtherShelf(event.target.value , book)}>
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
                ))
                }
            </ol>
        </div>
    </div>)
}

class ListBooks extends Component{
  static propType = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    bookLists: PropTypes.array.isRequired
  }

  render(){
    const { bookLists, currentlyReading, read, wantToRead, moveToOtherShelf } = this.props
    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        <div>
          <BookShelf
              title='Currently Reading'
            bookLists={bookLists}
            container={currentlyReading}
            moveToOtherShelf = {moveToOtherShelf}
          />
            <BookShelf
                title='Want to read'
                bookLists={bookLists}
                container={wantToRead}
                moveToOtherShelf = {moveToOtherShelf}
            />

          <BookShelf
                title='Read'
                bookLists={bookLists}
                container={read}
                moveToOtherShelf = {moveToOtherShelf}
            />
        </div>
      </div>

      <div className="open-search">
        <Link
          to='/search'
        >Add a book</Link>
      </div>
      </div>
  )
  }
}

export default ListBooks
