import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import moment from "moment";
import {
  Grid,
  Loader,
  Image,
  Card,
  Button,
  Icon,
  Label,
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const SinglePost = ({ match, history }) => {
  const postId = match.params.postId;
  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const deletePostCallback = () => {
    history.push("/");
  };

  if (loading) {
    return <Loader active inline="centered" />;
  }

  const {
    id,
    body,
    createdAt,
    username,
    comments,
    likes,
    likeCount,
    commentCount,
  } = data.getPost;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Image
            floated="right"
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log("Comment on post")}
              >
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
