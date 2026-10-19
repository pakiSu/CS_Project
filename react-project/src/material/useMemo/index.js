
import { useState, useMemo, memo } from "react";
import { Grid, Typography, Button, TextField  } from "@material-ui/core";

/* 
    useMemo 是什么：
        1. useMemo 是 React 提供的一个 性能优化 Hook，用于缓存计算结果
        2. 它接收一个计算函数和依赖数组，只有当依赖变化时，才重新计算；否则返回上一次缓存的结果
        3. 内部依赖比较用 Object.is（浅比较，类似 ===，但处理了 NaN 和 -0）
            Object.is(NaN, NaN);  // true （=== 是 false）
            Object.is(-0, 0);     // false（=== 是 true）
    
    useMemo 主要是用在函数组件， memo 主要是用在类组件, 组件卸载后缓存销毁

    核心作用：避免每次渲染都重复执行昂贵的计算

    基本语法：
        const result = useMemo(() => {
            // 计算逻辑
            return 计算结果;
        }, [依赖1, 依赖2 ...]);

        1. 第一个参数：一个函数，返回需要缓存的值
        2. 第二个参数：依赖数组 -- 注意：如果是引用类型，如果引用发生变化就会导致重新计算
        3. 返回值：缓存的计算结果或者引用

    useMemo 使用判断标准：
        使用场景	                     是否用 useMemo
        昂贵计算（排序、过滤、复杂运算）      ✅ 推荐
        缓存对象/数组引用传给 memo 子组件    ✅ 推荐
        作为其他 Hook 的依赖	            ✅ 推荐
        简单计算（a + b）	                ❌ 不必要
        有副作用的操作	                    ❌ 用 useEffect
        依赖频繁变化	                    ❌ 缓存意义不大
    
    使用注意事项
        1. 不要滥用
        2. 依赖要写全 - 可以用 ESLint 插件 eslint-plugin-react-hooks 自动检查
        3. 不保证永远缓存 - useMemo 是性能优化手段，不是语义保证。React 可能在极端情况下丢弃缓存（如内存紧张），所以不能依赖它做业务逻辑正确性保证
        4. 不要在里面写副作用
    
    常见错误
        1. 依赖是对象 - 如果每次都是新对象，等于没缓存（建议依赖具体字段）
        2. 忘记依赖
        3. 在循环/条件里用 Hook  - ❌ 违反 Hook 规则
            ✅ Hook 必须在顶层
    
    useMemo     → 缓存值
    useCallback → 缓存函数
    React.memo  → 缓存组件

    高级用法：
        1. 缓存 DOM 引用
            function useBoundingRect(ref, deps) {
                return useMemo(() => {
                    if (!ref.current) return null;
                    return ref.current.getBoundingClientRect();
                }, [ref, ...deps]);
            }

        2. useMemo 做依赖稳定的 "中转站"
            -- 问题：useEffect 依赖对象导致频繁执行
                function App({ config }) {
                    // ❌ config 每次新引用，effect 每次都跑
                    useEffect(() => {doSomething(config);}, [config]);
                }
            -- 解决：用 useMemo 稳定引用
                function App({ config }) {
                    const stableConfig = useMemo(
                        () => ({ theme: config.theme, lang: config.lang }),
                        [config.theme, config.lang]
                    );

                    useEffect(() => { doSomething(stableConfig); }, [stableConfig]);
                }
*/

