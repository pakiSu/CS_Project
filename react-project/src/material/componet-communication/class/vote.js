import React from "react";
import { VoteMain } from "./voteMain";
import { VoteFooter } from "./voteFooter";
import { withStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";


const styles = (theme) => ({
    root: {
        width: 400,
        padding: theme.spacing(2)
    }
});


class VoteClass extends React.Component {
     state = {
        supNum: 10,
        oppNum: 5
    }

    //设置为箭头函数：不论方法在哪执行的，方法中的 this 永远都是 VoteClass 父组件的实例
    handleSupOpp = (type) => {
        if(type === 'sup') {
            this.setState({supNum: this.state.supNum + 1})
            return;
        }
        this.setState({oppNum: this.state.oppNum + 1})
    }

    render() {
        let { classes } = this.props;
        let { supNum, oppNum } = this.state;
        return <>
            <div className={classes.root}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">React 前端框架</Typography>
                    </Grid>
                    <Grid item>
                         <Typography variant="h5">{supNum + oppNum}</Typography>
                    </Grid>
                </Grid>
                <VoteMain supNum={supNum} oppNum={oppNum} />
                <VoteFooter handleSupOpp={this.handleSupOpp} />  
            </div>
        </>
    }
}
 
export default withStyles(styles)(VoteClass);