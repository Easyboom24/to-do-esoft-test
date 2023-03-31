import { observer } from "mobx-react-lite";
import { FC, useEffect, useState, PropsWithChildren } from "react";
import ReactDOM from 'react-dom';


const Portal: FC<PropsWithChildren> = observer(({children}) => {
    const [container] = useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(container);

        return () => {
            document.body.removeChild(container);
        }
    }, [container])
    return ReactDOM.createPortal(children,container);
})
 
export default Portal;