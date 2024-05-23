import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
  build: {
    rollupOptions: {
      external: ['/src/components/HomeCarousel' , '/src/components/MyFooter' , '/src/components/MyNavbar' , '/src/components/Product' , '/src/components/AcessoriosSearch' , '/src/components/Login', '/src/components/EquipamentosSearch']
    }
  }
}

