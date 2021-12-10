import React, { useEffect, useState } from 'react'
import { TextEffect } from '~'

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
    <div className="max-w-[500px] m-auto">
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
      <div className="pb-[100px]"></div>
      <div className="mockup-window bg-base-300">
        <div className="flex justify-center px-4 py-16 bg-base-200">
          <TextEffect textArray={textArray} />
        </div>
      </div>
      <div className="pb-[30px]"></div>

      <div className="mockup-code">
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: encodeHTML(`<TextEffect textArray={textArray} />`),
            }}
          ></code>
        </pre>
      </div>
    </div>
  )
}

const encodeHTML = function (str: string) {
  if (typeof str == 'string') {
    // @ts-ignore
    return str.replace(/<|&|>/g, function (matches) {
      return {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
      }[matches]
    })
  }

  return ''
}
