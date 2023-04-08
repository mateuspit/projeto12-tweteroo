import express from "express"
import cors from "cors"
import port from "./constants/port.js"

const app = express();

app.use(cors());
app.use(express.json());

const usersArrays = [
    {
        username: "bobesponja1",
            avatar: "11111111111111"
    },
    {
        username: "bobesponja2",
            avatar: "2222222222222"
    },
    {
        username: "bobesponja3",
            avatar: "3333333333333333"
    }
];
const tweetsArrays = [
    {
        username: "bobesponja1",
        tweet: "11"
    },
    {
        username: "bobesponja3",
        tweet: "22"
    },
    {
        username: "bobesponja2",
        tweet: "33"
    },
    {
        username: "bobesponja1",
        tweet: "44"
    },
    {
        username: "bobesponja3",
        tweet: "55"
    },
    {
        username: "bobesponja2",
        tweet: "66"
    },
    {
        username: "bobesponja1",
        tweet: "77"
    },
    {
        username: "bobesponja3",
        tweet: "88"
    },
    {
        username: "bobesponja2",
        tweet: "99"
    },
    {
        username: "bobesponja1",
        tweet: "1010"
    },
    {
        username: "bobesponja3",
        tweet: "1111"
    },
    {
        username: "bobesponja2",
        tweet: "1212"
    },
    {
        username: "bobesponja1",
        tweet: "1313"
    }
];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if(!username || !avatar || (typeof username !== "string") || (typeof avatar !== "string")){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const newUser = {
        username,
        avatar
    };
    usersArrays.push(newUser);
    // console.log(newUser);

    res.status(201).send("OK")
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    if(!username || !tweet || (typeof username !== "string") || (typeof tweet !== "string")){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const userExists = usersArrays.find(u => u.username === username);

    if (!userExists) {
        return res.status(401).send("UNAUTHORIZED");
    }

    const newTweet = {
        username,
        tweet
    };
    tweetsArrays.push(newTweet);
    // console.log(tweetsArrays);

    res.status(201).send("OK")
});

app.get("/tweets", (req, res) => {

    if(!tweetsArrays){
        return res.send("");
    }
    const lastTenTweets = tweetsArrays.filter((tweet, index) => {
        return index >= tweetsArrays.length - 10;
    }).reverse();
    // console.log(lastTenTweets);
    // const lastTenTweetsWithAvatar = lastTenTweets.map(llt => {
    //     const avatar = usersArrays.filter(llt.username) 
    //     return {llt.}
    // });

    const lastTenTweetsWithAvatar = lastTenTweets.map(ltt => {
        const avatar = usersArrays.find(ua => ua.username === ltt.username);
        return {username: ltt.username, avatar: avatar.avatar, tweet: ltt.tweet};
    });

    res.send(lastTenTweetsWithAvatar);
});



app.listen(port, () => console.log(`Runing in port ${port}`))