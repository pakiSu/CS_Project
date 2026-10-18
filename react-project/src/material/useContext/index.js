
import React, { useContext } from 'react';
import { ThemeContext } from '../../context';
import { Typography } from '@material-ui/core';


/* 
    useContext, contextType
    1. 是 React 提供的一个 Hook，主要用于跨组件共享数据，避免一层一层地通过 props 传递数据
    2. 使用 useContext 可以让函数组件直接访问上下文（Context）中的值，而不需要通过 props 逐层传递。
    3. 使用 useContext 的步骤：
        - 创建一个 Context 对象，通常使用 React.createContext()。   
        - 在组件树的上层使用 Context.Provider 提供一个值，这个值可以是任何类型的数据。
        - 在需要使用这个上下文值的函数组件中，调用 useContext(Context) 来获取当前的上下文值。

    4. useContext 的参数是一个 Context 对象，而不是 Context.Provider 或 Context.Consumer。

    5. 当 Context 的值发生变化时，使用 useContext 的组件会重新渲染，以反映最新的上下文值。

    6. useContext 适用于函数组件，
    
    7. 对于类组件，可以使用 static contextType 或者 Context.Consumer 来访问上下文。
        --  Context 对象赋值给 contextType 静态属性，这样类组件就可以通过 this.context 访问上下文值。
            static contextType = ThemeContext;  
            const contextValue = this.context;
*/

export function UsecontextTest(props) {
  const contextValue = useContext(ThemeContext)
  return <>
    <Typography variant="h5" component="h2">
        组件函数：get ContextValue for screenWidth: { contextValue.width }
    </Typography>
  </>;
}


/* Consumer 
    1. Consumer 是 React Context 提供的一个组件，用于在类组件中访问上下文（Context）中的值。
    2. Context.Consumer 是负责订阅并读取对应 Context 的值。
    3. 使用 Consumer 的步骤：
        - 创建一个 Context 对象的 Consumer，通常使用 React.createContext()。
        - 在组件树的上层使用 Context.Provider 提供一个值，这个值可以是任何类型的数据。
        - 在需要使用这个上下文值的类组件中，使用 Context.Consumer 组件，并通过函数作为子组件来访问上下文值。
            {（value）=> { ... } }  函数返回 JSX 是真正需要渲染的界面。
*/
export function UseConsumerTest(props) {
    const { value: theme } = props;
  return <>
    <Typography variant="h5" component="h2">
        组件函数：Consumer Context for screenWidth: { theme.width }
    </Typography>
  </>;
}


class UsecontextClassTest extends React.Component {
    static contextType = ThemeContext;
    render() {
        const contextValue = this.context;
        return <>
            <Typography variant="h5" component="h2">
                类组件：get ContextValue for screenWidth: { contextValue.width }
            </Typography>
        </>;
    }
}         
     
export default UsecontextClassTest;


/* Consumer 与 useContext 对比
    对比	              Consumer	           useContext
    使用方式            函数作为子节点	            Hook
    能否用于类组件       可以	                    不可以直接用于类组件
    能否用于函数组件	 可以	                    可以
    代码简洁度	         相对繁琐	                更简洁
    是否需要 Provider	 不一定，可使用默认值	     不一定，可使用默认值
*/