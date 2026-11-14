/**
 * GitHub OAuth「授权码换 access_token」的后端代理端点参考实现。
 *
 * 背景（官方文档 https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps ）：
 * GitHub 只支持授权码流，token 交换必须携带 client_secret，因此不能放在前端。
 * 前端（src/lib/github.ts）会把 { code, redirect_uri } POST 到本端点，
 * 本端点带着服务端保管的 client_id/client_secret 去 GitHub 换 token 并回传。
 *
 * 运行（仅演示，生产请并入站点真实后端并加会话/限流等防护）：
 *   $env:GITHUB_CLIENT_ID='xxx'; $env:GITHUB_CLIENT_SECRET='xxx'; node scripts/github-token-exchange.example.mjs
 * 然后前端 .env 配置：
 *   VITE_GITHUB_EXCHANGE_URL=http://localhost:8787/api/auth/github/token
 *
 * 安全要点：
 *  - client_secret 只存在于服务端环境变量，绝不下发前端；
 *  - 生产环境建议：换到 token 后在服务端直接建会话（Set-Cookie），
 *    不把 access_token 回传浏览器；回传 token 仅供本地演示；
 *  - 建议校验 Origin 白名单，防止任意站点借用本端点。
 */
import { createServer } from 'node:http'

const CLIENT_ID = process.env.GITHUB_CLIENT_ID ?? ''
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET ?? ''
const PORT = Number(process.env.PORT ?? 8787)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? 'https://www.puhuisoft.com')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const server = createServer(async (req, res) => {
  const origin = req.headers.origin ?? ''
  const cors = ALLOWED_ORIGINS.includes(origin) ? origin : ''
  res.setHeader('Access-Control-Allow-Origin', cors)
  res.setHeader('Vary', 'Origin')

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method !== 'POST' || new URL(req.url, 'http://localhost').pathname !== '/api/auth/github/token') {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'not_found' }))
    return
  }

  let body = ''
  for await (const chunk of req) body += chunk

  try {
    const { code, redirect_uri: redirectUri } = JSON.parse(body)
    if (!code) throw new Error('missing code')

    // 官方 token 端点：POST + JSON 应答（Accept: application/json）
    const ghRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    })
    const data = await ghRes.json()

    if (!data.access_token) {
      // GitHub 返回 { error, error_description }（如 code 已被使用 / 过期）
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: data.error ?? 'exchange_failed' }))
      return
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ access_token: data.access_token }))
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: String(error?.message ?? error) }))
  }
})

server.listen(PORT, () => {
  console.log(`GitHub token-exchange proxy listening on http://localhost:${PORT}/api/auth/github/token`)
})
