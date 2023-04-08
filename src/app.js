import express from "express"
import cors from "cors"
import port from "./constants/port.js"

const app = express();

app.use(cors());
app.use(express.json());

const usersArrays = [
    // {
    //     username: "bobesponja1",
    //     avatar: "11111111111111"
    // },
    // {
    //     username: "bobesponja2",
    //     avatar: "2222222222222"
    // },
    // {
    //     username: "bobesponja3",
    //     avatar: "3333333333333333"
    // }
];
const tweetsArrays = [
    // {
    //     username: "bobesponja1",
    //     tweet: "11"
    // },
    // {
    //     username: "bobesponja3",
    //     tweet: "22"
    // },
    // {
    //     username: "bobesponja2",
    //     tweet: "33"
    // },
    // {
    //     username: "bobesponja1",
    //     tweet: "44"
    // },
    // {
    //     username: "bobesponja3",
    //     tweet: "55"
    // },
    // {
    //     username: "bobesponja2",
    //     tweet: "66"
    // },
    // {
    //     username: "bobesponja1",
    //     tweet: "77"
    // },
    // {
    //     username: "bobesponja3",
    //     tweet: "88"
    // },
    // {
    //     username: "bobesponja2",
    //     tweet: "99"
    // },
    // {
    //     username: "bobesponja1",
    //     tweet: "1010"
    // },
    // {
    //     username: "bobesponja3",
    //     tweet: "1111"
    // },
    // {
    //     username: "bobesponja2",
    //     tweet: "1212"
    // },
    // {
    //     username: "bobesponja1",
    //     tweet: "1313"
    // }
];
const tweetsArraysUsername = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar || (typeof username !== "string") || (typeof avatar !== "string")) {
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
    const { tweet } = req.body;
    const { user } = req.headers;

    if (!user || !tweet || (typeof user !== "string") || (typeof tweet !== "string")) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    const userExists = usersArrays.find(u => u.username === user);

    if (!userExists) {
        return res.status(401).send("UNAUTHORIZED");
    }

    const newTweet = {
        user,
        tweet
    };
    const newTweetUsername = {
        username: user,
        tweet
    }
    tweetsArrays.push(newTweet);
    tweetsArraysUsername.push(newTweetUsername);
    // console.log("tweetsArrays",tweetsArrays);

    res.status(201).send("OK")
});

app.get("/tweets", (req, res) => {
    const page = req.query.page;

    if(page < 1){
        return res.status(400).send("Informe uma página válida!");
    }

    if (!tweetsArrays) {
        return res.send("");
    }
    const lastTenTweets = tweetsArrays.filter((tweet, index) => {
        if (1 === Number(page)) {
            return index >= tweetsArrays.length - 10;
        }
        else if (2 === Number(page)){
            return (index >= tweetsArrays.length - 2*10) && (index < tweetsArrays.length - 1*10);
        } 
        else if (3 === Number(page)){
            return (index >= tweetsArrays.length - 3*10) && (index < tweetsArrays.length - 2*10);
        }
        // console.log("tweetsArrays.length",tweetsArrays.length);
        return index >= tweetsArrays.length - 10;
    }).reverse();


    const lastTenTweetsWithAvatar = lastTenTweets.map(ltt => {
        // console.log(ltt.user);
        const avatar = usersArrays.find(ua => ua.username === ltt.user);
        return { username: ltt.user, avatar: avatar.avatar, tweet: ltt.tweet };
    });

    res.send(lastTenTweetsWithAvatar);
});

app.get("/tweets/:USERNAME", (req, res) => {
    const userSearch = req.params.USERNAME;

    const allUserSearchTweets = tweetsArraysUsername.filter(ta => ta.username === userSearch);

    res.send(allUserSearchTweets);


});



app.listen(port, () => console.log(`Runing in port ${port}`))