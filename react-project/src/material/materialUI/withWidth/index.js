import {withWidth,Typography } from '@material-ui/core';


function WithWidthTest(props) {
  const { width, ...other } = props;
  return <Typography variant="h5" component="h2" {...other}>
    Current width: {width}
  </Typography>;
}

export default withWidth({
    initialWidth: 'sm',
    resizeInterval: 200,
    withTheme: true
}
)(WithWidthTest);

/* withWidth
    1. 是一个高阶组件（Higher-Order Component，HOC），主要用于获取当前浏览器窗口的宽度区间（breakpoint），
        然后把这个信息作为 width 属性通过 props 传给 React 组件。
    2. 它会根据 Material-UI 的响应式设计系统，将浏览器窗口的宽度划分为几个区间（xs、sm、md、lg、xl），并在组件中提供当前的宽度区间。
    3. 使用 withWidth 可以让组件根据不同的屏幕宽度做出不同的渲染或样式调整，从而实现响应式设计。
    4. 如果你使用的是 Material-UI v5 或更高版本，通常推荐使用 useMediaQuery 或 useTheme。
    5. withWidth({}) 参数：
        - initialWidth: 指定初始的宽度区间，通常用于服务器端渲染（SSR）时，确保组件在首次渲染时有一个合理的宽度值。
        - resizeInterval: 指定监听窗口大小变化的间隔时间（毫秒），以减少频繁的重新渲染。    
        - withTheme: 如果设置为 true，组件将会接收 theme 属性，允许你在组件中访问 Material-UI 的主题对象。
        - noSSR: 如果设置为 true，组件将不会在服务器端渲染时使用 initialWidth，而是直接使用客户端的宽度。
            这在某些情况下可能会导致首次渲染时的宽度不准确，但可以避免在 SSR 时出现不必要的样式问题。

    6. withWidth 和 useMediaQuery 的区别

        对比	       withWidth	      useMediaQuery
        类型	      高阶组件 HOC	        React Hook
        返回内容	  注入 width 属性	    返回布尔值
        适用场景	  需要统一获取断点	     判断具体媒体查询
        MUI 版本	  v4 支持	            v4、v5 及后续版本支持
*/