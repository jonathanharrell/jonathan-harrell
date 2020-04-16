import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { AnimatePresence, motion } from 'framer-motion'
import Tippy from '@tippyjs/react'
import { Menu, X } from 'react-feather'
import Spaced from '../../jh-ui/Spaced'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Padded from '../../jh-ui/Padded'
import {
  CloseButton,
  Item,
  ItemContent,
  ItemHeading,
  ItemLink,
  ItemsWrap,
  TOCButton,
  TOCHeader,
  TOCWrap
} from './styles'

const TableOfContents = ({ items }) => {
  const [visible, setVisible] = useState(false)
  const toggleButtonRef = useRef()
  const itemsRef = useRef()
  const closeButtonRef = useRef()

  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const toggle = () => (visible ? hide() : show())

  const handleKeydown = event => {
    if (!visible) return

    const links = itemsRef.current.querySelectorAll('a')
    const lastTabbableElement = links[links.length - 1]

    // if tabbing from last link, force close button to get focus
    if (event.key === 'Tab' && !event.shiftKey) {
      if (lastTabbableElement === event.target) {
        event.preventDefault()
        closeButtonRef.current.focus()
      }
    }

    // if tabbing backwards from close button, force last link to get focus
    if (event.key === 'Tab' && event.shiftKey) {
      if (event.target === closeButtonRef.current) {
        event.preventDefault()
        lastTabbableElement.focus()
      }
    }

    // close menu on escape
    if (event.key === 'Escape') {
      hide()
    }
  }

  const handleLinkClick = event => {
    event.preventDefault()
    navigate(event.target.href)
    hide()
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={handleKeydown}>
      <Tippy
        placement="bottom-start"
        visible={visible}
        onClickOutside={hide}
        appendTo={() => document.body}
        interactive={true}
        onShow={() => setTimeout(() => closeButtonRef.current.focus(), 0)}
        onHide={() => toggleButtonRef.current.focus()}
        render={() => (
          <AnimatePresence>
            {visible && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
              >
                <TOCWrap hoverable={false}>
                  <Spaced bottom="m">
                    <Padded bottom="m">
                      <TOCHeader>
                        <Heading level={3} element="h2">
                          Table of Contents
                        </Heading>
                        <CloseButton ref={closeButtonRef} onClick={hide}>
                          <ScreenReaderText>
                            Close Table of Contents
                          </ScreenReaderText>
                          <X />
                        </CloseButton>
                      </TOCHeader>
                    </Padded>
                  </Spaced>
                  <div ref={itemsRef}>
                    <ItemsWrap>
                      {items.map((item, index) => (
                        <Item key={index}>
                          <ItemLink href={item.url} onClick={handleLinkClick}>
                            <ScreenReaderText>{item.title}</ScreenReaderText>
                          </ItemLink>
                          <Padded all="s">
                            <ItemContent>
                              <ItemHeading level={2} element="p">
                                {index + 1}
                              </ItemHeading>
                              <Text>{item.title}</Text>
                            </ItemContent>
                          </Padded>
                        </Item>
                      ))}
                    </ItemsWrap>
                  </div>
                </TOCWrap>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      >
        <TOCButton element="button" ref={toggleButtonRef} onClick={toggle}>
          <Spaced right="xs">
            <Menu size={16} />
          </Spaced>
          Table of Contents
        </TOCButton>
      </Tippy>
    </div>
  )
}

TableOfContents.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
}

export default TableOfContents
