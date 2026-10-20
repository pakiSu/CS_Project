import { Grid, Typography } from "@material-ui/core";
import React from "react";


export class VoteMain extends React.Component {
    render() {
         console.log("VoteMain render...");
        let { supNum, oppNum } = this.props;
        let ratio = "--",
            total = supNum + oppNum;
        if (total > 0) ratio =(supNum / total * 100).toFixed(2) + '%';
        return <>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <Typography variant="body1">支持人数: {supNum} </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">反对人数: {oppNum} </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">支持比率：{ratio} </Typography>
                </Grid>
            </Grid>
        </>
    }
}