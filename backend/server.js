import express from 'express';
const app = express();
const port = process.env.PORT || 5656;
// routes go here
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

app.get('/api/books', (req, res) => {
    res.json([
            {
                id: 1,
                title: "Alice's Adventures in Wonderland",
                author: "Charles Lutwidge Dodgson"
            },
            {
                id: 2,
                title: "Einstein's Dreams",
                author: "Alan Lightman"
            }
        ])
})
app.get('/api/books/2', (req,res)=>{
    res.json(
            {
                id: 2,
                title: "Einstein's Dreams",
                author: "Alan Lightman"
            }
        )
})