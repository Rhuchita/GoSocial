import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import Skeleton from "@material-ui/lab/Skeleton";
import { Comments, TakeComment } from "..";
import { storage, db } from "../../firebase";
import { UserContext } from "../../contexts/user";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "100%",
    margin: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(1),
  },
  media: {
    height: 350
  }
}));

export default function Post(props, {profileUrl, username, id, photoURL, caption, comments, timestamp}) {
  const { loading = false } = props;
  const classes = useStyles();
  const [user,setUser]=useContext(UserContext).user;

  const deletePost=()=>{
    //delete post from firebase
    var imageRef=storage.refFromURL(photoURL);
    imageRef.delete().then(function(){
      console.log("delete Post");
    }).catch(function(error){
      console.log(`Error ${error}`);
    });
    db.collection("posts").doc(id).delete().then(function(){
      console.log("delete Post");
    }).catch(function(error){
      console.log(`Error ${error}`);
    });
  };
  return (
    <div className="posts_byUser">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                alt="Ted talk"
                src={profileUrl}
              />
            )
          }
          action={
            loading ? null : (
              <IconButton aria-label="delete">
                <Button onClick={deletePost} size="medium" className={classes.margin} >Delete </Button>
              </IconButton>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              {username}
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              "5 hours ago"
            )
          }
        />
        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia
            className={classes.media}
            image={photoURL}
            title="Ted talk"
          />
        )}

        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          ) : (
            <div className="card_footer">
              <Typography variant="body2" color="textSecondary" component="p">
                <h4>{username} : </h4>
                <span>{caption} </span>
              </Typography>
              <div className="post_comments">
                {comments ? (comments.map((comment) =>
                <Comments username={comment.username} caption={comment.comment} />
                )):(
                  <></>
                )}
              </div>
              {user ? <TakeComment comments={comments} id={id} /> : <></>}
              
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

Post.propTypes = {
  loading: PropTypes.bool
};

