# React TypeWriter

Live Demo: <https://innei.github.io/react-typewriter/>

## How to use



## Interface

```tsx
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
```