import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './App.css'

const helmets = [
  {
    id: '01',
    image: '/helmet-1.png',
    alt: 'Encrypted secure access helmet',
    titleLine1: 'SECURE ACCESS',
    titleLine2: 'ENCRYPTION',
    subtitle: 'For protected systems from "Secure Layers" defense pack',
    protocol: 'AES-256-GCM',
    latency: '0.4ms',
    stampLeft: '130',
    stampRight: '147',
    cardStart: '#3b1788',
    cardMid: '#5c29bb',
    cardEnd: '#4a1ca8',
    halo: 'rgba(238, 170, 255, 0.5)',
    accent: '#d69fff',
    stageGlowA: 'rgba(96, 53, 214, 0.36)',
    stageGlowB: 'rgba(41, 19, 108, 0.4)',
  },
  {
    id: '02',
    image: '/helmet-2.png',
    alt: 'Red firewall defense helmet',
    titleLine1: 'FIREWALL NODE',
    titleLine2: 'CRIMSON SHIELD HELMET',
    subtitle: 'Hardened red perimeter from the security-core archive',
    protocol: 'RSA-4096-OAEP',
    latency: '1.2ms',
    stampLeft: '203',
    stampRight: '200',
    cardStart: '#8a0e2a',
    cardMid: '#be1b45',
    cardEnd: '#7f0c2b',
    halo: 'rgba(255, 178, 129, 0.45)',
    accent: '#ffb88a',
    stageGlowA: 'rgba(184, 36, 84, 0.33)',
    stageGlowB: 'rgba(102, 16, 42, 0.45)',
  },
  {
    id: '03',
    image: '/helmet-3.png',
    alt: 'Blue secure identity helmet',
    titleLine1: 'ID CORE V03',
    titleLine2: 'AUTH MASK',
    subtitle: 'The 168th secured identity layer',
    protocol: 'ECC-256-ECDH',
    latency: '0.8ms',
    stampLeft: '130',
    stampRight: '162',
    cardStart: '#0635a4',
    cardMid: '#1a58db',
    cardEnd: '#0a2d84',
    halo: 'rgba(134, 188, 255, 0.44)',
    accent: '#8ebeff',
    stageGlowA: 'rgba(29, 98, 230, 0.3)',
    stageGlowB: 'rgba(12, 53, 146, 0.42)',
  },
  {
    id: '04',
    image: '/helmet-4.png',
    alt: 'Pink secure chrome mask',
    titleLine1: 'INFRA SECURE',
    titleLine2: 'CHROME DATA MASK',
    subtitle: 'Rose-metal shell with enforced privacy layer systems',
    protocol: 'CHACHA20-POLY1305',
    latency: '1.9ms',
    stampLeft: '071',
    stampRight: '113',
    cardStart: '#7f3277',
    cardMid: '#be4da2',
    cardEnd: '#8a3c7d',
    halo: 'rgba(255, 181, 216, 0.45)',
    accent: '#ffc2e4',
    stageGlowA: 'rgba(199, 75, 176, 0.31)',
    stageGlowB: 'rgba(110, 38, 96, 0.44)',
  },
  {
    id: '05',
    image: '/helmet-5.png',
    alt: 'Green layered security mask',
    titleLine1: 'GREEN NODE',
    titleLine2: 'DEFENSE MASK',
    subtitle: 'Built from 3 layered protection modules',
    protocol: 'X25519-AES-GCM',
    latency: '0.5ms',
    stampLeft: '220',
    stampRight: '181',
    cardStart: '#197745',
    cardMid: '#2eab5f',
    cardEnd: '#1d6843',
    halo: 'rgba(189, 255, 121, 0.45)',
    accent: '#d0ff91',
    stageGlowA: 'rgba(57, 180, 83, 0.33)',
    stageGlowB: 'rgba(27, 102, 54, 0.44)',
  },
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeHelmet = helmets[activeIndex]

  const stageRef = useRef(null)
  const cardRef = useRef(null)
  const holderRef = useRef(null)
  const parallaxRef = useRef(null)
  const menuRef = useRef(null)
  const dotsRef = useRef(null)
  const copyRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const helmetRef = useRef(null)
  const footerRef = useRef(null)
  const washRef = useRef(null)
  const directionRef = useRef(1)
  const timelineRef = useRef(null)
  const activeIndexRef = useRef(0)
  const queuedSwitchRef = useRef(0)
  const isTransitioningRef = useRef(true)
  const transitionPhaseRef = useRef('enter')
  const idleMaskTlRef = useRef(null)
  const idleRestartCallRef = useRef(null)
  const quickFnsRef = useRef(null)
  const dragSettersRef = useRef(null)
  const readyIndexSetRef = useRef(new Set())
  const enterRunRef = useRef(0)
  const dragStateRef = useRef({
    active: false,
    pointerId: null,
    queueOnly: false,
    queued: false,
    axisLocked: false,
    horizontalIntent: false,
    moved: false,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0,
  })
  const nextEnterRapidRef = useRef(false)

  useLayoutEffect(() => {
    const maskTargets = [helmetRef.current, parallaxRef.current, washRef.current].filter(Boolean)
    if (maskTargets.length > 0) {
      gsap.set(maskTargets, { transformOrigin: '50% 50%' })
    }

    if (
      helmetRef.current &&
      copyRef.current &&
      footerRef.current &&
      menuRef.current &&
      dotsRef.current &&
      cardRef.current &&
      washRef.current &&
      parallaxRef.current
    ) {
      quickFnsRef.current = {
        helmetX: gsap.quickTo(helmetRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        helmetRotate: gsap.quickTo(helmetRef.current, 'rotate', {
          duration: 0.14,
          ease: 'power2.out',
        }),
        helmetScale: gsap.quickTo(helmetRef.current, 'scale', {
          duration: 0.14,
          ease: 'power2.out',
        }),
        copyX: gsap.quickTo(copyRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        footerX: gsap.quickTo(footerRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        menuX: gsap.quickTo(menuRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        dotsX: gsap.quickTo(dotsRef.current, 'x', { duration: 0.14, ease: 'power2.out' }),
        cardRotate: gsap.quickTo(cardRef.current, 'rotate', { duration: 0.14, ease: 'power2.out' }),
        cardScale: gsap.quickTo(cardRef.current, 'scale', { duration: 0.14, ease: 'power2.out' }),
        washAlpha: gsap.quickTo(washRef.current, 'autoAlpha', {
          duration: 0.14,
          ease: 'power2.out',
        }),
        washScale: gsap.quickTo(washRef.current, 'scale', { duration: 0.14, ease: 'power2.out' }),
        parallaxX: gsap.quickTo(parallaxRef.current, 'x', { duration: 0.32, ease: 'power2.out' }),
        parallaxY: gsap.quickTo(parallaxRef.current, 'y', { duration: 0.32, ease: 'power2.out' }),
        parallaxRotate: gsap.quickTo(parallaxRef.current, 'rotate', {
          duration: 0.32,
          ease: 'power2.out',
        }),
      }

      dragSettersRef.current = {
        helmetX: gsap.quickSetter(helmetRef.current, 'x', 'px'),
        helmetRotate: gsap.quickSetter(helmetRef.current, 'rotate', 'deg'),
        helmetScale: gsap.quickSetter(helmetRef.current, 'scale'),
        copyX: gsap.quickSetter(copyRef.current, 'x', 'px'),
        footerX: gsap.quickSetter(footerRef.current, 'x', 'px'),
        menuX: gsap.quickSetter(menuRef.current, 'x', 'px'),
        dotsX: gsap.quickSetter(dotsRef.current, 'x', 'px'),
        cardRotate: gsap.quickSetter(cardRef.current, 'rotate', 'deg'),
        cardScale: gsap.quickSetter(cardRef.current, 'scale'),
        washAlpha: gsap.quickSetter(washRef.current, 'autoAlpha'),
        washScale: gsap.quickSetter(washRef.current, 'scale'),
      }
    }
  }, [])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const decodeImage = (image) => {
    if (typeof image.decode === 'function') {
      return image.decode().catch(() => { })
    }

    if (image.complete) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const onDone = () => {
        image.removeEventListener('load', onDone)
        image.removeEventListener('error', onDone)
        resolve()
      }
      image.addEventListener('load', onDone)
      image.addEventListener('error', onDone)
    })
  }

  useEffect(() => {
    const preload = helmets.map((helmet) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = helmet.image
      return image
    })
    preload.forEach((image, index) => {
      decodeImage(image).finally(() => {
        readyIndexSetRef.current.add(index)
      })
    })

    return () => {
      preload.forEach((image) => {
        image.src = ''
      })
    }
  }, [])

  useEffect(() => {
    return () => {
      enterRunRef.current += 1
      timelineRef.current?.kill()
      idleMaskTlRef.current?.kill()
      idleRestartCallRef.current?.kill()
      quickFnsRef.current = null
      dragSettersRef.current = null
    }
  }, [])

  const killMotionTweens = () => {
    const targets = [
      helmetRef.current,
      copyRef.current,
      titleLine1Ref.current,
      titleLine2Ref.current,
      subtitleRef.current,
      footerRef.current,
      menuRef.current,
      dotsRef.current,
      cardRef.current,
      washRef.current,
      parallaxRef.current,
    ].filter(Boolean)
    if (targets.length > 0) {
      gsap.killTweensOf(targets)
    }
  }

  const clearIdleRestart = () => {
    idleRestartCallRef.current?.kill()
    idleRestartCallRef.current = null
  }

  const ensureHelmetReady = (index) => {
    if (readyIndexSetRef.current.has(index)) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = helmets[index].image
      decodeImage(image).finally(() => {
        readyIndexSetRef.current.add(index)
        resolve()
      })
    })
  }

  const getSwipeMetrics = () => {
    const cardWidth = cardRef.current?.clientWidth ?? window.innerWidth ?? 1280
    return {
      lockDistance: Math.max(12, Math.min(cardWidth * 0.022, 24)),
      travelDistance: Math.max(130, Math.min(cardWidth * 0.26, 300)),
      switchDistance: Math.max(56, Math.min(cardWidth * 0.11, 130)),
      velocityThreshold: 0.5,
    }
  }

  const setBaseVisualState = () => {
    if (helmetRef.current) {
      gsap.set(helmetRef.current, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        autoAlpha: 1,
        force3D: false,
      })
    }

    const copyTargets = [copyRef.current, footerRef.current, menuRef.current, dotsRef.current].filter(
      Boolean,
    )
    if (copyTargets.length > 0) {
      gsap.set(copyTargets, { x: 0, y: 0, autoAlpha: 1, force3D: false })
    }
    if (footerRef.current) {
      gsap.set(footerRef.current, { filter: 'blur(0px)', force3D: false })
    }

    if (cardRef.current) {
      gsap.set(cardRef.current, { rotate: 0, scale: 1, force3D: false })
    }
    const titleTargets = [titleLine1Ref.current, titleLine2Ref.current].filter(Boolean)
    if (titleTargets.length > 0) {
      gsap.set(titleTargets, {
        y: 0,
        autoAlpha: 1,
        skewY: 0,
        filter: 'blur(0px)',
        force3D: false,
      })
    }
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        force3D: false,
      })
    }
    if (washRef.current) {
      gsap.set(washRef.current, { autoAlpha: 0, scale: 1 })
    }
    if (parallaxRef.current) {
      gsap.set(parallaxRef.current, { x: 0, y: 0, rotate: 0, force3D: false })
    }
  }

  const stopIdleMaskAnimation = (settle = true) => {
    clearIdleRestart()
    idleMaskTlRef.current?.kill()
    idleMaskTlRef.current = null

    if (!settle || !helmetRef.current) {
      return
    }

    gsap.to(helmetRef.current, {
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.28,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const startIdleMaskAnimation = (delay = 0.18) => {
    clearIdleRestart()

    if (!helmetRef.current || isTransitioningRef.current || dragStateRef.current.active) {
      return
    }

    idleRestartCallRef.current = gsap.delayedCall(delay, () => {
      if (!helmetRef.current || isTransitioningRef.current || dragStateRef.current.active) {
        return
      }

      idleMaskTlRef.current?.kill()
      idleMaskTlRef.current = gsap
        .timeline({
          repeat: -1,
          yoyo: true,
          defaults: { ease: 'sine.inOut' },
        })
        .to(
          helmetRef.current,
          {
            y: -7,
            rotate: 0.95,
            scale: 1.014,
            duration: 2.3,
          },
          0,
        )
        .to(
          washRef.current,
          {
            autoAlpha: 0.18,
            scale: 1.06,
            duration: 2.3,
          },
          0,
        )

      idleRestartCallRef.current = null
    })
  }

  const resetDragVisuals = (duration = 0.32, resumeIdle = false) => {
    gsap.to(helmetRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      duration,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to([copyRef.current, footerRef.current, menuRef.current, dotsRef.current], {
      x: 0,
      duration,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to(cardRef.current, {
      rotate: 0,
      scale: 1,
      duration,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to(washRef.current, {
      autoAlpha: 0,
      scale: 1,
      duration: duration * 0.9,
      ease: 'power3.out',
      overwrite: true,
    })
    gsap.to(parallaxRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration,
      ease: 'power3.out',
      overwrite: true,
    })

    if (resumeIdle) {
      startIdleMaskAnimation(Math.max(0.08, duration * 0.45))
    }
  }

  const processSwitchQueue = (seedOptions = {}) => {
    if (isTransitioningRef.current || queuedSwitchRef.current === 0) {
      return
    }

    const direction = queuedSwitchRef.current
    queuedSwitchRef.current = 0
    runExitTransition(direction, seedOptions)
  }

  const requestRapidAdvance = () => {
    const tl = timelineRef.current
    if (!tl) {
      return
    }

    const currentScale = typeof tl.timeScale === 'function' ? tl.timeScale() : 1
    if (transitionPhaseRef.current === 'enter') {
      if (tl.progress() < 0.68) {
        tl.progress(0.68, false)
      }
      if (tl.progress() > 0.9) {
        tl.progress(1, false)
        return
      }
      tl.timeScale(Math.max(currentScale, 2.1))
      return
    }

    if (tl.progress() > 0.82) {
      tl.progress(1, false)
      return
    }
    tl.timeScale(Math.max(currentScale, 2.2))
  }

  const playEnterAnimation = (direction, onDone) => {
    const rapidMode = queuedSwitchRef.current !== 0 || nextEnterRapidRef.current
    nextEnterRapidRef.current = false
    const cardInDuration = rapidMode ? 0.38 : 0.72
    const helmetInDuration = rapidMode ? 0.48 : 0.9
    const titleInDuration = rapidMode ? 0.34 : 0.62
    const metaInDuration = rapidMode ? 0.3 : 0.5

    transitionPhaseRef.current = 'enter'
    killMotionTweens()
    timelineRef.current?.kill()
    setBaseVisualState()

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', overwrite: 'auto', lazy: false, force3D: false },
      onComplete: () => {
        isTransitioningRef.current = false
        transitionPhaseRef.current = 'idle'
        startIdleMaskAnimation()
        onDone?.()
      },
    })

    tl.fromTo(
      cardRef.current,
      { rotate: direction * 0.4, scale: 0.987 },
      { rotate: 0, scale: 1, duration: cardInDuration, ease: 'sine.out' },
      0,
    )
      .fromTo(
        helmetRef.current,
        {
          autoAlpha: 0.001,
          x: direction * 230,
          y: 24,
          scale: 1,
          rotate: direction * 4,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: helmetInDuration,
          ease: 'expo.out',
        },
        rapidMode ? 0 : 0.01,
      )
      .fromTo(
        copyRef.current,
        { x: direction * 52 },
        { x: 0, duration: titleInDuration, ease: 'power3.out' },
        rapidMode ? 0.04 : 0.14,
      )
      .fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { autoAlpha: 0, y: 44, skewY: direction * 4.5, filter: 'blur(11px)' },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          skewY: 0,
          filter: 'blur(0px)',
          duration: titleInDuration,
          stagger: rapidMode ? 0.04 : 0.07,
          ease: 'expo.out',
        },
        rapidMode ? 0.08 : 0.16,
      )
      .fromTo(
        subtitleRef.current,
        { autoAlpha: 0, y: 24, filter: 'blur(9px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: metaInDuration,
          ease: 'power3.out',
        },
        rapidMode ? 0.14 : 0.28,
      )
      .fromTo(
        footerRef.current,
        { autoAlpha: 0, x: direction * 34, y: 8, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          duration: metaInDuration,
          ease: 'power3.out',
        },
        rapidMode ? 0.12 : 0.24,
      )
      .fromTo(
        [menuRef.current, dotsRef.current],
        { autoAlpha: 0, x: direction * 18 },
        { autoAlpha: 1, x: 0, duration: rapidMode ? 0.26 : 0.44, stagger: 0.05 },
        rapidMode ? 0.12 : 0.24,
      )
      .fromTo(
        washRef.current,
        { autoAlpha: 0, scale: 0.82 },
        {
          autoAlpha: rapidMode ? 0.28 : 0.38,
          scale: rapidMode ? 1.04 : 1.08,
          duration: rapidMode ? 0.24 : 0.46,
          ease: 'sine.out',
        },
        rapidMode ? 0 : 0.06,
      )
      .to(
        washRef.current,
        { autoAlpha: 0, duration: rapidMode ? 0.22 : 0.5, ease: 'sine.in' },
        rapidMode ? 0.14 : 0.3,
      )

    if (!rapidMode) {
      tl.to(
        helmetRef.current,
        {
          y: -6,
          scale: 1,
          duration: 0.22,
          ease: 'sine.out',
        },
        0.62,
      ).to(
        helmetRef.current,
        {
          y: 0,
          scale: 1,
          duration: 0.34,
          ease: 'sine.inOut',
        },
        0.84,
      )
    }

    timelineRef.current = tl
  }

  useLayoutEffect(() => {
    const runId = enterRunRef.current + 1
    enterRunRef.current = runId
    isTransitioningRef.current = true
    transitionPhaseRef.current = 'enter-prep'
    stopIdleMaskAnimation(false)
    killMotionTweens()
    timelineRef.current?.kill()

    let cancelled = false
    ensureHelmetReady(activeIndex).finally(() => {
      if (cancelled || enterRunRef.current !== runId) {
        return
      }

      requestAnimationFrame(() => {
        if (cancelled || enterRunRef.current !== runId) {
          return
        }
        playEnterAnimation(directionRef.current, () => {
          processSwitchQueue({ rapid: true })
        })
      })
    })

    return () => {
      cancelled = true
    }
  }, [activeIndex])

  const runExitTransition = (direction, options = {}) => {
    const { fromDrag = false, dragDistance = 0, dragVelocity = 0, rapid = false } = options
    const nextIndex = (activeIndexRef.current + direction + helmets.length) % helmets.length
    const nextHelmet = helmets[nextIndex]
    const cardWidth = cardRef.current?.clientWidth ?? 1280
    const dragFactor = Math.min(Math.abs(dragDistance) / 260, 1)
    const velocityFactor = Math.min(Math.abs(dragVelocity) / 1.6, 1)
    const exitDuration = fromDrag
      ? 0.19 - velocityFactor * 0.09
      : rapid
        ? 0.18
        : 0.26
    const baseExit = Math.max(cardWidth * 0.4, fromDrag ? 240 : rapid ? 290 : 320)
    const exitDistance = baseExit + dragFactor * 90 + velocityFactor * 42

    killMotionTweens()
    stopIdleMaskAnimation(false)
    if (fromDrag || rapid) {
      nextEnterRapidRef.current = true
    }
    directionRef.current = direction
    isTransitioningRef.current = true
    transitionPhaseRef.current = 'exit'
    timelineRef.current?.kill()

    let switched = false
    const commitSwitch = () => {
      if (switched) {
        return
      }
      switched = true
      if (readyIndexSetRef.current.has(nextIndex)) {
        activeIndexRef.current = nextIndex
        setActiveIndex(nextIndex)
        return
      }

      ensureHelmetReady(nextIndex).then(() => {
        activeIndexRef.current = nextIndex
        setActiveIndex(nextIndex)
      })
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut', overwrite: 'auto', lazy: false, force3D: false },
      onComplete: commitSwitch,
    })

    tl.to(
      helmetRef.current,
      {
        autoAlpha: 0.001,
        x: -direction * exitDistance,
        y: -6,
        scale: 0.93,
        rotate: -direction * 2.2,
        duration: exitDuration,
        ease: 'power2.in',
      },
      0,
    )
      .to(
        [copyRef.current, footerRef.current],
        {
          autoAlpha: 0.44,
          x: -direction * 36,
          y: -2,
          duration: exitDuration * 0.88,
          stagger: 0.04,
          ease: 'sine.in',
        },
        0.03,
      )
      .to(
        [titleLine1Ref.current, titleLine2Ref.current],
        {
          autoAlpha: 0,
          y: -22,
          skewY: -direction * 4,
          filter: 'blur(9px)',
          duration: exitDuration * 0.72,
          stagger: 0.03,
          ease: 'power2.in',
        },
        0,
      )
      .to(
        subtitleRef.current,
        {
          autoAlpha: 0,
          y: -14,
          filter: 'blur(8px)',
          duration: exitDuration * 0.64,
          ease: 'power2.in',
        },
        0.01,
      )
      .to(
        [menuRef.current, dotsRef.current],
        {
          autoAlpha: 0.2,
          x: -direction * 11,
          duration: exitDuration * 0.84,
          ease: 'sine.in',
        },
        0,
      )
      .to(
        cardRef.current,
        {
          '--card-start': nextHelmet.cardStart,
          '--card-mid': nextHelmet.cardMid,
          '--card-end': nextHelmet.cardEnd,
          '--helmet-halo': nextHelmet.halo,
          '--helmet-accent': nextHelmet.accent,
          rotate: direction * 0.22,
          scale: 0.994,
          duration: exitDuration,
          ease: 'sine.inOut',
        },
        0,
      )
      .to(
        stageRef.current,
        {
          '--stage-glow-a': nextHelmet.stageGlowA,
          '--stage-glow-b': nextHelmet.stageGlowB,
          duration: exitDuration,
          ease: 'sine.inOut',
        },
        0,
      )
      .to(
        parallaxRef.current,
        {
          x: 0,
          y: 0,
          rotate: 0,
          duration: exitDuration * 0.82,
          ease: 'sine.inOut',
        },
        0,
      )
      .fromTo(
        washRef.current,
        { autoAlpha: 0, scale: 0.86 },
        {
          autoAlpha: 0.44,
          scale: 1.36,
          duration: exitDuration * 0.8,
          ease: 'sine.out',
        },
        0,
      )
      .to(
        washRef.current,
        { autoAlpha: 0, duration: exitDuration * 0.52, ease: 'sine.in' },
        exitDuration * 0.34,
      )

    timelineRef.current = tl
  }

  const switchHelmet = (direction, options = {}) => {
    const normalizedDirection = direction < 0 ? -1 : 1

    if (options.fromDrag) {
      queuedSwitchRef.current = normalizedDirection
      if (isTransitioningRef.current) {
        requestRapidAdvance()
        return
      }
      processSwitchQueue({
        fromDrag: true,
        dragDistance: options.dragDistance ?? 0,
        dragVelocity: options.dragVelocity ?? 0,
      })
      return
    }

    if (isTransitioningRef.current) {
      queuedSwitchRef.current = normalizedDirection
      requestRapidAdvance()
      return
    }

    queuedSwitchRef.current = normalizedDirection
    processSwitchQueue()
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target instanceof HTMLElement) {
        const tag = event.target.tagName
        if (
          event.target.isContentEditable ||
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT'
        ) {
          return
        }
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        switchHelmet(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        switchHelmet(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const dragState = dragStateRef.current
    dragState.active = true
    dragState.pointerId = event.pointerId
    dragState.axisLocked = false
    dragState.horizontalIntent = false
    dragState.moved = false
    dragState.startX = event.clientX
    dragState.startY = event.clientY
    dragState.deltaX = 0
    dragState.deltaY = 0
    dragState.lastX = event.clientX
    dragState.lastTime = event.timeStamp || performance.now()
    dragState.velocityX = 0
    dragState.queueOnly = isTransitioningRef.current
    dragState.queued = false

    holderRef.current?.setPointerCapture?.(event.pointerId)
    if (dragState.queueOnly) {
      gsap.set(holderRef.current, { cursor: 'grab' })
      return
    }

    stopIdleMaskAnimation(false)
    gsap.set(holderRef.current, { cursor: 'grabbing' })
    gsap.to(parallaxRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.18,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handlePointerMove = (event) => {
    const dragState = dragStateRef.current
    if (
      !dragState.active ||
      dragState.pointerId !== event.pointerId ||
      (isTransitioningRef.current && !dragState.queueOnly)
    ) {
      return
    }

    dragState.deltaX = event.clientX - dragState.startX
    dragState.deltaY = event.clientY - dragState.startY
    const swipeMetrics = getSwipeMetrics()
    const absX = Math.abs(dragState.deltaX)
    const absY = Math.abs(dragState.deltaY)

    if (!dragState.axisLocked) {
      if (absX < swipeMetrics.lockDistance && absY < swipeMetrics.lockDistance) {
        return
      }
      dragState.axisLocked = true
      dragState.horizontalIntent = absX > absY * 0.92
      if (!dragState.horizontalIntent) {
        return
      }
    }

    if (!dragState.horizontalIntent) {
      return
    }

    if (dragState.queueOnly) {
      const now = event.timeStamp || performance.now()
      const dt = Math.max(now - dragState.lastTime, 8)
      const instantVelocityX = (event.clientX - dragState.lastX) / dt
      dragState.velocityX = dragState.velocityX * 0.72 + instantVelocityX * 0.28
      dragState.lastX = event.clientX
      dragState.lastTime = now
      dragState.moved = true

      if (dragState.queued) {
        return
      }

      const distanceTriggered = absX > swipeMetrics.switchDistance * 0.72
      const velocityTriggered = Math.abs(dragState.velocityX) > swipeMetrics.velocityThreshold * 0.9
      if (distanceTriggered || velocityTriggered) {
        const intentX = absX > 6 ? dragState.deltaX : dragState.velocityX * 180
        dragState.queued = true
        switchHelmet(intentX < 0 ? 1 : -1, {
          fromDrag: true,
          dragDistance: dragState.deltaX,
          dragVelocity: dragState.velocityX,
        })
      }
      return
    }

    if (event.cancelable) {
      event.preventDefault()
    }

    const now = event.timeStamp || performance.now()
    const dt = Math.max(now - dragState.lastTime, 8)
    const instantVelocityX = (event.clientX - dragState.lastX) / dt
    dragState.velocityX = dragState.velocityX * 0.75 + instantVelocityX * 0.25
    dragState.lastX = event.clientX
    dragState.lastTime = now
    dragState.moved = true

    const dragX = dragState.deltaX
    const progress = gsap.utils.clamp(-1, 1, dragX / swipeMetrics.travelDistance)
    const intensity = Math.abs(progress)
    const setters = dragSettersRef.current
    if (setters) {
      setters.helmetX(progress * 122)
      setters.helmetRotate(progress * 4.2)
      setters.helmetScale(1 + intensity * 0.06)
      setters.copyX(progress * 54)
      setters.footerX(progress * 54)
      setters.menuX(progress * 32)
      setters.dotsX(progress * 32)
      setters.cardRotate(progress * 1.3)
      setters.cardScale(1 - intensity * 0.028)
      setters.washAlpha(Math.min(0.58, intensity * 0.6))
      setters.washScale(0.96 + intensity * 1.06)
      return
    }

    gsap.to(helmetRef.current, {
      x: dragX * 0.45,
      rotate: dragX * 0.016,
      scale: 1 + intensity * 0.045,
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to([copyRef.current, footerRef.current], {
      x: dragX * 0.16,
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to([menuRef.current, dotsRef.current], {
      x: dragX * 0.11,
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to(cardRef.current, {
      rotate: dragX * 0.008,
      scale: 1 - Math.min(Math.abs(dragX) / 1700, 0.018),
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to(washRef.current, {
      autoAlpha: intensity * 0.48,
      scale: 0.94 + intensity * 0.95,
      duration: 0.14,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handlePointerEnd = (event) => {
    const dragState = dragStateRef.current
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return
    }

    holderRef.current?.releasePointerCapture?.(event.pointerId)
    gsap.set(holderRef.current, { cursor: 'grab' })

    if (dragState.queueOnly) {
      dragState.active = false
      dragState.pointerId = null
      dragState.queueOnly = false
      return
    }

    dragState.active = false
    dragState.pointerId = null
    if (!dragState.moved || !dragState.horizontalIntent) {
      resetDragVisuals(0.22, true)
      return
    }

    const swipeMetrics = getSwipeMetrics()
    const absX = Math.abs(dragState.deltaX)
    const absY = Math.abs(dragState.deltaY)
    const absVelocityX = Math.abs(dragState.velocityX)
    const distanceTriggered = absX > swipeMetrics.switchDistance && absX > absY * 1.06
    const velocityTriggered =
      absVelocityX > swipeMetrics.velocityThreshold && absX > absY * 0.72
    const shouldSwitch = distanceTriggered || velocityTriggered

    if (shouldSwitch) {
      const intentX = absX > 6 ? dragState.deltaX : dragState.velocityX * 180
      switchHelmet(intentX < 0 ? 1 : -1, {
        fromDrag: true,
        dragDistance: dragState.deltaX,
        dragVelocity: dragState.velocityX,
      })
      return
    }

    resetDragVisuals(0.22, true)
  }

  const handleCardMouseMove = (event) => {
    if (isTransitioningRef.current || dragStateRef.current.active) {
      return
    }

    const cardBounds = cardRef.current?.getBoundingClientRect()
    if (!cardBounds) {
      return
    }

    const xRatio = (event.clientX - cardBounds.left) / cardBounds.width - 0.5
    const yRatio = (event.clientY - cardBounds.top) / cardBounds.height - 0.5
    const offsetX = xRatio * 30
    const offsetY = yRatio * 24
    const quick = quickFnsRef.current
    if (quick) {
      quick.parallaxX(offsetX)
      quick.parallaxY(offsetY)
      quick.parallaxRotate(xRatio * 2)
      return
    }

    gsap.to(parallaxRef.current, {
      x: offsetX,
      y: offsetY,
      rotate: xRatio * 2,
      duration: 0.36,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handleCardMouseLeave = () => {
    if (dragStateRef.current.active) {
      return
    }

    const quick = quickFnsRef.current
    if (quick) {
      quick.parallaxX(0)
      quick.parallaxY(0)
      quick.parallaxRotate(0)
      return
    }

    gsap.to(parallaxRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.44,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  return (
    <main
      ref={stageRef}
      className="hero-stage"
      style={{
        '--stage-glow-a': activeHelmet.stageGlowA,
        '--stage-glow-b': activeHelmet.stageGlowB,
      }}
    >
      <section
        ref={cardRef}
        className="hero-card"
        aria-label="Secure Node hero"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          '--card-start': activeHelmet.cardStart,
          '--card-mid': activeHelmet.cardMid,
          '--card-end': activeHelmet.cardEnd,
          '--helmet-halo': activeHelmet.halo,
          '--helmet-accent': activeHelmet.accent,
        }}
      >
        <header className="card-header">
          <span className="brand-mark">sec/CORE</span>
          <span className="share-label">Network Status</span>

          <div className="card-metrics">
            <span>
              Relays <em>{activeHelmet.stampLeft[0] || '3'}</em>
            </span>
            <strong>{activeHelmet.latency} Ping</strong>
          </div>

          <div className="card-lines" aria-hidden="true">
            <span />
            <span />
          </div>
        </header>

        <aside ref={menuRef} className="card-menu">
          <span>Firewall</span>
          <span className="active">Enclaves</span>
          <span>Audit Logs</span>
        </aside>

        <span className="card-stamp card-stamp-left">SEQ:{activeHelmet.stampLeft}</span>
        <span className="card-stamp card-stamp-right">PORT:{activeHelmet.stampRight}</span>

        <div ref={dotsRef} className="card-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <article ref={copyRef} className="card-copy">
          <h1>
            <span ref={titleLine1Ref}>{activeHelmet.titleLine1}</span>
            <span ref={titleLine2Ref}>{activeHelmet.titleLine2}</span>
          </h1>
          <p ref={subtitleRef}>{activeHelmet.subtitle}</p>
        </article>

        <figure
          ref={holderRef}
          className="helmet-holder"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={handlePointerEnd}
        >
          <div ref={parallaxRef} className="helmet-parallax">
            <img
              ref={helmetRef}
              src={activeHelmet.image}
              alt={activeHelmet.alt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable="false"
            />
          </div>
        </figure>

        <footer ref={footerRef} className="card-footer">
          <span>Security Protocol</span>
          <strong>{activeHelmet.protocol}</strong>
        </footer>

        <span className="plus plus-left" aria-hidden="true" />
        <span className="plus plus-right" aria-hidden="true" />
        <span ref={washRef} className="motion-wash" aria-hidden="true" />

        <nav className="card-controls" aria-label="Helmet navigation">
          <button
            type="button"
            className="nav-btn nav-btn-prev"
            onClick={() => switchHelmet(-1)}
            aria-label="Show previous helmet"
          >
            <span className="nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M14.4 5.2L8.2 12l6.2 6.8" />
              </svg>
            </span>
            <span className="nav-label">Prev</span>
          </button>
          <button
            type="button"
            className="nav-btn nav-btn-next"
            onClick={() => switchHelmet(1)}
            aria-label="Show next helmet"
          >
            <span className="nav-label">Next</span>
            <span className="nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M9.6 5.2L15.8 12 9.6 18.8" />
              </svg>
            </span>
          </button>
        </nav>
      </section>
    </main>
  )
}

export default App
