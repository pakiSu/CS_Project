import { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";


/* 
    自定义 Hook
        1. 作用：提取封装一些公共的处理逻辑
        2. 玩法：创建一个函数，名字需要是 useXxx，返回值可以自己定义， 后期就可以在组件中调用这个方法！
*/

// 对 useState 进行封装，支持在函数组件中支持部分修改
const usePartialstate= function usePartialState(initialvalue) {
    let [state,setState]= useState(initialvalue);
    //setstate：不支持部分状态更改的
    //setPartial:我们期望这个方法可以支持部分状态的更改
    const setPartial = function setPartial(partialState) {
        setState({
            ...state,
            ...partialState
        });
    }
    return [state, setPartial];
};


//自定义 Hook，在组件第一次渲染完毕后，统一干点啥事
const useDidMount = function useDidMount(title){
    if(!title) title ='React系统课';
    //基于React内置的Hook函数，实现需求即可
    useEffect(()=> {
        document.title= title;
    });
}

export function CustomHookTest() {
    let [state, setPartial] = usePartialstate({
        supNum: 10,
        oppNum: 5
    });
    const handleAdd = (type) => {
        if(type === 'sup') {
            // setState({supNum: state.supNum + 1});
            setPartial({supNum: state.supNum + 1});
        } else {
            // setState({supNum: state.oppNum + 1});
            setPartial({oppNum: state.oppNum + 1});
        }
    }

    useDidMount("Custom Hook");

    // let [state, setState] = useState({
    //     supNum: 10,
    //     oppNum: 5
    // });
    // const handleAdd = (type) => {
    //     if(type === 'sup') {
    //         // setState({supNum: state.supNum + 1});
    //         setState({...state, supNum: state.supNum + 1});
    //     } else {
    //         // setState({supNum: state.oppNum + 1});
    //         setState({...state, oppNum: state.oppNum + 1});
    //     }
    // }
    return (
        <div>
            <Typography variant="h4" component="h5">反对：{state.oppNum}</Typography>
            <Typography variant="h4" component="h5">支持：{state.supNum}</Typography>
            <Button variant="contained" color="primary" onClick={handleAdd.bind(null, "opp")}>反对</Button>
            <Button variant="contained" color="primary" onClick={handleAdd.bind(null, "sup")}>支持</Button>
        </div>
    )
}