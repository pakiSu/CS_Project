import { useCallback, useState } from "react";
import { VoteMain } from "./voteMain";
import { VoteFooter } from "./voteFooter";
import { Grid, makeStyles, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        padding: theme.spacing(2)
    }
}));

let prev1; 
function VoteFunction(props) {
    const styles = useStyles();

    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);

//    function handleSupOpp(type) {
//         if(type === 'sup') {
//             setSupNum(supNum + 1);
//             return;
//         }
//         setOppNum(oppNum + 1);
//     }

    /* 本例子：没必须优化，因为每次点击都会触发 supNum 或 oppNum 状态改变, 所以每次函数执行都是拿到新的堆内存地址 */
    let handleSupOpp = useCallback((type) => {
        if(type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    }, [supNum, oppNum])

    if(!prev1) {
        console.log("diyici");
        prev1 = handleSupOpp;
    } else {
        console.log("zaiyici", prev1 === handleSupOpp);
    }
    return <>
         <div className={styles.root}>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">React 前端框架</Typography>
                </Grid>
                <Grid item>
                        <Typography variant="h5">{supNum + oppNum}</Typography>
                </Grid>
            </Grid>
            <VoteMain supNum={supNum} oppNum={oppNum} />
            <VoteFooter handleSupOpp={handleSupOpp} />  
        </div>
    </>
}
 
export default VoteFunction;