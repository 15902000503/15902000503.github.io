// 用 vue-i18n 同款消息编译器全量校验 locales，防止 @ / { } 等语法触发编译错误
import fs from 'node:fs'
import nodePath from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const vueI18nPath = require.resolve('vue-i18n')
const pkgPath = require.resolve('@intlify/message-compiler', {
  paths: [nodePath.dirname(vueI18nPath)],
})
const mod = require(pkgPath)
const baseCompile = mod.baseCompile ?? mod.default?.baseCompile
if (typeof baseCompile !== 'function') {
  console.error('export keys:', Object.keys(mod).slice(0, 20))
  process.exit(2)
}

const compile = (src) => {
  let err
  baseCompile(src, {
    onError: (e) => {
      err = e
    },
  })
  if (err) throw err
}
let total = 0
let fail = 0

for (const file of ['src/locales/en.json', 'src/locales/zh.json']) {
  const msgs = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const walk = (obj, path) => {
    for (const [k, v] of Object.entries(obj)) {
      const p = path ? `${path}.${k}` : k
      if (typeof v === 'string') {
        total++
        try {
          compile(v)
        } catch (e) {
          fail++
          console.log('FAIL', file, p, e.message)
        }
      } else if (v && typeof v === 'object') {
        walk(v, p)
      }
    }
  }
  walk(msgs, '')
}

console.log(`compiled ${total} messages, ${fail} failures`)
process.exit(fail === 0 ? 0 : 1)
