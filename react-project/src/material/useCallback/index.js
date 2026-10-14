
import { useState, useCallback, memo } from "react";
import { Grid, Typography, Button, TextField  } from "@material-ui/core";

/* 
    useCallback  是什么：
        1. useCallback 是 React 提供的一个 性能优化 Hook，用于缓存函数引用
        2. 它接收一个函数和依赖数组，只有当依赖变化时，才返回新的函数；否则返回上一次缓存的同一个函数引用

    核心作用：保持函数引用稳定，避免子组件因函数变化而不必要地重渲染

    基本语法：
        const fn = useCallback(() => { // 函数逻辑 }, [依赖1, 依赖2]);
            1. 第一个参数：需要缓存的函数
            2. 第二个参数：依赖数组
            3. 返回值：缓存的函数

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
*/


export function UseCallbackoTest(props) {
    const [count, setCount] = useState(0);
   
     // ❌ 每次渲染 handleClick 都是新函数(引用地址变了) - 就会导致子组件重新渲染
    // function handleClick() {
    //     console.log("父组件： 子组件触发 click 事件");
    // }

    /* 函数引用稳定，Child 不会因为 Parent 渲染而重渲染 */
    const handleClick = useCallback(() => {
        console.log("父组件： 子组件触发 click 事件");
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
                    <ChildComponent handleClick={ handleClick }/>
                </Grid>
            </Grid>
        </>
    );
}

/* memo 只能进行浅比较 */
const ChildComponent = memo(props => {
     console.log("child component render ...");
    const { handleClick } = props;
    return (
        <>
            <Button variant="contained" color="secondary" onClick={ handleClick }>Click</Button>
        </>
    )
}) 