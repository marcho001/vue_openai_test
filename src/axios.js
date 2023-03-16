import axios from 'axios'

const api = axios.create({
  baseURL:
    'https://open-ai-product-dev-01.openai.azure.com/openai/deployments/text-davinci/completions?api-version=2022-12-01',
  headers: {
    'api-key': import.meta.env.VITE_OPEN_AI_KEY
  }
})

export default api
