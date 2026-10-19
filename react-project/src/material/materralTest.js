import React from 'react';
import { UseEffectDemo } from './useEffect';
import { UseMemoTest, UseMemoTest1 } from './useMemo';
import { UseCallbackoTest, UseCallbackoTest1 } from './useCallback';
import { UseThemeTest } from './materialUI/useTheme';
import { UseStylesTest } from './materialUI/useStyle';
import  WithWidthTest from './materialUI/withWidth';
import { UsecontextTest, UseConsumerTest } from './useContext';
import UsecontextClassTest from './useContext';
import { ContextConsumer } from '../context';
import { UseRefTest } from './useRef';
import { UseStateTest, UseStateTest1, UseStateTest2, UseStateTest3, UseStateTest4 } from './useState';
import { CustomHookTest } from "./customHook";



function MaterralTest(props) {
    
    return (
        <React.Fragment>
            {/* <UseStateTest {...props} />
            <UseStateTest1 {...props} />
            <UseStateTest2 {...props} />
            <UseStateTest3 {...props} />
            <UseStateTest4 x={5} y={10} /> */}

            {/* <UseEffectDemo {...props}/> */}

            {/* <UseRefTest {...props}/> */}

            {/* <UseMemoTest {...props} />
            <UseMemoTest1 {...props} /> */}

            {/* <UseCallbackoTest {...props} />
            <UseCallbackoTest1 {...props}/> */}

            {/* <UseThemeTest  {...props} /> */}

            {/* <UseStylesTest {...props} /> */}

            {/* <WithWidthTest {...props} /> */}

            {/* <UsecontextTest {...props} />
            <ContextConsumer>{
                (value) => (
                    <UseConsumerTest  {...props} value={value}/>
                )
            }</ContextConsumer>
            <UsecontextClassTest {...props} /> */}

            <CustomHookTest {...props}/>
        </React.Fragment>
    )
}


export default MaterralTest;