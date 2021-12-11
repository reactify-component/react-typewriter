import React, { memo, useCallback, useEffect } from 'react'
// @ts-ignore
import styles from './index.module.css'

interface TypeWriterProps {
  /**
   * 文字列表
   */
  textArray: string[]
  /**
   * 文字速度, 毫秒
   */
  textSpeed?: number
  /**
   * 后缀
   */
  suffix?: string | JSX.Element
  /**
   * 停顿时间
   */
  pauseTime?: number
  /**
   * 重复
   */
  repeat?: boolean
  /**
   * 暂停
   */
  pause?: boolean
  /**
   * 外层标签
   */
  tag?: keyof JSX.IntrinsicElements
}
export const TypeWriter: React.FC<
  TypeWriterProps & JSX.IntrinsicElements['span']
> = memo((props) => {
  const {
    pauseTime = 1000,
    suffix,
    textArray: _textArray,
    textSpeed = 100,
    repeat = true,
    tag = 'span',
    pause = false,
    ...rest
  } = props

  const textArray = React.useMemo(
    () => _textArray.filter((text) => text.length > 0),
    [_textArray],
  )

  const [currentText, setCurrentText] = React.useState('')
  const currentTextIndex = React.useRef(0)
  const timer = React.useRef<any>()
  const isAnimate = React.useRef(!pause)

  useEffect(() => {
    // reset state
    timer.current = clearTimeout(timer.current)
    currentTextIndex.current = 0
    isAnimate.current = !pause
    setCurrentText('')

    requestAnimationFrame(() => {
      animate()
    })
  }, [pause, textArray])

  useEffect(() => {
    if (pause) {
      timer.current = clearTimeout(timer.current)
    } else {
      if (isAnimate.current) {
        return
      }
      animate()
    }
  }, [pause])

  const clean = useCallback(() => {
    timer.current = clearTimeout(timer.current)
  }, [])

  const animate = useCallback(() => {
    setCurrentText((currentText) => {
      isAnimate.current = false
      // Transform to array to solve emoji split into two characters
      // @see: https://stackoverflow.com/questions/24531751/how-can-i-split-a-string-containing-emoji-into-an-array
      const currentTextArray = Array.from(currentText)
      const currentFullTextArray = Array.from(
        textArray[currentTextIndex.current],
      )
      let newText = ''

      if (currentFullTextArray.length === currentTextArray.length) {
        newText = ''
        if (repeat) {
          currentTextIndex.current =
            (currentTextIndex.current + 1) % textArray.length
        } else {
          const nextIndex = currentTextIndex.current + 1
          if (nextIndex < textArray.length) {
            currentTextIndex.current = nextIndex
          } else return currentFullTextArray.join('')
        }
        isAnimate.current = true
        clean()
        timer.current = setTimeout(animate, textSpeed)
      } else {
        newText = currentText + currentFullTextArray[currentTextArray.length]
        isAnimate.current = true
        clean()
        timer.current = setTimeout(
          animate,
          currentFullTextArray.length - 1 === currentTextArray.length
            ? pauseTime
            : textSpeed,
        )
      }

      return newText
    })
  }, [pauseTime, repeat, textArray, textSpeed])

  useEffect(() => {
    if (pause) {
      // 开局就暂停, 显示第一句
      setCurrentText(textArray[currentTextIndex.current])
      return
    }
    timer.current = setTimeout(animate, textSpeed)
    return clean
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, textSpeed])

  useEffect(() => {
    return clean
  }, [])
  return React.createElement(
    tag,
    {
      ...rest,
    },
    <>
      {currentText}

      <span className={`${styles['blink']} ${styles['cursor']}`}>
        {suffix ?? <div className={styles['vertical-bar']}></div>}
      </span>
    </>,
  )
})
