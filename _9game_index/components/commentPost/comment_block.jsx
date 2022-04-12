import { Card, Typography } from "@mui/material"

export default function CommentBlock(props) {

    return (
        <Card style={{margin: "0.5rem"}}>
            <Typography key={props._id}>   
                {props.user_id}: posted on {props.date}<br/>
                <span style={{marginLeft: "1rem"}}>
                    {props.text}
                </span>
            </Typography>
        </Card>
    )

}