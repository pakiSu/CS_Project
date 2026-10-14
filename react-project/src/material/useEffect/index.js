import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        '& div': {
            backgroundColor: theme.palette.secondary.main,
            padding: theme.spacing(1)
        },
        '& button': {
            padding: theme.spacing(1, 2),
            backgroundColor: '#64b5f6',
        }
    }
}));

/*
    useEffect 的作用： 是 React 提供的一个 Hook，用于在函数组件中执行副作用操作
        什么是副作用：
            简单说，就是与"渲染 UI"无关的操作，例如：
                1. 发送网络请求（fetch / axios）
                2. 操作 DOM（手动修改、订阅事件）
                3. 设置定时器（setTimeout / setInterval）
                4. 订阅 / 取消订阅（WebSocket、事件监听）
                5. 手动修改浏览器存储（localStorage）
        useEffect 相当于把类组件中的 componentDidMount、componentDidUpdate、componentWillUnmount 三个生命周期合并到了一起
        
        当组件卸载，或依赖变化导致 effect 重新执行前，会先调用清理函数。
    
    基本语法：
        useEffect(() => {
            // 副作用逻辑
            return () => {
                // 清理函数（可选）
            };
        }, [依赖项]);

        1. 第一个参数：一个函数，里面写副作用逻辑。
            返回值：可选，返回一个清理函数，在组件卸载或下一次执行前调用。
        2. 第二个参数：依赖数组，决定 effect 何时执行。

    使用注意事项：
        注意事项	                             说明
        依赖要写全	                        用到的变量都应放进依赖数组，否则可能拿到旧值（闭包陷阱）
        不要直接在 effect 里写 async	    应在外层包一个 async 函数再调用
        清理函数很重要	                    避免内存泄漏、重复订阅
        避免死循环	                        在 effect 里 setState 且依赖该 state，容易无限循环
        依赖是浅比较	                    对象/数组每次都是新引用，会导致频繁执行
       
    如果对应的值无依赖 effect 里拿到的永远是创建时的值
        useEffect(() => {
            const id = setInterval(() => {
                console.log(count);  // 永远是 0
            }, 1000);
            return () => clearInterval(id);
        }, []);  // 依赖为空，count 被闭包锁死
    
    
    useEffect vs useLayoutEffect
        对比	        useEffect	                useLayoutEffect
        执行时机	     DOM 绘制后（异步）	       DOM 绘制前（同步）
        是否阻塞渲染	 不阻塞	                   阻塞
        适用场景	     数据请求、订阅、定时器	    测量 DOM、防止闪烁
*/



export const UseEffectDemo = () => {
    console.log("UseEffectDemo render...");

    const [count, SetCount] = useState(0);
    const [data, SetData] = useState('');
    const classes = useStyles();

    /* 
        1. 传空数组 [] —— 只在组件挂载时执行一次 >> 相当于 componentDidMount 生命周期， 
        2. 只有组件重新挂载（unmount 后再 mount）时才会再执行一次
    */
    useEffect( () => {
        console.log('useEffect: 依赖是空 []');
        //无依赖副作用： 
        const timer = setInterval(() => {}, 1000);
        return () => {
            // 当组件卸载: 会先调用清理函数
            console.log('清除副作用');
            clearInterval(timer); //清除副作用
        }
    }, [])

    /* 不传依赖数组 —— 每次渲染后都执行  */
    useEffect( () => {
        console.log('useEffect: 无依赖');
    })

    /* 传具体依赖 —— 依赖变化时执行 >> 相当于 componentDidUpdate 生命周期 */
    useEffect( () => {
        console.log('useEffect: 依赖 count');
        //依赖副作用： 
        const timer = setInterval(() => {}, 1000);
        return () => {
            console.log('依赖变化会会清楚清除前一次副作用');
            clearInterval(timer); //依赖变化会会清楚清除前一次副作用
        }
    }, [count])

    /* 不要直接在 effect 里写 async, 应在外层包一个 async 函数再调用 */
    useEffect( () => {
        (async () => {
            const data = await fetchData();
            SetData(data);
        })();
        // const load = async () => {
        //     const data = await fetchData();
        //     SetData(data);
        // };
        // load();
    }, [])

    const add = (e) => {
        SetCount(count +1);
    }

    return (
        <>
            <Typography variant="h5" component="h2">React useEffect Hook</Typography>
            <div className={ classes.root }>
                <div>累加：{count}</div>
                <div>API：{data}</div>
                <button onClick={add}>累加</button>
            </div>
        </>  
    );
}

function fetchData() {
    return new Promise((resolve, reject) => {
        if (resolve) {
            resolve('successful');  
        } else {
            reject('failed'); 
        }
});
}