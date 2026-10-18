import { Button } from "@material-ui/core";
import { makeStyles, styled, withStyles } from "@material-ui/styles"

/* makeStyles(styles, [options]) => hook
    1. 第一个参数： styles(* Function | Object *) 是一个生成样式或一个样式对象的函数。 它将被链接到组件中。
         若您需要访问主题，请使用函数签名（theme）=> ({....})。 它是提供的第一个参数。

    2. options (Object [optional]): -- 不常用
        -- options.defaultTheme（Object [optional]）：如果 Theme Provider 为给与任何主题，则会应用默认主题。
        -- options.name (String [optional]): 样式表的名称。 适合调试。
        -- options.flip (Boolean [optional])：当设置为 false 时，此表单将选择退出 rtl 转换。 如果设置为 true时，则会反转样式。 当设置为 null，它依据 theme.direction 而定。
*/
const useStyle =  makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}));

export function UseStylesTest() {
    const classes = useStyle();
    return (
        <>
            <div className={classes.root}>MakeStyles API</div>
            {/* styled  */}
            <StyledCompnent spacing={2} />
            <MyButton variant="contained" color="primary">Styled (Object) Component APIn</MyButton>
            {/* custom styled */}
            <StyledCustomTest spacing={2} />

            {/* withStyles */}
            <WithStylesHOC color='default' />
             {/* custom withStyles */}
            <WithStylesCustomTest raduis={8} />
        </>
    )
}


/* styled(Component, [options])(styles, [options]) => Component 
    1. 是 Material UI 用于创建可复用、带主题感知样式组件的工具，本质上是对 Emotion（或 styled-components）的 styled() 的封装增强
    2. 参数
        -- styles(* Function | Object *) 是一个生成样式或一个样式对象的函数。
            >> 生成样式对象: 样式包裹 Component 组件
            >> 样式回调函数: 接收一个对象，里面包含 theme 和 Component 组件收到的所有 props

        -- Component 是一个组件或者是元素标签（div, span, h1...)
            > 元素标签: 会自动将样式添加到元素标签上
            > 自定义组件或MUI 组件： styled(Component) 默认只会把生成的 className 作为一个 prop 传给 Component

    3. v5 之后 styled 核心选项：name 和 slot
        -- 提供 name 和 slot 后，该组件就能被 theme.components 中的 styleOverrides 和 variants 覆盖。
            const StatRoot = styled('div', {
                name: 'MuiStat',    // 组件名，对应 theme.components.MuiStat
                slot: 'root',       // 插槽名，对应 styleOverrides.root
            })(({ theme }) => ({
                padding: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
            }));

            createTheme({
                components: {
                    MuiStat: {
                    styleOverrides: {
                        root: { backgroundColor: '#121212' },
                    },
                    },
                },
            });

    styled() 的工作方式是：
        1. 生成 CSS 类名（比如 [组件名]-[规则]-[uuid]）
        2. 把这个类名通过 className prop 传给被包裹的组件
        3. 期望被包裹的组件把它挂到某个 DOM 元素上
    
    styled() 期望回调返回的是一个扁平的 CSS 对象
        1. ({ theme }) => ({ root: { padding: ... } })	    ❌	root 不是合法 CSS 属性
        2. ({ theme }) => ({ padding: ... })	            ✅	直接是 CSS 属性
        3. ({ theme }) => ({ '& span': { ... } })	        ✅	嵌套选择器合法

*/      

//{theme: theme: {...}}, ...props}  -> 需要解构出来
const StyledCompnent = styled(ChildComponent)(({theme, ...props}) => {
    // 基于 props 设置动态样式
    const { spacing } = props;
    return ({
        padding: theme.spacing(spacing),
        '& span': {
            display: 'block',
            color: '#2196f3'
        }
    })
})

function ChildComponent(props) {
    const { className } = props;
    return (<div className={className}><span>Styled (Function) Component API</span></div>) 
}

//对组件库 Button 进化样式的修改，会覆盖组件中的所有样式
const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
})

/* 简化版重写 styled 方法 */
const StyledCustomTest = styledCustom(CustomComponent)(({ theme, ...props }) => {
    const { spacing } = props;
    return ({
        padding: theme.spacing(spacing),
        color: '#2196f3'
    })
})
function CustomComponent(props) {
    const { className } = props;
    return <div style={className }>Custom Styled</div>
}
function styledCustom(Component) {
    const theme = {
        spacing: function(value) {
            return (value * 8) + 'px'
        }
    };
    return function wrap(styleFunction) {
        return function styledCustom(props) {
            const className = typeof styleFunction === 'function' ? styleFunction({theme, ...props}) : styleFunction;
            return <Component {...props} className={ className }/>;
        }
    }
}


/* withStyles(styles)(component)
    1. 是 Material UI 在 v4 及更早版本中基于 JSS 的高阶组件（HOC），用于将样式表与组件绑定
    2. 在 v5 及以后，它已被弃用并移至 @mui/styles 包(ThemeProvider, withStyles), 已用 Emotion 替换了 JSS 作为默认样式引擎
    3. 参数：
        -- styles(* Function | Object *) 是一个生成样式或一个样式对象的函数
            >> 生成样式对象: 样式包裹 Component 组件
            >> 样式回调函数: 接收一个对象，里面包含 theme 主题

    4. withStyles(styles)(component) 会把生成的 classes 作为一个 prop 传给 Component
        -- 自定义组件生成的 css 的规则： [组件名称]-[样式规则名称]-[UUID]            --> ChildComponent1-root-uuid
        -- Material-UI 组件生成的 css 的规则： Mui[组件名称]-[样式规则名称]-[UUID]  --> MuiButton-root-uuid
*/
function ChildComponent1(props) {
    const { classes } = props;
    return <Button className={classes.root}> Higher-order component (withStyles) </Button>;
}

//动态 css
const styledBy = (property, mapping) => (props) => mapping[props[property]]

const WithStylesHOC = withStyles((theme) => {
    return {
        root: {
            background: styledBy('color', {
                default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            }),
            border: 0,
            borderRadius: 3,
            // ✅ 属性值本身是函数，JSS 会传入 props
            boxShadow: (props) =>
                props.color === 'blue'
                    ? '0 3px 5px 2px rgba(33, 203, 243, .3)'
                    : '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: theme.spacing(0, 2),
        }
    }
})(ChildComponent1)


/* 自定义 withStyles */
const WithStylesCustomTest = withStylesCustom({
    root: {
        border: 0,
        borderRadius: (props) => props?.raduis,
    }
})(ChildComponent2);

function ChildComponent2(props) {
    const { classes } = props;
    return <Button className={classes.root}> Higher-order component (withStylesCustom) </Button>;
}

/* 底层原理（简化版） */
function withStylesCustom(stylesCreator) {
  return function wrap(Component) {
    return function withStyles(props) {
        // 遍历每条规则，如果值是函数，就用 props 调用它
        const resolvedStyles = {};
        for (const key in stylesCreator) {
            resolvedStyles[key] = {};
            for (const prop in stylesCreator[key]) {
                const value = stylesCreator[key][prop];
                resolvedStyles[key][prop] =
                    typeof value === 'function' ? value(props) : value;
            }
        }
       // 把 resolvedStyles 交给 JSS 编译，生成类名
       // const classes = createStyleSheet(resolvedStyles).classes;
        return <Component {...props} classes={ resolvedStyles }/>;
    };
  };
}

