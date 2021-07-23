import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { db } from "../../firebase";
import { UserContext } from "../../contexts/user";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function TakeComment({comments, id}){
  const [user,setUser]=useContext(UserContext).user;
  const classes = useStyles();
  const [comment, setComment]=useState("");
  const [commentArray, setCommentArray]=useState(comments ? comments : []);

  
  const addComment=()=>{
    if (comment !==""){
      commentArray.push({comment:comment,
      username: user.email.replace("@gmail.com", "").toLowerCase(),
      });
      db.collection("posts")
      .doc(id)
      .update({
        comments: commentArray,
      }).then(function(){
        setComment("");
        console.log("comment Added")
      }).catch(function(error){
        console.log(`Error ${error}`)
      });
    }
  };

  return <div className="comment-input">
  <textarea
  className="comment-TextBox"
  rows="1"
  placeholder="write your comment here..."
  value={comment}
  onChange={(e) => setComment(e.target.value)}>
  </textarea>
  <Button size="small" className={classes.margin} onClick={addComment}>Post</Button>
  </div>;
}