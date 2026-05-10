# GOBLINIFY 👺

AI-powered human-to-goblin transformation. Upload your photo, get goblinified.

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- OpenAI gpt-image-2 API
- Sharp for image optimization

## Setup

```bash
npm install
cp .env.local.example .env.local
# Add your OpenAI API key to .env.local
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key with image generation access |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Contract address to display (optional) |

## Deploy

Deploy on Vercel, Railway, or any Node.js host. Make sure to set the environment variables.

---

**GOBLINIFY** — No goblins were harmed in the making of this app.
