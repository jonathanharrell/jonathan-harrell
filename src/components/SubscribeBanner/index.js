import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'react-feather'
import Padded from '../../jh-ui/Padded'
import Button from '../../jh-ui/Button'
import Heading from '../../jh-ui/Heading'
import Text from '../../jh-ui/Text'
import Spaced from '../../jh-ui/Spaced'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Ul from '../../jh-ui/Ul'
import Alert from '../../jh-ui/Alert'
import ContentWrap from '../ContentWrap'
import { addAlert, shouldAnimate } from '../../helpers'
import {
  CloseButton,
  SubscribeBannerWrap,
  SubscribeCard,
  SubscribeCardContent,
  SubscribeContentWrap,
  SubscribeForm,
  SubscribeInput
} from './styles'

const SubscribeBanner = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [dismissed, setDismissed] = useState(true)
  const inputRef = useRef()

  useEffect(() => {
    const subscribeBannerDismissed = localStorage.getItem(
      'subscribe-banner-dismissed'
    )
    setDismissed(!!subscribeBannerDismissed)

    // when the showSubscribe event has been dispatched (for example, from clicking
    // the subscribe button in the header), show the subscribe section
    const handleShowSubscribe = () => {
      setDismissed(false)
    }

    window.addEventListener('showSubscribe', handleShowSubscribe)

    return () => {
      window.removeEventListener('showSubscribe', handleShowSubscribe)
    }
  }, [])

  const dismiss = event => {
    setDismissed(true)
    localStorage.setItem('subscribe-banner-dismissed', 'true')
    addAlert('Subscribe banner dismissed')
    event.target.blur()
  }

  const handleSubmit = async event => {
    setError(null)
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email
        })
      })

      const json = await response.json()

      // if there is an error response, throw an error so catch block is triggered
      if (!response.ok) {
        throw Error(json.detail)
      } else {
        setSuccess(true)
        addAlert("You've been subscribed!")
      }
    } catch (error) {
      setError(error.message)
      addAlert(`There was a problem subscribing: ${error.message}`)
    }
  }

  return (
    <AnimatePresence>
      {!dismissed ? (
        <motion.div
          initial={shouldAnimate() ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 50, mass: 0.1 }}
        >
          <SubscribeBannerWrap
            id="subscribe"
            aria-labelledby="newsletter-label"
          >
            <ContentWrap>
              <Padded vertical="3x">
                <SubscribeContentWrap>
                  <SubscribeCard padding={false} hoverable={false}>
                    <SubscribeCardContent>
                      <Padded vertical="2x" bottom="xxl" horizontal="2x">
                        <div>
                          <Heading
                            id="newsletter-label"
                            level={4}
                            element="h2"
                            color="textInverse"
                          >
                            Subscribe to the newsletter
                          </Heading>
                          <Spaced top="xs">
                            <Text color="textLighter">
                              Sign up for periodic updates, including:
                            </Text>
                          </Spaced>
                          <Spaced top="m">
                            <Ul color="textInverse">
                              <li>New front-end experiments</li>
                              <li>CSS layout tricks and new properties</li>
                              <li>Insight into new JavaScript APIs</li>
                            </Ul>
                          </Spaced>
                        </div>
                      </Padded>
                      <SubscribeForm onSubmit={handleSubmit}>
                        <CloseButton unstyled type="button" onClick={dismiss}>
                          <X />
                          <ScreenReaderText>
                            Dismiss newsletter subscription form
                          </ScreenReaderText>
                        </CloseButton>
                        <Padded top="4x" bottom="3x" horizontal="2x">
                          <div>
                            <div>
                              <label
                                htmlFor="email"
                                className="visually-hidden"
                              >
                                Enter your email address to subscribe to
                                newsletter
                              </label>
                              <SubscribeInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Your email address"
                                ref={inputRef}
                              />
                            </div>
                            <AnimatePresence>
                              {error && (
                                <motion.div
                                  initial={
                                    shouldAnimate()
                                      ? { opacity: 0, y: 50 }
                                      : false
                                  }
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 50 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 50,
                                    mass: 0.1,
                                    delay: 0.1
                                  }}
                                >
                                  <Spaced top="m">
                                    <Alert>{error}</Alert>
                                  </Spaced>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <AnimatePresence>
                              {success && (
                                <motion.div
                                  initial={
                                    shouldAnimate()
                                      ? { opacity: 0, y: 50 }
                                      : false
                                  }
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 50 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 50,
                                    mass: 0.1,
                                    delay: 0.1
                                  }}
                                >
                                  <Spaced top="m">
                                    <Alert order="info">
                                      You’ve been subscribed!
                                    </Alert>
                                  </Spaced>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <Spaced top="m">
                              <Button order="accent" size="large">
                                Subscribe
                              </Button>
                            </Spaced>
                          </div>
                        </Padded>
                      </SubscribeForm>
                    </SubscribeCardContent>
                  </SubscribeCard>
                </SubscribeContentWrap>
              </Padded>
            </ContentWrap>
          </SubscribeBannerWrap>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default SubscribeBanner
