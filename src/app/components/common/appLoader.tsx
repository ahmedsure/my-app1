/* eslint-disable jsx-a11y/alt-text */
'use client'

/* eslint-disable @next/next/no-img-element */
const ApplicationLoader = ({ isLoading }) => {
    return (
        isLoading ?
            (<div className="row">
                <img
                    width="100%"
                    src="./images/1CsJ05WEGfunYMLGfsT2sXA.gif" />
            </div>) : (<></>)
    )
}

export default ApplicationLoader;