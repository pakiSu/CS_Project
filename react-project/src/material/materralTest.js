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
import { UseRefTest, RefClassTest } from './useRef';
import { UseStateTest, UseStateTest1, UseStateTest2, UseStateTest3, UseStateTest4 } from './useState';
import { CustomHookTest } from "./customHook";
import { UseStateDemo } from "./useState/index1";
import  VoteClass  from "./componet-communication/class/vote";


function MaterralTest(props) {
    
    return (
        <React.Fragment>
            {/* <UseStateTest {...props} />
            <UseStateTest1 {...props} />
            <UseStateTest2 {...props} />
            <UseStateTest3 {...props} />
            <UseStateTest4 x={5} y={10} /> */}

            {/* <UseStateDemo {...props}/> */}

            {/* <UseEffectDemo {...props}/> */}

            {/* <UseRefTest {...props}/> */}
            {/* <RefClassTest {...props} /> */}

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

            {/* <CustomHookTest {...props}/> */}

            {/* component communication */}
            <VoteClass {...props}/>
        </React.Fragment>
    )
}


export default MaterralTest;