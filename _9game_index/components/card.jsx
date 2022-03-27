import {Card} from "@mui/material";
import {CardContent} from "@mui/material";
import {CardActionArea} from "@mui/material";
import {CardMedia} from "@mui/material";
import {Typography} from "@mui/material";

export default function IndexCard() {
    return (
        <Card sx={{maxWidth: 345, boxShadow: 5}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="This is a picture or some text."
                    sx={{p: 2}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        This is the title.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}