
import { useState, useCallback, memo, useEffect, useRef, PureComponent } from "react";
import { Grid, Typography, Button  } from "@material-ui/core";

/* 
    useCallback  是什么：
        1. useCallback 是 React 提供的一个 性能优化 Hook，用于缓存函数引用
        2. 它接收一个函数和依赖数组，只有当依赖变化时，才返回新的函数；否则返回上一次缓存的同一个函数引用

    核心作用：保持函数引用稳定，避免子组件因函数变化而不必要地重渲染

    基本语法：
        const fn = useCallback(() => { // 函数逻辑 }, [依赖1, 依赖2]);
            1. 第一个参数：需要缓存的函数
            2. 第二个参数：依赖数组
            3. 返回值：缓存的函数引用

    三种依赖情况:
        1. 空数组 [] —— 函数永远不变
            const fn = useCallback(() => { console.log('永远是这个函数'); }, []);
            ⚠️ 注意：函数内如果用到了外部变量，会被闭包锁死，永远是初始值。

        2. 有依赖 [a, b] —— 依赖变化时返回新函数
            const fn = useCallback(() => { console.log(a, b); }, [a, b]);

        3. 不传依赖 —— 每次都是新函数（等于没优化）
            const fn = useCallback(() => {});  // 无意义

    useCallback 与 useMemo 的关系
        useCallback(fn, deps) 完全等价于 useMemo(() => fn, deps)
        // 这两种写法完全等价
        const handleClick = useCallback(() => { console.log(count); }, [count]);
        const handleClick = useMemo(() => { return () => console.log(count); }, [count]);

        对比            useCallback           useMemo
        缓存内容           函数                 任意值
        返回值	           函数本身	            计算结果
        本质	           useMemo 的语法糖	    通用缓存
    
     useCallback 本身有开销: 创建 hook、比较依赖、存缓存都有成本（约 100ns 级别）

    闭包陷阱
        1. 问题：依赖为空但用到外部变量
            const [count, setCount] = useState(0);
            // ❌ count 被闭包锁死，永远是 0
            const showCount = useCallback(() => { alert(count); }, []);

        2. 解决 1：把变量放进依赖
            const showCount = useCallback(() => { alert(count); }, [count]);  // ✅ count 变化时更新函数
        
        3. 解决 2：用函数式更新
            const increment = useCallback(() => { setCount(c => c + 1); }, []);  // ✅ 不依赖外部 count
    
    useCallback vs useMemo vs React.memo 区别
        Hook / API        缓存对象             作用
        useCallback	        函数	        稳定函数引用
        useMemo	            任意值	        缓存计算结果
        React.memo	        组件	        缓存组件渲染
    
    useCallback不要乱用！并不是所有组件内部的函数，都拿其处理会更好！！
        1. 虽然减少了堆内存的开辟
        2. 但是useCallback本身也有自己的处理逻辑和缓存的机制，这个也消耗时间啊
    
    啥时候用它呢？
        1. 父组件嵌套子组件，父组件要把一个内部的函数，基于属性传递给子组件，此时传递的这个方法，我们基于 useCallback 处理一下会更好！！
*/



/* 
    诉求：当【父组件】更新的时候，因为传递给【子组件】的属性仅仅是一个函数「特点：基本应该算是不变的」，所以不想再让子组件也跟着更新了！
        1. 第一条：传递给【子组件】的属性（函数），每一次需要是相同的堆内存地址（是一致的）·基于 useCallback 处理！！
        2. 第二条：在【子组件】内部也要做一个处理，验证【父组件】传递的属性是否发生改变，如果没有变化，则让【子组件】不能更新，有变化才需要更新·
            -- 类组件： 继承 React.PureComponent 即可「在 shouldComponentUpdate 中对新老属性做了浅比较」！！
            -- 函数组件：使用 memo 函数进行对新老属性做了浅比较，如果一致就不会更新
*/
export function UseCallbackoTest(props) {
    const [count, setCount] = useState(0);
   
     // ❌ 每次渲染 handleClick 都是新函数(引用地址变了) - 就会导致子组件重新渲染
    // function handleClick() {
    //     console.log("父组件： 子组件触发 click 事件");
    // }

    /* 函数引用稳定，Child 不会因为 Parent 渲染而重渲染 */
    const handleClick = useCallback(() => {
        console.log("父组件： 子组件触发 click 事件"); // //第一次:0X001，第二次：0X001，第三次：0X001
    }, []);


    return (
        <>
            <Grid container direction="column" justifyContent="flex-start"alignItems="flex-start" spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h5" component='h2'>useCallback Hook</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={() => setCount(count + 1)} size='medium'>{count}</Button>
                </Grid>
                <Grid item xs={6}>
                    <ChildFunctionComponent handleClick={ handleClick }/>
                    <ChildClassComponent handleClick={ handleClick }/>
                </Grid>
            </Grid>
        </>
    );
}
/* 子组件：函数组件 */
const ChildFunctionComponent = memo(props => {
    console.log("ChildFunctionComponent render ...");
    const { handleClick } = props;
    return <Button variant="contained" color="secondary" onClick={ handleClick }>Click Function Component</Button>
}) 
/* 子组件：类组件 */
class ChildClassComponent extends PureComponent {
    render() {
         let { handleClick } = this.props;
        console.log("ChildClassComponentt render ...");
        return (<Button variant="contained" color="secondary" onClick={ handleClick }>Click Class Component</Button>)
    }
} 


/* 
    const xxx= useCallback(callback,[dependencies])
        1. 组件第一次渲染，useCallback 执行，创建一个函数 “callback”，赋值给 xxx
        2. 组件后续每一次更新，判断依赖的状态值是否改变，如果改变，则重新创建新的函数堆，赋值给 xxx；但是如果，依赖的状态没有更新「或者没有设置依赖“[]”」
            则xXx获取的一直是第一次创建的函数堆，不会创建新的函数出来！！
        3. 或者说，基于 useCallback，可以始终获取第一次创建函数的堆内存地址（或者说函数的引用）
*/
let prevCallback, prevCallback1;
export function UseCallbackoTest1() {
    console.log("Render  UseCallbackoTest1 ...");
    const [count, setCount] = useState(0);

    //使用 useRef 创建一个不可变的引用
    let prevCallback2 = useRef(null);

    const handle = () => {}; //第一次渲染：0x001，第二次渲染：0x101， 第二次渲染：0x301 ...
    if(!prevCallback) {
        prevCallback = handle;
    } else {
        console.log("是否同一个函数: ", prevCallback === handle); //false， 函数组件每次更新都把函数重新执行，产生一个新的闭包，在闭包中所有创建函数的操作，都会：重新创建新的堆内存「也就是函数都会重新创建」
    }

    const handle1 = useCallback(() => {
        //....
        console.log("useCallback");
    }, [])
    if(!prevCallback1) {
        prevCallback1 = handle1;
    } else {
        console.log("useCallback 是否同一个函数: ", prevCallback1 === handle1); //正常返回 true 第一次：0x001 第二次：0x001 ...
    }

    if(!prevCallback2.current) {
        prevCallback2.current = handle1;
    } else {
        console.log("useCallback 是否同一个函数: ", prevCallback2.current === handle1); //true
    }

    const handleAdd = () => {
        setCount(count + 1)
    }

    useEffect(() => {
        console.log("UseCallbackoTest1 mounted");
        return () => {
            console.log("UseCallbackoTest1 unmounted");
        };
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="flex-start"alignItems="flex-start" spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h5" component='h2'>count: {count}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={handleAdd} size='medium'>Add</Button>
                </Grid>
            </Grid>
        </>
    );
}
