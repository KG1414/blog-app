import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axiosInstance from '../../../axios';
import Spinner from '../../../components/Spinner/Spinner';
import classes from './Posts.module.css';

class Posts extends Component {
    state = {
        posts: [],
        mounted: false
    }

    componentDidMount() {
        this.mounted = true;
        axiosInstance.get('https://jsonplaceholder.typicode.com/posts')
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
                console.log(error);
                //this.setState({ error: true });
            });
    }

    postClickedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}><Spinner />Loading...</p>;
        if (this.mounted) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postClickedHandler(post.id)} />
            });
        };
        if (this.state.error) {
            posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        }
        return (
            <section className={classes.Posts}>
                {posts}
            </section>
        );
    }
}

export default Posts;