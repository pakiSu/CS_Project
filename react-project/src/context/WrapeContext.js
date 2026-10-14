import { useEffect, useState } from 'react';
import { ContextProvider } from './index'

export const WrapeContextProvider = (props) => {
    /* props.children 存放的是这个组件中的插槽 */
    const {children, theme} = props;

    /* 自定义 useHook 函数 */
    const width = useScreenWith(theme)

    return (<>
        <ContextProvider value= {{...theme, width}} >
            {children}
        </ContextProvider>
    </>)
}

const useScreenWith = (theme) => {
    // ❌ 每次渲染都会执行 createInitialState()
    // const [widthProp, setWidthProp] = useState(getThemeWidth(theme));

    // ✅ 传入函数，只执行一次 > useState 的惰性初始化用函数即可，不需要 useMemo
    const [widthProp, setWidthProp] = useState(() => getThemeWidth(theme));

    useEffect(() => {
        const handler = () => {
            let themeWidth   = getThemeWidth(theme);
            setWidthProp(themeWidth);
        }
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        }
    }, [widthProp, theme]);
    return widthProp;
}

const getThemeWidth = ({ breakpoints: { values } = {} } = {}) => {
    const widths =  Object.values(values);
    let width = 0;
    for(let i = 0; i < widths.length; i++) {
        if(window.innerWidth >= widths[i] && (!widths[i+1] || window.innerWidth < widths[i+1])) {
            width = widths[i]
            break;
        } 
    }
    return width;
}