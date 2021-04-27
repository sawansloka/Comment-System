import React, { Component } from 'react';
import ReplyImage from './accounts/ReplyImage.png';
import ProfileImage from './accounts/ProfileImage.png';
import SearchImage from './accounts/SearchImage.png';

import './App.css';
const axios = require('axios');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      users: [],
      searchedComments: [],
      isSearch: false,
      user: '',
      SearchComment: '',
      searchedFor: '',
    };
  }

  componentDidMount = async () => {
    await axios.get('/view-comments').then(res => {
      console.log(res.data);
      this.setState({ users: res.data.users });
    });
  };
  AddComment = async (Comment, Reply) => {
    await axios
      .post('/add-comment', {
        Name: this.state.Name || 'USER',
        Comment: Comment,
        Reply: Reply,
      })
      .then(res => {
        this.setState({
          user: '',
          users: [...this.state.users, res.data.Comment],
        });
      });
  };

  SearchComment = async SearchComment => {
    await axios
      .post('/search-comment', {
        SearchComment: SearchComment,
      })
      .then(res => {
        let searchedComments = res.data.searched;
        for (const Comment of res.data.searched) {
          if (Comment.Reply !== 'All') {
            let th = this.state.users.find(msg => msg._id === Comment.Reply);

            let found = searchedComments.find(msg => msg._id === th._id);

            if (!found) {
              searchedComments.push(th);
            }
          }
        }
        this.setState({
          SearchComment: '',
          searchedComments: searchedComments,
          searchedFor: SearchComment,
          isSearch: true,
        });
      });
  };
  DateFormat = date => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour24: true,
    });
  };
  threadcomments = users => {
    let commentarray;
    commentarray = users.map(Ct => {
      return (
        <div>
          <div className="row">
            <span className="time">{this.DateFormat(new Date(Ct.date))}</span>{' '}
            <br />
            <div className="col-mid-4">
              <img
                src={ProfileImage}
                alt="profileicon"
                className="ProfileIcon"
              />
            </div>
            <div className="col-md-4">
              <span className="Name">{Ct.Name} </span>
              <br />
            </div>
            <div className="col-md-4">
              <span className="Comment">{Ct.Comment}</span>
            </div>
          </div>
        </div>
      );
    });
    return commentarray;
  };
  thread = allComments => {
    let threadArray, reply;

    if (allComments !== []) {
      const threads = allComments.filter(Comment => Comment.Reply === 'All');
      threadArray = threads.map(th => {
        const users = allComments.filter(Comment => Comment.Reply === th._id);

        return (
          <div className="CommentBox">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={ProfileImage}
                  alt="profileicon"
                  className="ProfileIcon"
                />
              </div>
              <div className="col-md-4">
                <span className="Name">{th.Name} </span>
                <br />
              </div>
              <div className="col-md-4">
                <span className="Comment">{th.Comment}</span>
              </div>
              <span className="time">{this.DateFormat(new Date(th.date))}</span>{' '}
              <br />
            </div>
            {this.threadcomments(users)}
            <div>
              <textarea
                type="text"
                className="txtarea"
                id="txt"
                rows="2"
                placeholder="Reply..."
                value={reply}
                onChange={event => (reply = event.target.value)}
              />
              <img
                src={ReplyImage}
                alt="replyicon"
                className="replyicon"
                onClick={() => {
                  this.AddComment(reply, th._id);
                }}
              />
            </div>
          </div>
        );
      });
    }
    return threadArray;
  };
  render() {
    return (
      <div>
        {' '}
        <h1>Comment-System</h1>
        <div class="static">
          <div>
            <input
              className="AddName"
              type="text"
              placeholder="Add your name"
              arial-label="SearchComment"
              value={this.state.Name}
              onChange={event => {
                this.setState({ Name: event.target.value });
              }}
            />
          </div>
          <div>
            <form>
              <input
                className="Search"
                type="text"
                placeholder="Search..."
                arial-label="SearchComment"
                value={this.state.SearchComment}
                onChange={event => {
                  this.setState({ SearchComment: event.target.value });
                }}
              />

              <img
                src={SearchImage}
                alt="searchicon"
                className="searchicon"
                onClick={() => this.SearchComment(this.state.SearchComment)}
              />
            </form>
          </div>
        </div>
        <br></br>
        <p>
          <textarea
            type="text"
            className="txtarea"
            id="txt"
            rows="2"
            placeholder="Add new comment..."
            value={this.state.user}
            onChange={event => {
              this.setState({ user: event.target.value });
            }}
          />
          <img
            src={ReplyImage}
            alt="replyicon"
            className="replyicon"
            onClick={() => this.AddComment(this.state.user, 'All')}
          />
        </p>
        {this.state.isSearch === true && (
          <div className="search-filter">
            <h4 className="searched-for">You Searched For </h4>
            <h3 classname="Searchcmpt">"{this.state.searchedFor}"</h3>
            <button
              type="button"
              className="searchbtn"
              onClick={() => this.setState({ isSearch: false })}
            >
              Erase Searched
            </button>
          </div>
        )}
        {this.state.isSearch === false && this.thread(this.state.users)}
        {this.state.isSearch === true &&
          this.thread(this.state.searchedComments)}
      </div>
    );
  }
}
