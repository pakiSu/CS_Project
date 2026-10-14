import { useTheme, withTheme  } from '@material-ui/core/styles';
import { Component } from 'react';


/* useTheme:
    1. 是 Material UI 提供的一个 React Hook，用于在函数组件中直接获取当前的主题对象。
    2. 是访问 theme 最简便的方式。
    3. 底层原理
        -- 本质上是 React.useContext(ThemeContext) 的封装。ThemeProvider 通过 Context 注入主题，useTheme 从 Context 中读取。
        -- 这也意味着：如果组件不在 ThemeProvider 内，useTheme 会返回默认主题（不是报错）。

*/

export function UseThemeTest(props) {
    const theme = useTheme();
    return (
        <>
            <div className={theme.spacing(2)}>父组件获取 useTheme: {theme.spacing(2)} px</div>
            <ThemeChild/>
            <ThemeChild1/>
        </>
    )
}

/* withTheme：
    1. 是 Material UI 早期版本（v4 及更早）提供的一个高阶组件（HOC），用于在类组件中获取当前的主题对象。
    2. 通过包裹组件，将 theme 作为 props 注入进去，主要用于类组件或需要将主题作为 props 传递的场景
    3. 在 Material UI v5之后 中，withTheme 已经从 @material-ui/core/styles 包中被移除。官方明确推荐使用 useTheme Hook 替代。

*/

//从 props 解构出 spacing
function WithThemeChild({theme: { spacing } = ()=> {}} ={}) {
    return (<div> 函数子组件获取 withTheme: {spacing(2)} px </div>)
}

class WithThemeChild1 extends Component {
    render() {
        let {theme: { spacing } } = this.props;
        return (<div> 类子组件获取 withTheme: { spacing(2) } px </div>)
    }
}

const ThemeChild = withTheme(WithThemeChild)
const ThemeChild1 = withTheme(WithThemeChild1)

