import React, { Component } from 'react';
import axiosInstance from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import classes from './Posts.module.css';
import Spinner from '../../../components/Spinner/Spinner';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
        mounted: false
    }

    componentDidMount() {
        console.log(this.props);
        this.mounted = true;
        //const proxyurl = "https://cors-anywhere.herokuapp.com/"
        const url = "/posts"
        axiosInstance.get(url)
            //fetch(url + proxyurl)
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Kyle',
                    }
                });
                this.setState({ posts: updatedPosts });
                // console.log(response);
            })
            .catch(error => {
                console.log(error + " can't access url response. Blocked by browser?");
                //this.setState({ error: true });
            });
    }

    postClickedHandler = (id) => {
        //this.props.history.push({ pathname: '/' + id });
        this.props.history.push('/posts/' + id);
    }

    render() {
        let posts = <Spinner value='Loading...' />
        if (this.mounted) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} 
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postClickedHandler(post.id)} />
                    // </Link>);
                );
            });
        }
        if (this.state.error) {
            posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        }
        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
                {/*    : signifies a dynamic variable    */}
            </div>
        );
    }
}

export default Posts;