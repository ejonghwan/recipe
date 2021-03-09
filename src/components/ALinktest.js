import React from 'react'
import propTypes from 'prop-types'

const ALink = ({ path="asdasd", children, blank, size }) => {
    return (
        <div>
            <a href={path} target={blank ? "_blank" : "self"} style={{"fontSize": size}}>
                {children}
            </a>
        </div>
    )
}

ALink.propTypes = {
    path:propTypes.string,
    children:propTypes.string.isRequired,
    blank:propTypes.bool,
    size:propTypes.number,
}


// ALink.defaultProps = {
//     path:"/#",
//     blank: true,
//     size: 10,
// }

export default ALink


