import { Card, Typography } from "@mui/material"

export default function CommentBlock(props) {

    return (
        <Card style={{margin: "0.5rem"}}>
            <Typography style={{justifyContent: "space-between"}}>   
                {props.user_id}: {props.date}
            </Typography>
            <Typography style={{marginLeft: "1rem", wordWrap: "break-word"}}>
                {props.text}
            </Typography>
        </Card>
    )

}