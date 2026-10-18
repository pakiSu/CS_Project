import { Button, Typography } from "@material-ui/core"
import { Component, createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"


/* useRef
    1. useRef 是 React 提供的一个 Hook，主要用于保存一个不会因组件重新渲染而重置的值，以及获取 DOM 元素的引用。
    2. 它和 useState 很像，都可以保存数据，但有一个关键区别：
        -- useState：修改状态会触发组件重新渲染。
        -- useRef：修改 ref.current 不会触发组件重新渲染。
*/

/* 
    类组件中，我们基于 ref 可以做的事情：
        1. 赋值给一个标签：获取 DOM 元素
        2. 赋值给一个类子组件：获取子组件实例【可以基于实例调用子组件中的属性和方法等】
        3. 赋值给一个函数子组件：报错 【需要配合 React.forward 实现 ref 转发，获取子组件中某一个 DOM 元素】

    类组件获取 ref 使用方法：
        1. ref='box'
            this.refs.box获取 (不推荐使用}
        2. ref={x=>this.box=x}
            this.box 获取
        3.this.box=React.createRef() 创建一个 ref 对象
            <h2 ref={this.box}>
            this.box.current 获取DOM元素
    
    函数组件获取 ref 使用方法：
        1. ref={x=>this.box=x}
            this.box 获取
        2. box=React.createRef() 创建一个 ref 对象
            <h2 ref={this.box}>
            box.current 获取DOM元素
        3. box=useRef(null)
            <h2 ref={this.box}>
             box.current 获取DOM元素
*/

let prev1, prev2;
export const UseRefTest = (props) => {
    let [num, setNum] = useState(0);


    /* 基于 "ref={函数}" 的方式，可以把创建 DOM 元素（或者子组件的实列）赋值给 box 变量 【在函数组件中不推荐使用】 */
    let box;

    /* 基于 React.createRef 创建 ref 对象来获取 DOM 对象【存在 ref.current 对象 】*/
    let box1 = createRef();

    /* 只能用于在函数组件中，基于 useRef Hook 函数创建一个 ref 对象【存在 ref.current 对象 】*/
    let box2 = useRef(null);

    /* 获取子组件(类组件)的实列  */
    let childClassRef = useRef(null);
     /* 获取子组件(函数组件)的DOM  */
    let childFunctionRef = useRef(null);
     /* 获取子组件(函数组件)的状态和方法 */
    let childFunctionRef1 = useRef(null);
    
    useEffect(()=> {
        console.log("ref 函数方式：", box);
        console.log("createRef 方式：", box1.current);
        console.log("useRef 方式：", box2.current);
        console.log("子组件(类组件)实列：", childClassRef.current);
        console.log("子组件(函数组件)的DOM：", childFunctionRef.current);
        console.log("子组件(函数组件)的状态和方法：", childFunctionRef1.current);

        // 第一次组件执行，把第一次创建的 REF对象赋值给变量
        prev1 = box1;
        prev2 = box2;
    }, []);

   
   if(prev1) {
        // 第二次组件更新执行，我们验证一下，新创建的 REF 对象，和之前第一次创建的 REF 对象，是否一致？

        /* useRef 在每一次组件更新的时候（函数重新执行），再次执行 useRef 方法的时候，不会创建新的 REF对象，获取到的还是第一次创建的那个 REF对象 */
        console.log(prev2 === box2); //true

        /* createRef 在每一次函数组件更新的时候，都会创建一个全新的 REF对象 出来，比较浪费性能 */
        console.log(prev1 === box1); //false

        /* 总结：
            1. 在类组件中，创建 REF 对象，我们基于 React.createRef 处理【类组件每次更新只是执行 render 方法，不会初始化】
            2. 在函数组件中，为了保证性能，我们应该使用专属的 useRef 处理
        */
    }

    const handleAdd =  () => {
        setNum(num+1)
    }

    return (
        <div>
            <Typography variant="h4" component="h5" ref={x=> box = x}>{num}</Typography>
            <Typography variant="h4" component="h5" ref={box1}>{num}</Typography>
            <Typography variant="h4" component="h5" ref={box2}>{num}</Typography>
            {/* 父组件是函数组件调用的子组件是：类组件 - 类的实列 */}
            <ChildClass ref={childClassRef}/>
            {/* 父组件是函数组件调用的子组件是：函数组件 - 获取 DOM */}
            <ChildFunction ref={childFunctionRef}/>
            {/* 父组件是函数组件调用的子组件是：函数组件 - 获取 状态和方法*/}
            <ChildFunction1 ref={childFunctionRef1}/>
            <Button variant="contained" color="primary" onClick={handleAdd}>新增</Button>
        </div>
    )
}

/* 基于 ref 获取子组件(类组件)的实列，这样基于实例，可以调用组件内部挂载到实列上的东西 */
class ChildClass extends Component {
    state = { x: 1000 };
    render() {
        return (
            <Typography variant="h4" componet="h6">Child Class Component: {this.state.x}</Typography>
        )
    }
}
/* 基于 ref 获取子组件(函数组件)，会报错，需要配合 React.forwardRef 转发，目的：获取子组件内部的某个元素  */
const  ChildFunction = forwardRef(
    // ref 存在函数组件中的第二个参数
    function ChildFunction(props, ref) {
        return (
            <Typography ref={ref} variant="h4" componet="h6">
                <span>Child Function Component</span>
            </Typography>
        )   
    }
)

/* 函数子组件内部，可以有自己的状态和方法了；如何实现：基于 forwardRef 实现 ref 转发的同时，获取函数子组件内部的状态或者方法呢？ 
    1. useImperativeHandle(ref, callback)
*/
const  ChildFunction1 = forwardRef(
    function ChildFunction1(props, ref) {
        let [text, setText] = useState("Child Function Component 1");

        useImperativeHandle(ref, () => {
            // 在这里返回的内容，都可以被父组件的 REF 对象找到
            return {
                text,
                setText,
                handleSumbit
            }
        });

        const handleSumbit = () => {};
        return (
            <Typography variant="h4" componet="h6">
                <span>{text}</span>
            </Typography>
        )   
    }
)