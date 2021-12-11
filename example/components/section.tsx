import { parser, transformer } from '@saber2pr/jsx-ast-parser'
import React from 'react'
import { TypeWriter } from '~/text-effect'

export const Section: React.FC<{
  textArray: string[]
  code: string
  description: string
}> = (props) => {
  const { textArray, code } = props
  const ast = parser.parse(code)

  const jsx: any = transformer.transform(ast)
  const propsFromJSX = jsx.body[0].props

  return (
    <div className="">
      <h2>{props.description}</h2>
      <div className="mockup-window bg-base-300">
        <div className="flex justify-center px-4 py-16 bg-base-200">
          {React.createElement(TypeWriter, {
            ...propsFromJSX,
            textArray,
            repeat: propsFromJSX.repeat?.name
              ? propsFromJSX.repeat.name === 'false'
                ? false
                : true
              : undefined,
          })}
        </div>
      </div>
      <div className="pb-[30px]"></div>

      <div className="mockup-code">
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: encodeHTML(code),
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
