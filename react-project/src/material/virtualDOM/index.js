import React, { useEffect } from "react"
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

   useEffect(() => {
        let virtualDom = createElement(
           "div",
            null,
            createElement("h2", 
                {className: "title" },
                "自定义 createElement and render"
            ),
            createElement(
                "div", 
                { className:"box" },
                createElement("span",null, 1),
                createElement("span",null, 2)
            )
        );
        render(virtualDom, document.getElementById('root'))
   }, []);
    
    
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

        第二步：把构建的 virtualDOM 【 DOM-DIFF 】渲染为真实 DOM
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
        
        第三步：基于 react render 方法把 virtualDOM 变为真实 DOM, 在插入父容器中 (parent element) 

        
        补充说明：第一次渲染页面是直接从 virtualDOM -> 真实 DOM；但是后期视图更新的时候，需要经过一个 DOM-DIFF 的对比，
            计算出补丁包 PATCH（两次视图差异的部分），把 PATCH 补丁包进行渲染！！
*/


/* createElement: 创建虚拟 DoM 对象* */
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
        virtualDOM.props={ ...props };
    }
    if (len === 1) virtualDOM.props.children =children[0];
    if (len> 1) virtualDOM.props.children = children;
    return virtualDOM;
}


/* render:把虚拟 DOM 变为真实 DOM */
function render(virtualDoM, container) {
    let {type, props} = virtualDoM;
    if (typeof type == "string") {
        //存储的是标签名：动态创建这样一个标签
        let ele = document.createElement(type);
        //为标签设置相关的属性&子节点
        each(props,(value, key) => {
            //className的处理：value 存储的是样式类名
            if (key === 'className'){
                ele.className = value;
            }

            //style 的处理：value 存储的是样式对象
            if (key === 'style') {
                each(value, (val, attr) =>{
                    ele.style[attr] =val;
                });
                return;
            }
            
            //子节点的处理：value 存储的 children 属性值
            if (key === 'children') {
                let children = value;
                if (!Array.isArray(children)) children = [children];
                children.forEach(child => {
                    //子节点是文本节点：直接插入即可
                    if (typeof child === "string"){
                        ele.appendChild(document.createTextNode(child));
                        return;
                    }
                    //子节点又是一个 virtualDoM：递归处理
                    render(child, ele);
                });
                return;
            }
            ele.setAttribute(key,value);
        });
        //把新增的标签，增加到指定容器中
        container.appendChild(ele);
    }
}

/* 
    封装一个对象迭代的方法
        1. 基于传统的for/in循环，会存在一些弊端「性能较差（既可以迭代私有的，也可以迭代公有的）；只能迭代“可枚举、非Symbol类型的”属性...」
        2. 解决思路：获取对象所有的私有属性「私有的、不论是否可枚举、不论类型」
            -- Object.getownPropertyNames(arr) -> 获取对象 非Symbol 类型的私有属性「无关是否可枚举」
            -- Object.getownPropertySymbols(arr) -> 获取 Symbol 类型的私有属性
            获取所有的私有属性：
            let keys = Object.getOwnPropertyNames(arr).concat(object.getOwnPropertySymbols(arr));
            可以基于 ES6 中的 Reflect.ownKeys  代替上述操作「弊端：不兼容IE」
            let keys =Reflect.ownKeys(arr);
*/

const each = function each(obj, callback) {
    if (obj === null && typeof obj != "object") throw new TypeError('obj is not a object');
    if (typeof callback !== "function") throw new TypeError('callback is not a function');
    let keys = Reflect.ownKeys(obj);
    keys.forEach(key =>{
        let value =obj[key];
        //每一次迭代，都把回调函数执行
        callback(value,key);
    });
}

/* 
    为元素设置属性「自定义/内置」，有两种方式:
        1.元素.属性 = 属性值
            -- 原理：对于内置属性，是设置在元素的标签上；对于自定义属性来讲，是给对象的堆内存空间中新增成员「不会设置到标签上」
            -- 获取：元素.属性
            -- 删除：delete 元素.属性

        2.元素.setAttribute（属性，属性值）
            -- 原理：直接写在元素的标签上
            -- 获取：getAttribute
            -- 删除：removeAttribute

    二者不能混淆！！—「排除内置属性的特殊性」
*/