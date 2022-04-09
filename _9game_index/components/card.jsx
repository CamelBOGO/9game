import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material"
import {Box, Typography} from "@mui/material"
import {makeStyles} from "@material-ui/styles"
import Like from "../pages/like_post";


export default function IndexCard(props) {
    const id = props.id
    const cardTextStyle = makeStyles({
        textEllipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 12,
            "-webkit-box-orient": "vertical"
        }
    });
    const classes = cardTextStyle()

    return (
        <Card sx={{width: 300, height: 400, boxShadow: 5}}>
            <CardActionArea href={`/post/${id}/comnt`}>
                <Box component="div" sx={{height: 300, p: 2}}
                     style={{position: "relative", top: "0", width: "auto", marginBottom: "20%"}}>
                    {/*<CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt={content}
                        sx={{m: 2}}
                    />*/}
                    <Typography gutterBottom variant="body1"
                                component="div"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '12',
                                    WebkitBoxOrient: 'vertical',
                                }}>
                        {props.content}
                    </Typography>
                </Box>
                <CardContent style={{
                    position: "absolute",
                    display: "inline-block",
                    bottom: "0",
                    left: "0",
                    width: "auto",
                    height: "10%",
                    padding: "10"
                }}>
                    <Typography gutterBottom variant="h5" component="div"
                                style={{width: "auto", display: "inline-flex", justifyContent: "space-between"}}>
                        <Like id={props.id} style={{bottom: "0", left: "0", padding: "0"}} likes={props.likes}
                              updateLikedPosts={props.updateLikedPosts} likedPosts={props.likedPosts}
                              likeduser={props.likeduser}/>
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
        ;
}
