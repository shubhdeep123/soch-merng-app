import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import {
  Grid,
  Loader,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const SinglePost = ({ match, history }) => {
  const postId = match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
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
    <Grid stackable>
      <Grid.Row>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
              />
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
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment:</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button blue"
                      disabled={comment.trim() === ""}
                      onClick={createComment}
                    >
                      Comment
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

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
