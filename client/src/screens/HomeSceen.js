import React, { useContext } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { Grid, Loader, Transition } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { AuthContext } from "../context/auth";

const HomeScreen = () => {
  // getting user from context
  const { user } = useContext(AuthContext);
  //   Fetching posts from backend
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return <Loader active inline="centered" />;
  }

  const { getPosts: posts } = data;

  if (!posts) {
    return "No Posts";
  }

  return (
    <Grid columns={3} stackable doubling>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Transition.Group>
          {posts &&
            posts.map((post) => {
              return (
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <PostCard post={post} />
                </Grid.Column>
              );
            })}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
};

export default HomeScreen;
