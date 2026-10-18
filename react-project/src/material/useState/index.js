import { Button, Typography } from "@material-ui/core"
import { useState } from "react"
import { flushSync } from "react-dom";

/*
    usestate：ReactHook 函数之一，目的是在【函数组件】中使用状态，并且后期基于状态的修改，可以让组件更新
    let [num,setNum] = useState(initialValue);
        1. 执行 useState，传递的 initialvalue 是初始的状态值 ()
        2. 执行这个方法，返回结果是一个数组：[状态值，修改状态的方法]
         -- num 变量存储的是：获取的状态值
         -- setNum 变量存储的是：修改状态的方法
        3. 执行 setNum(value)
         -- 修改状态值为 value
         -- 通知视图更新
    
    函数组件【或者Hooks组件】不是类组件，所以没有实例的概念【调用组件不再是创建类的实例，而是把函数执行，产生一个私有上下文而已】
    再所以，在函数组件中不涉及this的处理！！

    函数组件的每一次渲染（或者是更新），都是把函数（重新）执行，产生一个全新的“私有上下文”！
     -- 内部的代码也需要重新执行
     -- 涉及的函数需要重新的构建【 这些函数的作用域（函数执行的上级上下文），是每一次执行函数组件产生的闭包 】
     -- 每一次执行函数组件，也会把 useState 重新执行，但是：
        ++ 执行 useState，只有第一次，设置的初始值会生效，其余以后再执行，获取的状态都是最新的状态值「而不是初始值」
        ++ 返回的修改状态的方法，每一次都是返回一个新的函数（堆地址变了）
    
    大概原理：
        var _state;
        function useState(initialValue) {
            if (typeof _state=="undefined") {
                if(typeof initialValue=--"function"){
                    state =initialValue();
                else{
                    _state=initialvalue;
                }
            }
            var setState= function setState(value) {
                //做比较
                if(Object.is(_state, value)) return；
                _state = value;
                //通知视图更新
            }；
            return [_state, setState];
        }
        let [num1,setNum] = useState(o);//num1=0，setNum(ox001)
        setNum(100）;//=> state=100 通知视图更新

        let [num2,setNum] =useState(o);//num2=100，setNum(ox002)
*/
  
export function UseStateTest() {
    let [num, setNum] = useState(0);
    const handleAdd = () => {
        setNum(num+10);
        setTimeout(() =>{
            console.log(num); // 0
        }, 1000)
    }
    return (
        <div>
            <Typography variant="h4" component="h5">{num}</Typography>
            <Button variant="contained" color="primary" onClick={handleAdd}>新增</Button>
        </div>
    )
}

/* 
    执行一次useState：把需要的状态信息都放在对象中统一管理
    1. 执行setState方法的时候，传递的是啥值，就把状态“整体”改为啥值
        setState({
            supNum: state.supNum + 1
        })
        => 把状态值修改为 { supNum：11 }，oppNum 成员就丢失了
        => 并不会像【类组件】中的 this.setState 一样，不支持部分状态的更新
    2. 应该改为以下的处理方案
        setState({
            ..·state，//【浅拷贝】在修改值之前，先把原有的所有状态，都展开赋值给新对象，再去修改要改动的那一项值即可 
            supNum: state.supNum + 1
        });  
    3. 官方建议是：需要多个状态，就把 useState 执行多次即可
        let [supNum,setSupNum]= useState(10),
            [oppNum，setOppNum]= useState(5);
*/
export function UseStateTest1() {
    let [state, setState] = useState({
        supNum: 10,
        oppNum: 5
    });
    const handleAdd = (type) => {
        if(type === 'sup') {
            // setState({supNum: state.supNum + 1});
            setState({...state, supNum: state.supNum + 1});
        } else {
            // setState({supNum: state.oppNum + 1});
            setState({...state, oppNum: state.oppNum + 1});
        }
    }
    return (
        <div>
            <Typography variant="h4" component="h5">反对：{state.oppNum}</Typography>
            <Typography variant="h4" component="h5">支持：{state.supNum}</Typography>
            <Button variant="contained" color="primary" onClick={handleAdd.bind(null, "opp")}>反对</Button>
            <Button variant="contained" color="primary" onClick={handleAdd.bind(null, "sup")}>支持</Button>
        </div>
    )
}

