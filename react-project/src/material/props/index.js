import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const PropsDemo = function PropsDemo(props) {
    console.log("isFrozen: ", Object.isFrozen(props));
    let { title,  subTtitle, children } = props;

    //要对 children 的类型做处理 可以基于 React.Children 对象中提供的方法，对 props.children 做处理: count\forEach\map\toArray.··
    //好处：在这些方法的内部，已经对children的各种形式做了处理
    /* if (!children) {
            children=[];
        } else if (!Array.isArray(children)) {
            children =[children];
        }
    */
    children = React.Children.toArray(children);

    /* 实现插槽根据对应的值 */
    let headerslot = [],
        footerSlot = [];
    children.forEach(child=>{
        //传递进来的插槽信息，都是编译为 virtualDOM 后传递进来的「而不是传递的标签」
        let{ slot }= child.props;
        if (slot === 'header'){
            headerslot.push(child);
        } else {
            footerSlot.push(child);
        }
    });
    return <>
        <Typography variant="h4">{title} - {subTtitle}</Typography>
        <Typography variant="h5">{headerslot}</Typography>
        <Typography variant="h6">{footerSlot}</Typography>
    </>
}

//设置默认值
PropsDemo.defaultProps = {
    subTtitle: "Props"
}
//设置规则
PropsDemo.propTypes = {
    title: PropTypes.string.isRequired,
    subTtitle: PropTypes.string 
}

export default PropsDemo; 

/* 
    关于对象的规则设置
        1. 冻结
            -- 冻结对象：Object.freeze(obj)
            -- 检测是否被冻结：Object.isFrozen(obj）=> true/false
            -- 被冻结的对象：不能修改成员值、不能新增成员、不能删除现有成员、不能给成员做劫持「object.defineProperty」
        
        2. 密封
            -- 密封对象：Object.seal(obj)
            -- 检测是否被密封：Object.isSealed(obj)
            -- 被密封的对象：可以修改成员的值，但也不能删、不能新增、不能劫持！！
        
        3. 扩展
            -- 把对象设置为不可扩展：Object.preventExtensions(obj)
            -- 检测是否可扩展：Object.isExtensible(obj)
            -- 被设置不可扩展的对象：除了不能新增成员、其余的操作都可以处理！！
    
        被冻结的对象，即是不可扩展的，也是密封的！！同理，被密封的对象，也是不可扩展的！！
*/

/* 
    2，属性props的处理
        1. 调用组件，传递进来的属性是“只读”的「原理：props 对象被冻结了」
            -- Object.isFrozen(props) -> true
            -- 获取:props.xxx
            -- 修改：props.xxx=XXX => 报错

        2. 作用：父组件调用子组件的时候，可以基于属性，把不同的信息传递给子组件；子组件接收相应的属性值，呈现出不同的效果，让组件的复用性更强！！
            -- 虽然对于传递进来的属性，我们不能直接修改，但是可以做一些规则校验
            -- 设置默认值
                    函数组件.defaultProps={
                        subTtitle: "Props"
                    }
            -- 设置其它规则，例如：数据值格式、是否必传..·「依赖于官方的一个插件：prop-types」
                https://github.com/facebook/prop-types
                import PropTypes from 'prop-types';
                函数组件.propTypes={
                    //类型是字符串、必传
                    title: PropTypes.string.isRequired,
                    //类型是数字
                    x: PropTypes.number
                    //多种校验规则中的一个
                    y: PropTypes.one0fType([
                        PropTypes.number,
                        PropTypes.bool
                    ])
                }
                传递进来的属性，首先会经历规则的校验，不管校验成功还是失败，最后都会把属性给形参props，只不过如果不符合设定的规则，控制台会抛出
                警告错误{不影响属性值的获取}！！

*/