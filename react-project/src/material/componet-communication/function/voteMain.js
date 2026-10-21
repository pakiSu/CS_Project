import { Grid, Typography } from "@material-ui/core";
import { useMemo } from "react";

export function VoteMain(props) {
    let { supNum, oppNum } = props;

    // 基于 useMemo 实现复杂逻辑的“计算缓存”
    let ratio =  useMemo(() => {
        console.log("useMemo 重新执行....");
        let ratio = "--",
            total = supNum + oppNum;
        if (total > 0) ratio =(supNum / total * 100).toFixed(2) + '%';
        return ratio;
    }, [supNum, oppNum]);

    /*  supNum 或 oppNum 发生改变都会重新执行该函数，就会导致这计算逻辑重复执行，是不好的选择 */
    // let ratio = "--",
    //     total = supNum + oppNum;
    // if (total > 0) ratio =(supNum / total * 100).toFixed(2) + '%';
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