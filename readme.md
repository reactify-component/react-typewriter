# React TypeWriter

Live Demo: <https://innei.github.io/react-typewriter/>

## How to use

```bash
npm i @innei/react-typewriter
```

```tsx
<TypeWriter textArray={[
  '剑指天下，秋收 [Offer]',
  '半夜奋笔疾码，云相伴，”乐“相随。',
  'git push --force # 🐶',
  'debugPrint("Hello World!")',
  'vivo mian() { }；',
  '0.2 + 0.1 // 0.30000000000000004',
  'ReferenceError: girlfriend is not defined',
]} />
```

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

## License

MIT