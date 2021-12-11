import { Background } from 'components/background'
import { Section } from 'components/section'
import React, { useEffect, useState } from 'react'
import { TypeWriter } from '~/text-effect'

const demoText = [
  '剑指天下，秋收 [Offer]',
  '半夜奋笔疾码，云相伴，”乐“相随。',
  'git push --force # 🐶',
  'debugPrint("Hello World!")',
  'vivo mian() { }；',
  '0.2 + 0.1 // 0.30000000000000004',
  'ReferenceError: girlfriend is not defined',
]
export const App = () => {
  const [textArray, setTextArray] = useState(demoText)
  const [text, setText] = useState(textArray.join('\n'))
  useEffect(() => {
    const oldText = textArray.join('\n')
    if (oldText === text) {
      return
    }
    {
      const textArray = text.split('\n')
      setTextArray(textArray)
    }
  }, [text])
  return (
    <div className="max-w-[500px] m-auto py-[30px]">
      <Background />
      <h1 className="text-3xl font-medium text-center">
        <TypeWriter
          textArray={React.useMemo(() => ['React TypeWriter'], [])}
          repeat={false}
        />
      </h1>
      <div className="form-control">
        <label className="label">
          <span className="label-text">打字列表</span>
        </label>
        <textarea
          className="textarea h-24 textarea-bordered"
          value={text}
          rows={10}
          onChange={(e) => {
            setText(e.target.value)
          }}
        ></textarea>
      </div>
      <article className="prose prose-base prose-code:text-[16px] prose-h2:text-[16px] pb-[30px]">
        <Section
          description={'常规使用'}
          code={`<TypeWriter textArray={textArray} />`}
          textArray={textArray}
        ></Section>
        <Section
          description={'暂停时长 3 秒'}
          code={`<TypeWriter textArray={textArray} pauseTime={3000} />`}
          textArray={textArray}
        ></Section>

        <Section
          description={'打字间隔 1 秒'}
          code={`<TypeWriter textArray={textArray} textSpeed={1000} />`}
          textArray={textArray}
        ></Section>

        <Section
          description={'自定义标签'}
          code={`<TypeWriter textArray={textArray} tag="code" />`}
          textArray={textArray}
        ></Section>

        <Section
          description={'不重复, 停留在最后一句话'}
          code={`<TypeWriter textArray={textArray} repeat={false} />`}
          textArray={textArray}
        ></Section>
        <Section
          description={'自定义光标'}
          code={`<TypeWriter textArray={textArray} suffix="_" />`}
          textArray={textArray}
        ></Section>
      </article>
      <footer className="text-gray-800 text-opacity-50 text-sm text-center">
        2021 &copy; React TypeWriter. Innei
      </footer>
    </div>
  )
}
