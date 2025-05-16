# Disparo e-mail Frontend

Frontend do sistema de disparo de e-mail desenvolvido com **Vue 3**, **Vite**, **TailwindCSS**, **Pinia**, **TinyMCE** e **shadcn-vue**.

Este projeto se comunica com a API Laravel (backend) para realizar cadastro, listagem, e exportação de e-mails disparados, além de integração com fila de e-mail.

---

## 🚀 Tecnologias

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-vue](https://shadcn-vue.com/)
- [Pinia (store)](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vue The Mask](https://vue-the-mask.github.io/)
- [Axios](https://axios-http.com/)
- [TinyMCE](https://www.tiny.cloud/)

---

## ⚙️ Instalação

```bash
git clone https://github.com/kevenclayton/disparo-email-frontend.git
cd disparo-email-frontend

npm install
npm run dev
```

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` com:

```env
VITE_API_URL=http://localhost:8000/api
```

> A URL deve apontar para o backend Laravel.

---

## 🧩 Funcionalidades

- ✅ Cadastro de disparo com múltiplos destinatários
- ✅ Formatação usando TinyMCE
- ✅ Confirmação de envio
- ✅ Exportação para Excel via backend
- ✅ Toasts de feedback (sucesso e erro)
- ✅ Internacionalização (i18n: português e inglês)
- ✅ Layout responsivo e componentes reutilizáveis com shadcn

---

## 📁 Estrutura

```
src/
├─ components/
│  └─ ui/            # Componentes reutilizáveis com shadcn
├─ pages/            # Páginas como Disparos.vue
├─ stores/           # Pinia store (ex: useDisparoStore.ts)
├─ lib/              # axios, utils, etc
├─ assets/           # Estilos base (Tailwind)
```

---

## 📦 Build

Para gerar o build de produção:

```bash
npm run build
```
