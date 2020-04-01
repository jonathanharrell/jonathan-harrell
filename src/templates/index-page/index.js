import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Heading from '../../jh-ui/Heading'
import Spaced from '../../jh-ui/Spaced'
import Text from '../../jh-ui/Text'
import Link from '../../jh-ui/Link'
import SectionHeader from '../../jh-ui/SectionHeader'
import ScreenReaderText from '../../jh-ui/ScreenReaderText'
import Seo from '../../components/seo'
import Layout from '../../components/Layout'
import RecentArticles from '../../components/RecentArticles'
import Experiments from '../../components/Experiments'
import {
  Canvas,
  ExperimentsWrap,
  HeaderContentWrap,
  HeaderTextWrap,
  HeaderWrap,
  HomeContentWrap,
  RecentArticlesWrap
} from './styles'
import * as THREE from 'three-js/three'
import gsap, { Power1 } from 'gsap'
import { Noise } from 'noisejs'

const noise = new Noise(Math.random())

export const IndexPageTemplate = ({ title, description, experiments }) => {
  useEffect(() => {
    var canvas = document.querySelector('canvas')
    var width = canvas.offsetWidth,
      height = canvas.offsetHeight

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)

    var scene = new THREE.Scene()

    var camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000)
    camera.position.set(0, 0, 350)

    var sphere = new THREE.Group()
    scene.add(sphere)

    var X_AXIS = new THREE.Vector3(1, 0, 0)
    sphere.rotateOnAxis(X_AXIS, 80)

    const computedStyles = window.getComputedStyle(document.documentElement)

    var material = new THREE.LineBasicMaterial({
      color: computedStyles.getPropertyValue('--accent')
    })
    var linesAmount = 18
    var radius = 100
    var verticesAmount = 50
    for (var j = 0; j < linesAmount; j++) {
      var index = j
      var geometry = new THREE.Geometry()
      geometry.y = (index / linesAmount) * radius * 2
      for (var i = 0; i <= verticesAmount; i++) {
        var vector = new THREE.Vector3()
        vector.x = Math.cos(i / verticesAmount * Math.PI * 2)
        vector.z = Math.sin(i / verticesAmount * Math.PI * 2)
        vector._o = vector.clone()
        geometry.vertices.push(vector)
      }
      var line = new THREE.Line(geometry, material)
      sphere.add(line)
    }

    function updateVertices(a) {
      for (var j = 0; j < sphere.children.length; j++) {
        var line = sphere.children[j]
        line.geometry.y += 0.15
        if (line.geometry.y > radius * 2) {
          line.geometry.y = 0
        }
        var radiusHeight = Math.sqrt(line.geometry.y * (2 * radius - line.geometry.y))
        for (var i = 0; i <= verticesAmount; i++) {
          var vector = line.geometry.vertices[i]
          var ratio = noise.simplex3(vector.x * 0.009, vector.z * 0.009 + a * 0.0006, line.geometry.y * 0.009) * 15
          vector.copy(vector._o)
          vector.multiplyScalar(radiusHeight + ratio)
          vector.y = line.geometry.y - radius
        }
        line.geometry.verticesNeedUpdate = true
      }
    }

    function render(a) {
      requestAnimationFrame(render)
      updateVertices(a)
      renderer.render(scene, camera)
    }

    function onResize() {
      canvas.style.width = ''
      canvas.style.height = ''
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    var mouse = new THREE.Vector2(0.8, 0.5)

    const initialXRotation = sphere.rotation.x
    const initialYRotation = sphere.rotation.y

    function onMouseMove(e) {
      mouse.x = (e.clientX / window.innerWidth) - 0.5
      mouse.y = (e.clientY / window.innerHeight) - 0.5

      gsap.to(sphere.rotation, 2, {
        x: initialXRotation + (mouse.y * 1),
        z: initialYRotation + (mouse.x * 1),
        ease: Power1.easeOut
      })
    }

    requestAnimationFrame(render)
    window.addEventListener('mousemove', onMouseMove)
    var resizeTm

    window.addEventListener('resize', function() {
      resizeTm = clearTimeout(resizeTm)
      resizeTm = setTimeout(onResize, 200)
    })
  }, [])

  return (
    <>
      <Seo/>
      <HeaderWrap aria-labelledby="introduction-label">
        <HomeContentWrap>
          <HeaderContentWrap>
            <Canvas/>
            <HeaderTextWrap>
              <Heading level={1} id="introduction-label">
                {title}
              </Heading>
              <Spaced top="m">
                <Text>
                  {description}
                </Text>
              </Spaced>
            </HeaderTextWrap>
          </HeaderContentWrap>
        </HomeContentWrap>
      </HeaderWrap>
      <RecentArticlesWrap aria-labelledby="recent-articles-label">
        <HomeContentWrap>
          <SectionHeader>
            <Heading level={2} id="recent-articles-label">
              Recent Articles
            </Heading>
            <Link
              to="/blog"
              arrow={true}
              aria-labelledby="view-all-articles-label"
            >
            <span aria-hidden>
              View all
            </span>
              <ScreenReaderText id="view-all-articles-label">
                View all articles
              </ScreenReaderText>
            </Link>
          </SectionHeader>
          <RecentArticles/>
        </HomeContentWrap>
      </RecentArticlesWrap>
      <ExperimentsWrap aria-labelledby="recent-experiments-label">
        <HomeContentWrap>
          <SectionHeader>
            <Heading level={2} color="textInverse" id="recent-experiments-label">
              Recent Experiments
            </Heading>
            <Link
              href="https://codepen.io/jonathanharrell/"
              target="_blank"
              rel="noopener noreferrer"
              arrow={true}
              aria-labelledby="view-all-experiments-label"
            >
            <span aria-hidden>
              View all
            </span>
              <ScreenReaderText id="view-all-experiments-label">
                View all experiments
              </ScreenReaderText>
            </Link>
          </SectionHeader>
          <Experiments experiments={experiments}/>
        </HomeContentWrap>
      </ExperimentsWrap>
    </>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  experiments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })).isRequired
}

const IndexPage = ({ data: { mdx: { frontmatter } } }) => (
  <Layout>
    <IndexPageTemplate
      title={frontmatter.title}
      description={frontmatter.description}
      experiments={frontmatter.experiments}
    />
  </Layout>
)

IndexPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        experiments: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired
        })).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    mdx(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        title
        description
        experiments {
          id
          title
          date
        }
      }
    }
  }
`
