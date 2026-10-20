
## 父子组件通信：
  1. 就是以父组件为主导，基于 “属性” 实现通信
     原因：只有父组件可以调用子组件，此时才可以基于属性，把信息传递给子组件
        -- 父组件基于属性，可以把信息传递给子组件【父 -> 子】
        -- 父组件基于属性「 插槽」children，可以把 HTML 结构传递给子组件【父 -> 子】
        -- 父组件把方法基于属性传递给子组件，子组件把传递的方法执行【子 -> 父】
 
 2. 父组件基于 ref 获取子组件实例【或者子组件基于 uselmperativeHandle 暴露的数据和方法】



## 属性的传递方向是单向的
 1. 父组件可基于属性 props 把信息传给子组件
 2. 子组件无法基于属性给父组件传信息；但可以把父组件传递的方法执行，从而实现子改父！



## 组件渲染的顺序：依赖于深度优先原则
 1. 父组件第一次渲染：
        父 willMount -> 父 render【 子 willMount -> 子 render -> 子 didMount 】-> 父 didMount

 2. 父组件更新：
        父 shouldUpdate -> 父 willUpdate -> 父 render【 子 willReciveProps -> 子 shouldUpdate -> 子 willUpdate -> 
        子 render -> 子 didUpdate 】-> 父 didUpdate

 3. 特殊：我们完全可以在子组件内部做优化处理，验证传递的属性值有没有变化，如果没有变化，则禁止更新

 4. 父组件释放：
        父 willUnmount -> 父释放中【 子 willUnMount-> 子释放 】-> 父释放
