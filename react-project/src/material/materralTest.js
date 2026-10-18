import React from 'react';
import { UseEffectDemo } from './useEffect';
import { UseMemoTest } from './useMemo';
import { UseCallbackoTest } from './useCallback';
import { UseThemeTest } from './materialUI/useTheme';
import { UseStylesTest } from './materialUI/useStyle';
import  WithWidthTest from './materialUI/withWidth';
import { UsecontextTest, UseConsumerTest } from './useContext';
import UsecontextClassTest from './useContext';
import { ContextConsumer } from '../context';
import { UseRefTest } from './useRef';
import { UseStateTest, UseStateTest1, UseStateTest2, UseStateTest3, UseStateTest4 } from './useState';



function MaterralTest(props) {
    
    return (
        <React.Fragment>
            <UseStateTest {...props} />
            <UseStateTest1 {...props} />
            <UseStateTest2 {...props} />
            <UseStateTest3 {...props} />
            <UseStateTest4 x={5} y={10} />

            {/* <UseEffectDemo {...props}/> */}

            {/* <UseRefTest {...props}/> */}

            {/* <UseMemoTest {...props} /> */}

            {/* <UseCallbackoTest {...props} /> */}

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



        </React.Fragment>
    )
}


export default MaterralTest;