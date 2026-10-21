import { Button, Grid } from "@material-ui/core";
import { memo } from "react";

// handleSupOpp 没有改变不应该重新渲染该组件,使用 memo 进行浅比较
export const VoteFooter = memo(function VoteFooter(props) {
    console.log("Function VoteFooter render...");
    let { handleSupOpp } = props;
    return <>
         <Grid container spacing={2} direction='row'>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleSupOpp.bind(null, "sup")} >支持</Button>
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary" onClick={handleSupOpp.bind(null, "opp")} >反对</Button>
            </Grid>  
        </Grid>
    </>
});