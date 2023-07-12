/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react';
import styles from './banner.module.css'
import { navigationCTX } from './app';
import Navs from '../helpers/navigations';
import { WithTime } from './WithTime';
const Banner = (props: { headerText?: any; children?: any; }) => {
    const ctxValues = useContext(navigationCTX);
    const { navigate } = ctxValues?.nav;
    return (
        <header className="row">
            <div className='row'>
                <div className="col-4 mb-3">
                    <img alt="img"
                        src="./images/global-log.jpg"
                        className={styles.logo}
                        onClick={() => { navigate(Navs.home) }} />
                </div>
                <div className={styles.subTitleStyle + "col-6 mt-3 "}
                    style={{ fontStyle: 'italic' }}>
                    {props.headerText && props.headerText} <WithTime color='primary'></WithTime>
                    {props?.children && props.children}
                </div>
            </div>
        </header>
    );
}

export default Banner;