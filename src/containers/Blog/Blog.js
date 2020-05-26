import React, { Component } from 'react';
import axiosInstance from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.module.css';
import Spinner from '../../components/Spinner/Spinner';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
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
                //console.log(error);
                this.setState({ error: true });
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
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;