import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import classes from './Blog.module.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
    render() {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/"
                                exact
                                activeClassName={classes.active}
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Home
                                </NavLink></li>
                            <li><NavLink
                                activeClassName={classes.active}
                                to={{
                                    pathname: "/new-post", //this always generates an absolute path, not a relative path
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post
                                </NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/:id" exact component={FullPost} />
                    {/*    : signifies a dynamic variable    */}
                </Switch>
            </div>
        );
    }
}

export default Blog;