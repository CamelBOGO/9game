import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material"
import {Box, Typography} from "@mui/material"
import {makeStyles} from "@material-ui/styles"


export default function IndexCard({id, title, content}) {
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
                <Box component="div" sx={{height: 300, p: 2}}>
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
                        {content}
                    </Typography>
                </Box>
                <CardContent>
                    <Typography noWrap gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
        ;
}