import { createTheme } from '@material-ui/core/styles';


export const theme = createTheme({
  shape: {
    borderRadius: 6, // 将全局默认圆角从 4px 改为 6px
  },
  //Material-UI 默认使用的是 8px 缩放系数。theme.spacing(2) = 8 *2
  spacing: 8,
  //自定义断点：媒体查询 - 响应式布局
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // palette: {
  //   primary: {
  //     main: '#f44336',
  //   }
  // },
  //修改 Typography 组件中 fontFamily
  typography: {
    fontSize: 16,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  /* 组件的名称，以 Mui 开头 */
  overrides: {
     MuiTypography: {
      root: {
        padding: 8
      }
    },
    MuiButton: {
      root: {
        margin: 8
      }
    },
    MuiGrid: {
      root: {
        padding: 16
      }
    }
  }
});

/*  
  palette：
    1. Material UI 的 palette 是主题的基石，用于定义应用的整体色彩体系
      palette 中的每种颜色（称为一个 intention）都由四个令牌（tokens）组成：
        -- main：颜色的主要色调，必须提供，其他令牌可基于它自动生成。
        -- light：main 的较浅变体（自动计算）。
        -- dark：main 的较深变体（自动计算）。
        -- contrastText：旨在与 main 形成高对比度的文本颜色（自动计算）
    2. Material UI 默认提供了几种语义化调色板：primary、secondary、error、warning、info、success
    3. 示例：(重新定义了 primary， secondary)
        palette: {
          primary: {
            main: purple[500],
          },
          secondary: {
            main: '#f44336',
          },
        }
    

  shape：
    1. Material UI 主题中用于统一控制组件圆角的设计令牌。它结构简单，但能全局影响整个应用的视觉风格
    2. 核心结构：只有一个属性 theme.shape 默认只包含一个属性 borderRadius，默认值为 4（即 4px）。
    3. 修改这个值会同步影响 Paper、Button、Tooltip、输入框、Avatar、Accordion 等十几个内置组件的圆角表现
  

  spacing：
    1. Material UI 的 spacing 是一套基于固定缩放系数的间距系统，用于统一控制 margin、padding、gap 等空白。它让整个应用的间距保持一致的节奏，避免到处写零散的像素值。
    2. Material-UI 默认使用的是 8px 缩放系数。
    3. 核心机制：theme.spacing() 是一个函数，接收数字，乘以基础系数（默认 8），返回像素字符串。
        const theme = createTheme();
        theme.spacing(2);    // '16px'  (8 * 2)
        theme.spacing(0.5);  // '4px'   (8 * 0.5)
        theme.spacing(-1);   // '-8px'  (8 * -1)
        theme.spacing(1, 2); // '8px 16px'  (多参数，对应 padding/margin 简写)
    
    4. 配置方式
      -- 数字（最常用）
          const theme = createTheme({
            spacing: 4, // 基础系数改为 4
          });
      
      -- 数组：数组按索引取值，只支持正整数索引
          const theme = createTheme({
            spacing: [0, 4, 8, 16, 32],
          });
          theme.spacing(0) => 0
          theme.spacing(2) => 8
          theme.spacing(4) => 32
          ⚠️ 数组模式下 theme.spacing(0.5) 或负数会失效。
      
      -- 函数（最灵活）
          const theme = createTheme({
            spacing: (factor) => `${ 0.25 * factor } rem`,
          });
          theme.spacing(4) => '1rem'


  breakpoints:
    1. Material UI 的 breakpoints 是主题中用于响应式设计的核心配置。它定义了屏幕尺寸的断点值，并提供辅助工具，让你能根据屏幕宽度应用不同的样式。
    2. 默认断点值
        断点	      最小值	          说明
        xs	        0px	          超小屏幕（手机）
        sm	        600px	        小屏幕（平板竖屏）
        md	        900px	        中等屏幕（平板横屏）
        lg	        1200px	      大屏幕（笔记本）
        xl	        1536px	      超大屏幕（台式机）

    3. 自定义断点值: 在 createTheme 中通过 breakpoints.values 覆盖默认值
      const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            // 也可以新增断点
            xxl: 1920,
          },
        },
      });
    
    4. 四种核心用法
      -- theme.breakpoints.up(key) — 大于等于某断点
          theme.breakpoints.up(md)  
          '@media (min-width: 900px)'

      -- theme.breakpoints.down(key) — 小于某断点
          theme.breakpoints.down(md)  
          '@media (max-width: 899.95px)'  // 注意有 0.05px 的补偿

      -- theme.breakpoints.between(start, end) — 区间
          theme.breakpoints.between(sm，md)  
          '@media (min-width: 600px) and (max-width: 899.95px)'

      -- theme.breakpoints.only(key) — 仅某断点区间
          theme.breakpoints.only('md')  // 等价于 between('md', 'lg')

  5. 在 styled 中使用
      const Div = styled('div')(({ theme }) => ({
        width: '100%',
        [theme.breakpoints.up('md')]: {  //当屏幕宽度 > md: 900 - 把 with 从 100% 改为 50%
          width: '50%',
        },
      }));
  
  6. 关键辅助工具 -- useMediaQuery
    -- theme.breakpoints.keys：返回断点名称数组 ['xs', 'sm', 'md', 'lg', 'xl']，常用于遍历生成响应式样式。
    -- useMediaQuery Hook：在组件逻辑中判断当前屏幕是否匹配某断点。
        import useMediaQuery from '@mui/material/useMediaQuery';
        function MyComponent() {
          const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
          return isMdUp ? <DesktopView /> : <MobileView />;
        }


  direction：
    1. Material UI 的 direction 是主题中用于控制文本阅读方向的配置项，主要用于支持阿拉伯语、希伯来语等从右到左（RTL）的语言
    2. 核心用法
        const theme = createTheme({
          direction: 'rtl', // 默认是 'ltr'
        });
  

  mixins：
    1. Material UI 的 mixins 是主题中用于存放可复用 CSS 代码片段的配置项。与 spacing、palette 这类定义基础值的属性不同，mixins 更像一个“样式工具箱”，
      里面预置了一些处理常见布局问题的现成样式。
    2. 目前 Material UI 官方主题中，mixins 下唯一预置的成员就是 toolbar。它的作用是为内容区域添加一个最小高度（min-height），以防止内容被固定在顶部的 AppBar 遮挡
      -- 当你使用 position="fixed" 的 AppBar 时，AppBar 会脱离文档流，下方的首屏内容会“钻”到它下面。此时，你可以在内容区域的顶部加一个占位元素，并使用 theme.mixins.toolbar 来撑开高度。
      -- 基本用法
          const Offset = styled('div')(({ theme }) => ({
            ...theme.mixins.toolbar,
          }));
    3. 自定义与扩展 Mixins
      -- 如果你想在 mixins 中添加自己的可复用样式，可以直接在 createTheme 里扩展。
      -- JavaScript 中无需额外配置，直接添加即可：
          const theme = createTheme({
            mixins: {
              urlLink: {
                '&:link': { cursor: 'pointer', color: '#1a0dab' },
                '&:hover': { textDecoration: 'underline' },
              },
            },
          });
        // 使用
        <Box sx={{ ...theme.mixins.urlLink }}>链接</Box>
  
  
  overrides：
    1. 是主题里直接用来覆盖组件样式的顶层键。到了 v5，这个结构被重构，以实现更好的组件中心化定制
    2. 组件的名称，以 Mui 开头，才能覆盖或者添加
                  v4 写法	                              v5 及以后写法
          theme.overrides.MuiButton.root	    theme.components.MuiButton.styleOverrides.root
          theme.props.MuiButton	              theme.components.MuiButton.defaultProps
    
    
  props：
    1. props（在 v5 及以后版本中为 defaultProps）是 Material UI 主题中用于全局修改组件 默认属性的配置项
        v4	  props.MuiButton	                    主题顶层
        v5+	  components.MuiButton.defaultProps	  components 键下

        在 v5 中，原来的 props 键被重命名为 defaultProps，并移到了 components 下，以便与 styleOverrides 并列。

    2. 组件的名称，以 Mui 开头，才能覆盖或者添加
    3. v4 中的正确用法
        props：{
          MuiButton: {
            disableRipple: true, // 全局禁用涟漪
            size: 'small'
          }
        }
    4. v5+ 中的正确用法
       components: {
        MuiButton: {
          defaultProps: {
            // 修改的默认属性
            disableRipple: true, // 全局禁用涟漪效果
            size: 'small'
          },
        },
      },


  shadows：
    1. Material UI 的 shadows 是主题中用于统一管理阴影层级的配置项，它本质上是一个包含 25 个 CSS 阴影值的数组，用于表现元素在 Z 轴上的“高度”或“悬浮感”
    2. theme.shadows 是一个数组，包含从索引 0 到 24 共 25 个阴影值。
      -- 索引 0：固定为 'none'，表示无阴影。
      -- 索引 1-24：预设的、层层递进的阴影效果。数值越大，阴影范围越广、越柔和，视觉上元素“离背景越远”。
      -- 可以直接使用数字来引用这些层级：
          <Box boxShadow={1}>Elevation 1</Box>
          <Box boxShadow={6}>Elevation 6</Box>
    3. 自定义与覆盖： 可以通过 createTheme 完全覆盖默认的 shadows 数组：
        const theme = createTheme({
          shadows: [
            'none', // 索引 0 必须保留
            '0 2px 4px rgba(0, 0, 0, 0.1)', // 覆盖索引 1
            // ... 可以继续覆盖其他索引
          ],
        });
  
  
  transitions：
    1. Material UI 的 transitions 是主题中用于统一管理动画时长和缓动曲线的配置项，并提供辅助函数来生成一致的 CSS transition 值。
    2. 核心配置结构
      -- theme.transitions 主要包含两个配置对象：duration 和 easing。你可以按需覆盖其中任意键，未覆盖的会保留默认值。
          const theme = createTheme({
            transitions: {
              duration: {
                shortest: 150,
                shorter: 200,
                short: 250,
                standard: 300,        // 最基础推荐值
                complex: 375,         // 复杂动画
                enteringScreen: 225,  // 元素进入屏幕
                leavingScreen: 195,   // 元素离开屏幕
              },
              easing: {
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',  // 最常用
                easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',    // 进入减速
                easeIn: 'cubic-bezier(0.4, 0, 1, 1)',       // 离开加速
                sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',      // 可能返回屏幕的元素
              },
            },
        });
      -- 所有 duration 值单位为毫秒，easing 值为 CSS 的 transition-timing-function
  

  typography：（Typography 组件）
    1. Material UI 的 typography 主题是统一管理 字体家族、字号、字重和行高 的核心配置。它提供了一套预设的字体比例（type scale），让文本层级保持一致。
    2. 在 createTheme 中通过 typography 键进行配置：
        const theme = createTheme({
          typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 14, // 默认值
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            // 可以在这里覆盖每个变体的样式
            h1: { fontSize: '2.5rem', fontWeight: 500 },
          },
        });

        <Typography variant="h1">标题</Typography>
    
  
  z-index:
    1. Material UI 的 zIndex 是主题中用于管理图层堆叠顺序的配置项。它提供了一套默认的数值刻度，确保抽屉、模态框、消息条等组件能正确地分层显示。
    2. 默认 Z-Index 层级：MUI 的 zIndex 从 1000 开始，为各组件预设了以下层级：
        mobile stepper: 1000
        fab / speed dial: 1050
        app bar: 1100
        drawer: 1200
        modal: 1300
        snackbar: 1400
        tooltip: 1500
        这些数值足够大且明确，旨在避免与页面上其他
    3. 在组件中使用: 你可以在 sx prop 中直接引用主题的 zIndex 键名，MUI 会自动解析为对应的数值
        <Box sx={{ zIndex: 'modal' }}>...</Box>
        // 等同于 zIndex: 1300
    4. 自定义配置：在 createTheme 的 zIndex 键下进行修改
        const theme = createTheme({
          zIndex: {
            appBar: 1200, // 覆盖默认的 1100
            drawer: 1300, // 覆盖默认的 1200
          },
        });
*/


/* 
  在 v5 及以后版本中，配置路径是 theme.components.[组件名].styleOverrides

  components: {
    // 组件的名称，以 Mui 开头
    MuiButton: {
      styleOverrides: {
        // 插槽（slot）的名称，root 通常指最外层元素
        root: {
          fontSize: '1rem',
          textTransform: 'none',
        },
      },
    },
  },

*/

/* 官网可以查看 theme 对象中的默认属性值 ,V5 之后移除了默认值
  https://v4.mui.com/zh/customization/default-theme/
*/


// 在开发环境中：Material-UI 的 class 名称遵循一个简单的模式：Mui[组件名称]-[样式规则名称]-[UUID] 

/*
  用类名（class names）覆盖样式
    1. 覆盖组件样式的第一种方法是使用类名（class names） 。
    2. 每个组件和元素都提供一个 className 属性，它通常作用于 root 元素。
    3. 使用一个高阶组件 withStyles() 将自定义样式注入 DOM 之中，并通过它的 classes 属性将类名传递给 className 组件
        withStyles({root: {border: 0})(component)

  用类覆盖样式
    1. 当 className 属性不足够时，你需要访问更深层的元素，这时则可使用 classes 对象属性，这样就能够自定义该组件中所有由 Material-UI 注入的 CSS
      <Button
        classes={{
          root: classes.root, // class name, e.g. `classes-nesting-root-x`
          label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }}
      >
        classes nesting
      </Button>
    
  使用全局的类名（ global class names）覆盖样式
  
 */