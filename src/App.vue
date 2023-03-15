<template>
  <div class="p-4">
    <div class="flex">
      <div class="mr-8">
        <div class="mb-2 text-right">
          <button
            class="p-2 rounded bg-blue-500 text-white"
            :disabled="isLoading"
            @click="handleSubmit"
          >
            送出
          </button>
        </div>
        <textarea
          v-model="text"
          name=""
          id=""
          cols="50"
          rows="30"
          class="border-2 rounded outline-blue-200 p-2"
        ></textarea>
      </div>
      <div class="grow w-0 p-4">
        <p class="mb-4">
          answer

          <span class="ml-3">問題 token： {{ token.completion }}</span>
          <span class="ml-3">答案 token： {{ token.prompt }}</span>
          <span class="ml-3">總 token： {{ token.total }}</span>
        </p>
        <div class="border rounded h-[90%] p-4">
          {{ answer }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import api from './axios'
const text = ref('')
const answer = ref('')
const isLoading = ref(false)
const token = ref({
  completion: 0,
  prompt: 0,
  total: 0
})

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const {
      data: {
        choices: [data],
        usage: { completion_tokens, prompt_tokens, total_tokens }
      }
    } = await api.post('', {
      prompt: text.value,
      max_tokens: 4000,
      temperature: 0,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.5,
      best_of: 1,
      stop: null
    })
    console.log(data)
    answer.value = data.text
    token.value = { completion: completion_tokens, prompt: prompt_tokens, total: total_tokens }
  } catch (error) {
    window.alert('api 錯誤，找 Marc')
  } finally {
    isLoading.value = false
  }
}
</script>
<style scoped></style>
