import { withWidth } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component, useContext  } from 'react';
import { ThemeContext } from './context/index';
import {style, useStyles}  from './styles/App/index';


// 函数组件
function App1(props) {
  /* 在组件中获取 createContext: useContext */
  const theme = useContext(ThemeContext);

  console.log(props, theme);
  const classes  = useStyles();

  return (
    <div className={classes.root}>
      hello world
    </div>
  );
}

// 类组件
class App extends Component {

  /* 类中获取 createContext 的值
    1. 需要把 ThemeContext 的值赋给 contextType
    2. 在 this.context 就能读取到
  */
 static contextType = ThemeContext;

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { classes } = this.props;
    console.log(this.props, this.context);
    return (
      <React.Fragment>
        <div className={classes?.root}>
      hello world 1
    </div>
      </React.Fragment>
    )
  }
}

// withWidth 高阶函数执行后会往 props 对象注入一个 width 属性， 它不会修改传递给它的组件；相反，它会返回一个新组件。 这个 width 断点属性与当前屏幕宽度相匹配。 它可以是以下断点之一：Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// export default withWidth()(App1);


// withStyles 高阶函数执行后会往 props 对象注入一个 classes 属性，它不会修改传递给它的组件；相反，它会返回一个新组件。
export default withStyles(style)(App);

