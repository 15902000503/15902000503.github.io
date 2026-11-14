<script lang="ts" setup>
import { onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
async function setGithub(user: Record<string, any>) {
  if (!user) return
  const meta = { ...user.user_metadata }
  console.log('登录成功，用户信息：', user.user_metadata)

  await auth.signInWithProfile({
    name: meta.user_name,
    email: meta.email,
    provider: 'github',
  })
}
onMounted(async () => {
  const fullHash = window.location.hash

  // 1. 判断是不是从 GitHub 登录回来的
  if (fullHash.includes('#access_token')) {
    // 2. 精准切割：只保留 #access_token 之前的路径
    const cleanHash = fullHash.split('#access_token')[0]
    const cleanUrl =
      window.location.origin + window.location.pathname + window.location.search + cleanHash

    const {
      data: { session },
    } = await supabase.auth.getSession()
    window.history.replaceState(null, '', cleanUrl)
    if (session) {
      console.log('登录成功，用户信息：', session)
      const user = session.user;
      setGithub(user);
    } else {
      const data = await supabase.auth.getUser();
      setGithub(data);
    }
  }
})
</script>

<template>
  <RouterView />
</template>
