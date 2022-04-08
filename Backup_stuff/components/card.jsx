import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material"
import {Box, Typography} from "@mui/material"

export default function IndexCard({title, content}) {
    return (
        <Card sx={{width: 300, boxShadow: 5}}>
            <CardActionArea>
                <Box sx={{minHeight: 300, m: 2}}>
                    {/*<CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt={content}
                        sx={{m: 2}}
                    />*/}
                    <Typography gutterBottom variant="body1" component="div">
                        {content}
                    </Typography>
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}