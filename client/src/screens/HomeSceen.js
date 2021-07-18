import React from "react";
import PostCard from "../components/PostCard";
import { Grid,Loader } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const HomeScreen = () => {
  //   Fetching posts from backend
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return <Loader active inline="centered"/>;
  }

  const { getPosts: posts } = data;

  if (!posts) {
    return "No Posts";
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {posts &&
          posts.map((post) => {
            return (
              <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                <PostCard post={post} />
              </Grid.Column>
            );
          })}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default HomeScreen;
