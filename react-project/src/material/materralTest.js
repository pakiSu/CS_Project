
import React from 'react';
import { UseEffectDemo } from './useEffect';
import { UseMemoTest } from './useMemo';
import { UseCallbackoTest } from './useCallback';
import { UseThemeTest } from './useTheme';
import { UseStylesTest } from './useStyle';


function MaterralTest(props) {
    
    return (
        <React.Fragment>
            {/* <UseEffectDemo {...props}/> */}
            {/* <UseMemoTest {...props} /> */}
            {/* <UseCallbackoTest {...props} /> */}
            {/* <UseThemeTest  {...props} /> */}
            <UseStylesTest {...props} />
        </React.Fragment>
    )
}


export default MaterralTest;