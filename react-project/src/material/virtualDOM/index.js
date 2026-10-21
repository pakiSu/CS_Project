import React from "react"
import { useState } from "react"

export function VirtualDOMDemo() {
    let [x, setX] = useState(10),
        [y, setY] = useState(5)

    console.log(
        React.createElement(
            React.Fragment,
            null,
            React.createElement("h2", 
                {className: "title" },
                "\u73E0\u5CF0\u57F9\u8BAD"
            ),
            React.createElement(
                "div", 
                { className:"box" },
                React.createElement("span",null, 1),
                React.createElement("span",null, 2)
            )
        )
    );

    console.log("自定义简单版 createElement");
    console.log(
        createElement(
            React.Fragment,
            null,
            createElement("h2", 
                {className: "title" },
                "\u73E0\u5CF0\u57F9\u8BAD"
            ),
            createElement(
                "div", 
                { className:"box" },
                createElement("span",null, 1),
                createElement("span",null, 2)
            )
        )
    );
    
    /* 胡子语法中，不能之前嵌入除数组外的其他对象，但是有一个对象是可以直接嵌入的：JSX元素对象「虚拟DOM对象」->  React.createElement */
    return <>
        <h2 className="title">React 课程</h2>
        <div className="box">
            <span>{x}</span>
            <span>{y}</span>
            { React.createElement('button', null, '点击') }
        </div>
    </>
}

/* 
    1.关于JSX底层处理机制
        第一步：把我们编写的 JSX 语法，编译为虚拟 DOM 对象「virtualDOM」 
            -- 虚拟 DOM 对象：框架自己内部构建的一套对象体系（对象的相关成员都是 React 内部规定的），基于这些属性描述出，我们所构建视图中的，DOM 节点的相关特征！！
                1.  基于 babel-preset-react-app 把 JSx 编译为 React.createElement(...）这种格式!！
                    只要是元素节点，必然会基于 createElement 进行处理！
                    React.createElement(ele,props,..children)
                        + ele：元素标签名「或组件」
                        + props：元素的属性集合（对象）「如果没有设置过任何的属性，则此值是null」
                        + children：第三个及以后的参数，都是当前元素的子节点
                2. 再把 createElement 方法执行，创建出 virtualDoM 虚拟 DoM 对象「也有称之为：JSX 元素、JSX 对象、ReactChild 对象.·..」！！
                    virtualDOM = {
                        $$typeof:Symbol(react.element),
                        ref: null,
                        key: null,
                        type：标签名「或组件」，
                        //存储了元素的相关属性&子节点信息
                        props: {
                            元素的相关属性，
                            children：子节点信息「没有子节点则没有这个属性、属性值可能是一个值、也可能是一个数组」
                        }
                    }

        第二步：把构建的 virtualDOM 渲染为真实 DOM
            -- 真实 DOM：浏览器页面中，最后渲染出来，让用户看见的 DOM 元素！！
            --  基于 ReactDoM 中的 render 方法处理的！！
                React v16
                    ReactDoM.render(
                        <>..</>,
                        document.getElementById('root')
                    }

                React v18
                    const root = ReactDoM.createRoot(document.getElementById('root'));
                    root.render(<>...</>)
        
        补充说明：第一次渲染页面是直接从 virtualDOM -> 真实 DOM；但是后期视图更新的时候，需要经过一个 DOM-DIFF 的对比，
            计算出补丁包 PATCH（两次视图差异的部分），把 PATCH 补丁包进行渲染！！
*/

/* createElement: 创建虚拟DoM对象* */
function createElement(ele, props, ...children) {
    let virtualDOM = {
        $$typeof:Symbol('react.element'),
        key: null,
        ref: null,
        type: null,
        props:{}
    };
    let len = children.length;
    virtualDOM.type = ele;
    if (props !== null){
        virtualDOM.props={... props};
    }
    if (len === 1) virtualDOM.props.children =children[0];
    if (len> 1) virtualDOM.props.children = children;
    return virtualDOM;
}