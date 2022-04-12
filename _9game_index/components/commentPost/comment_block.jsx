import { Typography } from "@mui/material"

export default function CommentBlock(props) {

    return (
        <>
            <Typography style={{justifyContent: "space-between"}}>   
                {props.user_id}: {props.date}
            </Typography>
            <Typography style={{marginLeft: "1rem", wordWrap: "break-word"}}>
                {props.text}
            </Typography>
        </>
    );
}