/* 批量更改状态，不会每次状态都更新视图，只会渲染一次 */
export function UseStateTest2() {
    console.log("UseStateTest2 Render...");
    let [x, setX] = useState(10),
        [y, setY] = useState(10),
        [z, setZ] = useState(10);

    
    const handleAdd = () => {
        /* 三次状态更新，但是只会渲染一次 */
        setX(x+1);
        console.log(x); // 10, 因为这个作用域是前一次 x=10
        setY(y+1);
        setZ(z+1);

        /* 三次异步状态更新，也只会渲染一次 */
        // setTimeout(()=>{
        //     setX(x+1);
        //     setY(y+1);
        //     setZ(z+1);
        // }, 1000)

        /* 会更新两次， flushSync 会立即刷新更新队列，视图更新 */
        // flushSync(()=> {
        //     setX(x+1);
        // });
        // setY(y+1);
        // setZ(z+1);
        // // 或者如下写法
        // setX(x+1);
        // flushSync()
        // setY(y+1);
        // setZ(z+1);

    }
    return (
        <div>
            <Typography variant="h4" component="h5">x:{x}</Typography>
            <Typography variant="h4" component="h5">y:{y}</Typography>
            <Typography variant="h4" component="h5">z:{z}</Typography>
            <Button variant="contained" color="primary" onClick={handleAdd}>新增</Button>
        </div>
    )
}

/* 
    useState自带了性能优化的机制:
        1. 每一次修改状态值的时候，会拿最新要修改的值和之前的状态值做比较【基于 object.is 作比较 - 浅比较】
        2. 如果发现两次的值是一样的，则不会修改状态，也不会让视图更新【可以理解为：类似于PureComponent，在shouldComponentUpdate中做了比较和优化】
*/
export function UseStateTest3() {
    let [x, setX] = useState(10);
     console.log("UseStateTest3 Render...", x);

    /* 不会渲染，因为与前一次的值相同 x = 10 */
    const handleAdd = () => {
        /* 一直点击按钮并且不会更新视图 */
        setX(10); 
    }

    /* 只会渲染1次，x = 11 */
    const handleFlush = () => {
        for(let i = 0; i < 10; i++) {
            flushSync(() => {
                setX(x+1) //不是更新10次
            });
        }
    }

    /* 只会渲染 1 次，但是 x = 20 */
    const handleModify = () => {
       for(let i = 0; i < 10; i++) {
           setX(prev => {
                // prev: 存储的是上一次的状态值
                console.log("prev: ", prev);
                return prev + 1; //返回的信息是我们要修改的状态值
           })
        } 
    }

    return (
        <div>
            <Typography variant="h4" component="h5">x:{x}</Typography>
            <Button variant="contained" color="primary" onClick={handleAdd}>新增</Button>
            <Button variant="contained" color="primary" onClick={handleFlush}>刷新</Button>
            <Button variant="contained" color="primary" onClick={handleModify}>修改</Button>
        </div>
    )
}

/* useState 情性化处理 */
export function UseStateTest4(props) {
    //我们需要把基于属性传递进来的x/y，经过其他处理的结果作为初始值
    console.log("UseStateTest4 Render...", props);

    /* 每次组件更新会重新执行计算方法把结果赋值给 useState， 但是不会生效，因为初始化只会在第一次调用赋值，
    组件更新是不会赋值，这样子就会导致无效的计算过程 */
    // let { x, y } = props,
    //     total = 0;
    // for(let i = x; i < y; i++) {
    //     total += String(Math.random()).substring(2);
    // }
    // let [num, setNum] = useState(total);

    /* 此时我们需要对初始值的操作，进行情性化处理：只有第一次渲染组件处理这些逻辑，以后组件更新，这样的逻辑就不要再运行了 */
    let [num,setNum] = useState(()=> {
        let { x, y } = props,
            total = 0;
        for (let i= x; i<= y; i++){
            total += +String(Math.random()).substring(2);
        }
        return total;
    });

    const handleAdd = () => {
        setNum(1000); 
    }

    return (
        <div>
            <Typography variant="h4" component="h5">{num}</Typography>
            <Button variant="contained" color="primary" onClick={handleAdd}>新增</Button>
        </div>
    )
}