export function UseMemoTest1() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5),
        [x, setX] = useState(0);

    /* 
        函数组件的每一次更新，都是把函数重新执行
         1. 产生一个新的闭包
         2. 内部的代码也要重新执行一遍
        
         如果我们修改的是支持数/反对数，视图更新的时候，
        我们可以让此逻辑重新计算！！
        
        但是如果我们是修改其他的状态值，视图更新了，此
        逻辑没必要再重新执行了！！「如果此逻辑需要执行
        的时间比较长，一定是影响视图更新速度的」
    */
    //经过计算，算出支持比率
    // let total = supNum + oppNum,
    //     ratio='--';
    // if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%';

    /*
        let xxx= useMemo(callback, [dependencies])
        1. 第一次渲染组件的时候，callback会执行
        2. 后期只有依赖的状态值发生改变，callback 才会再执行
        3. 每一次会把 callback 执行的返回结果赋值给 xxx(ratio)
        4. useMemo 具备“计算缓存”，在依赖的状态值没有发生改变，callback 没有触发执行的时候，xxx(ratio) 获取的是上一次计算出来的结果和 Vue 中的计算属性非常的类似！！
    */
    let ratio = useMemo(() => {
        console.log("useMemo: 执行了");
        let total = supNum + oppNum,
        ratio='--';
    if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%';
    return ratio;
    }, [supNum, oppNum]);

    return (
        <>
            <Grid container direction="column" justifyContent="flex-start"alignItems="flex-start" spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h5" component='h2'>UseMemo Hook</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={3}>
                    <Typography variant="subtitle1">支持人数：{supNum}</Typography>
                    <Typography variant="subtitle1">反对人数：{oppNum}</Typography>
                    <Typography variant="subtitle1">支持比率：{ratio}</Typography>
                    <Typography variant="subtitle1">x: {x}</Typography>
                </Grid>
                <Grid item xs={3}>
                     <Button variant="contained" color="primary" onClick={() => {setSupNum(supNum+1)}}>支持</Button>
                    <Button variant="contained" color="primary" onClick={() => {setOppNum(oppNum+1)}}>反对</Button>
                    <Button variant="contained" color="primary" onClick={() => {setX(x+1)}}>干点别的事</Button>
                </Grid>
            </Grid>
        </>
    );
}


let prev;
export function UseMemoTest(props) {
    const [count, setCount] = useState(0);
    const [keyword, setKeyword] = useState('');

    // ❌ 每次渲染都会重新执行，即使 count 没变  -- 没用 useMemo 缓存
    let total = sum(count, 2);
    function sum(a, b) {
        console.log("没 useMemo 重新执行..");
        return a + b;
    }

    // 用 useMemo 缓存, 只有 count 变化时才重新计算，输入框打字不会触发重算。
    let totalMeomo = useMemo(() =>{
        return sum1(count, 1);
    }, [count]);

    function sum1(a, b) {
        console.log("有 useMemo 重新执行..");
        return a + b;
    }
    if(!prev) {
        prev = sum1;
    } else {
        console.log(prev === sum1); //false， 因为每次组件更新 sum1 都是新的一个堆内存地址， 第一次: 0x001, 第二次: 0x003 ...
    }

    return (
        <>
            <Grid container direction="column" justifyContent="flex-start"alignItems="flex-start" spacing={4}>
                <Grid item xs={6}>
                    <Typography variant="h5" component='h2'>UseMemo Hook</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={() => setCount(count + 1)} size='medium'>累加</Button>
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                        id="outlined-secondary" 
                        label="Outlined secondary" 
                        variant="outlined"
                        color="secondary"
                        onChange={ e => setKeyword(e.target.value) }
                        />
                    <Typography  variant="h4" component='span'>{keyword}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={3}>
                    <Typography variant="subtitle1">总和(没useMemo)：{total}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1">总和(useMemo)：{totalMeomo}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <ChildComponent count={count} />
            </Grid>

        </>
    );
}

/* 
    如果父组件的 state 值发生变化，都会导致子组件渲染 
    优化：
        1. 只当父组件中的 count state 发生变化才会渲染子组件，其他 state 发生不应该导致 子组件渲染
        2. 使用 memo(component) 优化
    React.memo 是进化数据的浅比较，如果 props 每次都是新对象，Child 就会一直重渲染。用 useMemo 缓存后，引用不变，Child 不会重渲染。
*/
const ChildComponent = memo(props => {
     console.log("child component render ...");
    const { count } = props;
    return (
        <>
            <Typography  variant="h5" component='div'>ChildComponent : { count }</Typography>
        </>
    )
}) 

// function ChildComponent(props) {
//     console.log("child component render ...");
//     const { count } = props;
//     return (
//         <>
//             <Typography  variant="h5" component='div'>ChildComponent : { count }</Typography>
//         </>
//     )
// }



/* memo 化的自定义 Hook: 必须以 use 开头且开放在头部，不在存在 if 和 for 语句内  */
function useFilteredList(list, keyword) {
  return useMemo(() => {
    console.log('过滤执行');
    return list.filter(item => item.name.includes(keyword));
  }, [list, keyword]);
}

function useSortedList(list, order) {
  return useMemo(() => {
    return [...list].sort((a, b) =>
      order === 'asc' ? a.id - b.id : b.id - a.id
    );
  }, [list, order]);
}