const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postsWithComments = {};

app.get('/posts', (req, res) => {
    res.send(postsWithComments);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    if (type === 'PostCreated') {
        const { id, title } = data;
        postsWithComments[id] = {
            id,
            title,
            comments: []
        }
    }
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = postsWithComments[postId];

        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const post = postsWithComments[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;
        comment.content = content;
    }

    res.send({});
})

app.listen(4002, () => {
    console.log('Query service is listening on port 4002');
})