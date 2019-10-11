import React, { Children, cloneElement, isValidElement } from 'react'
import classNames from 'classnames'

const getClasses = ({ props, child }) => {
  let childClassName

  if (child && child.props && child.props.className) {
    childClassName = child.props.className
  }

  return classNames(props.className, childClassName)
}

const Primitive = props => {
  props = { ...props }

  return Children.map(props.children, child => {
    // If each child of this component is a valid React component, we can
    // clone and add the correct className to give the correct styles.
    if (isValidElement(child)) {
      return cloneElement(child, {
        className: getClasses({ props, child })
      })
      // If you have some condition inside the component it will set `props` to
      // the value `true`/`false` and props.children is going to return null in
      // that case.
    } else if (child == null) {
      return null
    }
    // If it is just a text node, we wrap the child in a <div> element so we
    // can apply styling to it.
    return <div className={getClasses({ props, child })}>{child}</div>
  })
}

export default Primitive
