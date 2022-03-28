import {Card} from "@mui/material";
import {CardContent} from "@mui/material";
import {CardActionArea} from "@mui/material";
import {CardMedia} from "@mui/material";
import {Typography} from "@mui/material";
import {Box} from "@mui/material";

export default function IndexCard({title, content}) {
    return (
        <Card sx={{maxWidth: 300, boxShadow: 5, m: 2}}>
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