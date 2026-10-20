import { Button, Typography } from "@material-ui/core"
import React, { useState } from "react"

export class UseStateDemo extends React.Component {
    state = {
        x: 10,
        y: 5,
        z: 0
    };

    /* 异步操作，只会批处理更新一次 */
    handle = () => {
        let {x, y, z} = this.state;
        this.setState({x: x+1});
        console.log(this.state.x); // 10
        this.setState({y: y+1});
        console.log(this.state.y); // 5
        this.setState({z: z+1});
        console.log(this.state.z); // 0
        // this.setState({
        //     x: x+1
        // }, (pre) => { // 视图更新完毕执行
        //     console.log("更新x完毕", pre);
        // });
    }


    /* 视图会更更新两次 */
     handle1 = () => {
        /*  */
        let {x, y, z} = this.state;
        this.setState({x: x+1});
        this.setState({y: y+1});
        console.log(this.state); // {x: 10, y: 5, z: 0}
        
        /* 先不等定时器，直接先更新视图(x,y)，等定时器到在更新一次(z) */
        setTimeout(() =>{
            this.setState({z: z+1});
            console.log(this.state); // {x: 11, y: 6, z: 1}
        }, 1000);
    }

    /* 
        React17 视图会更新三次
        React18 中只会更新一次，但是如果定时器时间不一致，差距较大的也会更新三次
    */
    handle2 = () => {
        /*  */
        let {x, y, z} = this.state;
         setTimeout(() =>{
            this.setState({x: x+1});
            console.log(this.state);
        }, 1000);
         setTimeout(() =>{
            this.setState({y: y+1});
            console.log(this.state); 
        }, 1000);
        setTimeout(() =>{
            this.setState({z: z+1});
            console.log(this.state);
        }, 1000);
    }
    


    shouldComponentUpdate(){
         console.log("状态更新");
         return true;
    }

    componentDidUpdate() {
        console.log("视图更新完毕");
    }
   
    render() {
        console.log("视图渲染 Render....");
        let {x, y, z} = this.state;
        return (
            <div>
                <Typography variant="h4" component="h5">x: {x} - y: {y} - z: {z}</Typography>
                <Button variant="contained" color="primary" onClick={this.handle}>批处理</Button>
                <Button variant="contained" color="primary" onClick={this.handle1}>批处理1</Button>
                <Button variant="contained" color="primary" onClick={this.handle2}>批处理2</Button>
            </div>
        )
    }
}

/* 
    this.setState([partialStatel,[callback])
        1. [partialState]: 支持部分状态更改
        2. this.setState({
                x:100//不论总共有多少状态，我们只修改了x，其余的状态不动
            });
        3. [callback]：在状态更改/视图更新完毕后触发执行「也可以说只要执行了setState，callback一定会执行」
            -- 发生在 componentDidUpdate 周期函数之后「DidUpdate 会在任何状态更改后都触发执行；而回调函数方式，可以在指定状态更新后处理一些事情；」
            -- 特殊：即便我们基于shouldComponentUpdate 阻止了状态/视图的更新，DidUpdate 周期函数肯定不会执行了，但是我们设置的这个 callback 回调函数依然会被触发执行！！
            -- 类似于 Vue 框架中的 $nextTick！！
    
    在React18中，setstate 操作都是异步的「不论是在哪执行，例如：合成事件、周期函数、定时器...」
    在React17中，setstate 操作是异步的，但是在【例如：合成事件、周期函数、定时器... 】是同步的
    
    目的：实现状态的批处理「统一处理』
        1. 有效减少更新次数，降低性能消耗
        2. 有效管理代码执行的逻辑顺序
    .
    原理：利用了更新队列【updater】机制来处理的
        1. 在当前相同的时间段内【浏览器此时可以处理的事情中】，遇到 setState 会立即放入到更新队列中！
        2. 此时状态/视图还未更新
        3. 当所有的代码操作结束，会“刷新队列”【通知更新队列中的任务执行】：把所有放入的 setState 合并在一起执行，只触发一次视图更新「批处理操作」
1

*/