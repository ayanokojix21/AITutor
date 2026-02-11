# 🎓 Eduverse: Complete Implementation Plan

A production-grade **Multimodal RAG system** that connects Google Classroom with citation-aware retrieval.

## Project Overview

Eduverse ingests educational materials (PDFs, videos, audio) from Google Classroom, processes them through AI models (Vision LLM for images, Whisper for audio), and stores unified semantic embeddings in a vector database. Users can query their materials and receive citation-grounded answers.

---

## 💡 User Review Required

> **TIP: 100% FREE Architecture**  
> Each user provides their own Groq API key (free tier: 30 RPM, 14K TPD). No rate limiting needed - costs are distributed to users.

> **IMPORTANT: Required Setup**  
> - Google Cloud Console credentials (OAuth 2.0 for Classroom API - free)
> - Users provide their own Groq API key at runtime

> **NOTE: Storage (All Free Options)**  
> - **Vector DB**: Chroma (local, free)
> - **Database**: SQLite (dev) / Supabase free tier (prod)
> - **Files**: Local storage (dev) / Cloudflare R2 free tier (10GB)

---

## 📁 Complete Directory Structure
```
c:\Users\HP\et-genai\eduverse\
├── 📁 backend/                          # FastAPI + LangChain Backend
│   ├── 📁 app/
│   │   ├── __init__.py
│   │   ├── main.py                      # FastAPI app entry point
│   │   ├── config.py                    # Environment & settings
│   │   │
│   │   ├── 📁 api/                      # REST API Routes
│   │   │   ├── __init__.py
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py              # OAuth & JWT endpoints
│   │   │   │   ├── classroom.py         # Google Classroom sync
│   │   │   │   ├── indexing.py          # Document processing jobs
│   │   │   │   ├── chat.py              # RAG query endpoints
│   │   │   │   └── files.py             # File management
│   │   │   └── deps.py                  # Route dependencies
│   │   │
│   │   ├── 📁 core/                     # Core Utilities
│   │   │   ├── __init__.py
│   │   │   ├── security.py              # JWT, encryption (Fernet)
│   │   │   ├── database.py              # PostgreSQL connection
│   │   │   ├── redis_client.py          # Redis queue client
│   │   │   └── exceptions.py            # Custom exceptions
│   │   │
│   │   ├── 📁 services/                 # Business Logic
│   │   │   ├── __init__.py
│   │   │   ├── google_auth.py           # Google OAuth service
│   │   │   ├── classroom_service.py     # Classroom API wrapper
│   │   │   └── file_service.py          # S3/R2 file operations
│   │   │
│   │   ├── 📁 processing/               # Multimodal Processing
│   │   │   ├── __init__.py
│   │   │   ├── pdf_processor.py         # PDF + Vision extraction
│   │   │   ├── video_processor.py       # Video frames + Whisper
│   │   │   ├── audio_processor.py       # Audio transcription
│   │   │   ├── image_processor.py       # Standalone image analysis
│   │   │   ├── text_cleaner.py          # Text normalization
│   │   │   └── semantic_merger.py       # Modality merging
│   │   │
│   │   ├── 📁 workflows/                # LangGraph State Machines
│   │   │   ├── __init__.py
│   │   │   ├── indexing_workflow.py     # Main content pipeline
│   │   │   ├── states.py                # TypedDict state definitions
│   │   │   └── nodes.py                 # Workflow node implementations
│   │   │
│   │   ├── 📁 rag/                      # RAG Components
│   │   │   ├── __init__.py
│   │   │   ├── vector_store.py          # Chroma/Pinecone abstraction
│   │   │   ├── retriever.py             # Multi-query + Reranking
│   │   │   ├── chains.py                # ConversationalRetrievalChain
│   │   │   ├── prompts.py               # Citation-aware prompts
│   │   │   ├── memory.py                # Conversation memory
│   │   │   └── citations.py             # Citation extraction
│   │   │
│   │   ├── 📁 models/                   # Pydantic & DB Models
│   │   │   ├── __init__.py
│   │   │   ├── schemas.py               # API request/response schemas
│   │   │   ├── database.py              # SQLAlchemy ORM models
│   │   │   └── documents.py             # LangChain Document models
│   │   │
│   │   └── 📁 db/                       # Database
│   │       ├── __init__.py
│   │       ├── migrations/              # Alembic migrations
│   │       │   └── versions/
│   │       └── init_db.py               # Database initialization
│   │
│   ├── tests/                           # Backend Tests
│   │   ├── __init__.py
│   │   ├── conftest.py                  # Pytest fixtures
│   │   ├── test_auth.py
│   │   ├── test_processing.py
│   │   ├── test_rag.py
│   │   └── test_workflows.py
│   │
│   ├── requirements.txt                 # Python dependencies
│   ├── requirements-dev.txt             # Dev dependencies
│   ├── Dockerfile                       # Backend container
│   ├── docker-compose.yml               # Full stack compose
│   ├── alembic.ini                      # DB migration config
│   └── .env.example                     # Environment template
│
├── 📁 frontend/                         # Next.js 14 Frontend
│   ├── 📁 app/                          # App Router
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Landing page
│   │   ├── globals.css                  # Global styles
│   │   │
│   │   ├── 📁 (auth)/                   # Auth routes group
│   │   │   ├── login/page.tsx
│   │   │   └── callback/page.tsx
│   │   │
│   │   ├── 📁 dashboard/                # Main app
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                 # Courses overview
│   │   │   │
│   │   │   ├── 📁 courses/
│   │   │   │   ├── page.tsx             # Course list
│   │   │   │   └── [courseId]/
│   │   │   │       ├── page.tsx         # Course detail
│   │   │   │       └── files/page.tsx   # Course files
│   │   │   │
│   │   │   ├── 📁 chat/
│   │   │   │   └── page.tsx             # Chat interface
│   │   │   │
│   │   │   └── 📁 settings/
│   │   │       └── page.tsx             # User settings
│   │   │
│   │   └── 📁 api/                      # Next.js API routes
│   │       └── auth/[...nextauth]/
│   │           └── route.ts             # NextAuth handler
│   │
│   ├── 📁 components/                   # React Components
│   │   ├── 📁 ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── 📁 chat/                     # Chat components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── Citation.tsx
│   │   │   └── SourceCard.tsx
│   │   │
│   │   ├── 📁 courses/                  # Course components
│   │   │   ├── CourseCard.tsx
│   │   │   ├── CourseList.tsx
│   │   │   ├── FileList.tsx
│   │   │   └── SyncButton.tsx
│   │   │
│   │   ├── 📁 viewers/                  # Content viewers
│   │   │   ├── PdfViewer.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   └── AudioPlayer.tsx
│   │   │
│   │   └── 📁 layout/                   # Layout components
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   │
│   ├── 📁 lib/                          # Utilities
│   │   ├── api.ts                       # API client
│   │   ├── auth.ts                      # Auth utilities
│   │   └── utils.ts                     # General utilities
│   │
│   ├── 📁 hooks/                        # Custom hooks
│   │   ├── useChat.ts
│   │   ├── useCourses.ts
│   │   └── useProcessing.ts
│   │
│   ├── 📁 stores/                       # Zustand stores
│   │   ├── chatStore.ts
│   │   └── userStore.ts
│   │
│   ├── 📁 types/                        # TypeScript types
│   │   └── index.ts
│   │
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── .env.local.example
│
├── 📁 docs/                             # Documentation
│   ├── api-reference.md                 # API documentation
│   ├── deployment.md                    # Deployment guide
│   └── architecture.md                  # System architecture
│
├── 📁 scripts/                          # Utility scripts
│   ├── setup.sh                         # Initial setup
│   ├── seed_data.py                     # Test data seeding
│   └── migrate.py                       # DB migration runner
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml               # Backend CI/CD
│       └── frontend-ci.yml              # Frontend CI/CD
│
├── .gitignore
├── README.md
└── EDUVERSE_COMPLETE_ARCHITECTURE.md    # Original architecture doc
```

---

## 🔄 Proposed Changes

Implementation is organized into **8 weekly phases** aligned with the architecture roadmap.

### **Phase 1: Core Infrastructure Setup (Week 1)**

#### [NEW] `main.py`
- FastAPI application with CORS, middleware, router mounting
- Health check and root endpoints
- LangServe integration for chain serving

#### [NEW] `config.py`
- Pydantic Settings for environment variables
- All API keys, database URLs, feature flags

#### [NEW] `security.py`
- JWT token creation/verification
- Fernet encryption for refresh tokens
- Password hashing utilities

#### [NEW] `database.py`
- Async SQLAlchemy engine
- Session management
- Connection pooling

---

### **Phase 2: Authentication System (Week 2)**

#### [NEW] `auth.py`
- `POST /auth/google` - Exchange OAuth code for tokens
- `POST /auth/store-tokens` - Securely store refresh tokens
- `POST /auth/refresh` - Refresh backend JWT
- `GET /auth/me` - Get current user

#### [NEW] `google_auth.py`
- Google OAuth flow handling
- Token exchange with Google APIs
- Scopes: Classroom read, Drive read

#### [NEW] `route.ts`
- NextAuth.js configuration
- Google provider with Classroom scopes
- Callback handling and session management

---

### **Phase 3: Google Classroom Integration (Week 2-3)**

#### [NEW] `classroom_service.py`
- List user's courses
- List course materials and attachments
- Download files from Google Drive

#### [NEW] `classroom.py`
- `GET /classroom/courses` - List enrolled courses
- `GET /classroom/courses/{id}/materials` - Get course materials
- `POST /classroom/sync/{course_id}` - Sync course content

---

### **Phase 4: Multimodal Processing Pipeline (Week 3-4)**

#### [NEW] `pdf_processor.py`
- PyPDFLoader integration for text extraction
- Image extraction from PDF pages
- Groq Vision LLM for diagram/chart explanation
- Merge text + visual descriptions

#### [NEW] `video_processor.py`
- FFmpeg audio extraction
- Groq Whisper transcription with timestamps
- Key frame extraction (scene change detection)
- Groq Vision for frame analysis
- Timestamp-aligned merging

#### [NEW] `audio_processor.py`
- Standalone audio file handling
- Groq Whisper transcription
- Segment generation with timestamps

#### [NEW] `text_cleaner.py`
- Remove headers/footers artifacts
- Standardize bullets and formatting
- Convert tables to prose
- Fix broken hyphenation
- Normalize whitespace

#### [NEW] `semantic_merger.py`
- Merge audio + visual content by timestamp
- Create unified semantic documents
- Apply fixed metadata schema

---

### **Phase 5: LangGraph Indexing Workflow (Week 4)**

#### [NEW] `states.py`
- IndexingState TypedDict definition
- Fields: file_id, user_id, file_type, status, progress, documents, chunks, error

#### [NEW] `nodes.py`
- `download_node` - Download from Google Drive
- `load_node` - Load with appropriate LangChain loader
- `enrich_node` - Groq Vision/Whisper processing
- `chunk_node` - RecursiveCharacterTextSplitter (500 tokens, 100 overlap)
- `embed_node` - Local BGE embeddings + Chroma vector store

#### [NEW] `indexing_workflow.py`
- StateGraph construction with all nodes
- Edge connections (linear flow)
- SQLite checkpointer for resumability
- Entry point and compilation

#### [NEW] `indexing.py`
- `POST /index/file` - Start indexing job
- `GET /index/status/{job_id}` - Check progress
- `DELETE /index/{file_id}` - Remove from vector store

---

### **Phase 6: RAG Query System (Week 5)**

#### [NEW] `vector_store.py`
- EduverseVectorStore class with Chroma
- HuggingFace local embeddings (BGE / Sentence-Transformers)
- User namespace isolation
- Add/delete/retrieve operations

#### [NEW] `retriever.py`
- Base retriever with MMR search
- MultiQueryRetriever for query expansion (uses Groq LLM)
- FlashrankRerank (free local reranker)
- Metadata filtering support

#### [NEW] `prompts.py`
- Citation-aware QA prompt template
- System instructions for grounded answers
- Context formatting helpers

#### [NEW] `memory.py`
- ConversationBufferMemory per session
- Redis-backed persistence
- Session management

#### [NEW] `chains.py`
- ConversationalRetrievalChain setup
- Memory integration
- Source document return

#### [NEW] `citations.py`
- Extract [1], [2] references from answers
- Map to source documents
- Format citation metadata

#### [NEW] `chat.py`
- `POST /chat/query` - Submit question, get answer + citations
- `GET /chat/history` - Get conversation history
- `DELETE /chat/session` - Clear session

---

### **Phase 7: Frontend Implementation (Week 6)**

#### [NEW] `ChatInterface.tsx`
- Full-height chat layout
- Message list + input
- Loading states
- TanStack Query mutation

#### [NEW] `Citation.tsx`
- Clickable citation links
- PDF page navigation
- Video seek functionality

#### [NEW] `PdfViewer.tsx`
- react-pdf integration
- Page navigation
- Deep linking to specific pages

#### [NEW] `VideoPlayer.tsx`
- Video.js player
- Timestamp seeking from citations
- Caption display

#### [NEW] `CourseList.tsx`
- Display synced courses
- Sync status indicators
- File counts

---

### **Phase 8: Production & DevOps (Week 7-8)**

#### [NEW] `Dockerfile`
- Python 3.11 slim base
- Dependency installation
- Uvicorn entrypoint

#### [NEW] `docker-compose.yml`
- Backend service
- PostgreSQL database
- Redis cache
- Chroma vector store (dev)

#### [NEW] `backend-ci.yml`
- Lint with ruff
- Run pytest
- Build Docker image
- Deploy to Railway

#### [NEW] `frontend-ci.yml`
- Lint with ESLint
- Type check
- Build production
- Deploy to Vercel

---

## ✅ Verification Plan

### **Local Development Testing**
```bash
# Backend
cd backend
pip install -r requirements.txt -r requirements-dev.txt
pytest tests/ -v --cov=app

# Frontend
cd frontend
npm install
npm run lint
npm run test
```

### **Integration Testing**

#### **Auth Flow Test**
1. Start backend: `uvicorn app.main:app --reload`
2. Start frontend: `npm run dev`
3. Navigate to http://localhost:3000
4. Click "Connect Google Classroom"
5. Verify OAuth flow completes
6. Check JWT stored in cookies

#### **Indexing Pipeline Test**
1. Sync a course with PDF materials
2. Check `/index/status/{job_id}` shows progress 0.2 → 0.4 → ... → 1.0
3. Verify documents appear in Chroma collection

#### **RAG Query Test**
1. Open chat interface
2. Ask: "Explain backpropagation"
3. Verify response includes [1], [2] citations
4. Click citation → PDF viewer opens at correct page

### **Manual Verification**

| Test Case | Steps | Expected Result |
|-----------|-------|-----------------|
| PDF Processing | Upload PDF with diagrams | Vision descriptions merged with text |
| Video Processing | Sync lecture video | Transcript + visual analysis available |
| Citation Accuracy | Ask factual question | All claims have valid links |
| Error Recovery | Kill backend during indexing | Resume from checkpoint after restart |

---

## 🔐 Environment Setup

Create `.env` file (server-side only):
```env
# LangChain (Optional - for tracing)
LANGCHAIN_TRACING_V2=false
LANGCHAIN_PROJECT=eduverse-dev

# No AI Service keys needed server-side!
# Users provide their own Groq API key at runtime

# Database (SQLite for dev, Supabase free tier for prod)
DATABASE_URL=sqlite:///./eduverse.db

# Google OAuth (free)
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# Security
JWT_SECRET=your-256-bit-secret
FERNET_KEY=your-fernet-key

# Embedding Model (runs locally)
EMBEDDING_MODEL=BAAI/bge-base-en-v1.5
```

---

## 🚀 Quick Start Commands
```bash
# 1. Clone and setup
git clone <repo-url>
cd eduverse

# 2. Backend setup
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm run dev

# 4. Open browser
# http://localhost:3000
```

---

## 📦 Key Dependencies

### **Backend (requirements.txt)**
```txt
# Core
fastapi>=0.109.0
uvicorn>=0.27.0
pydantic>=2.5.0

# LangChain (Groq only - FREE)
langchain>=0.1.0
langgraph>=0.0.30
langchain-groq>=0.0.1
langchain-chroma>=0.1.0
langchain-community>=0.0.20
langchain-huggingface>=0.0.1

# Local Embeddings (FREE)
sentence-transformers>=2.3.0
torch>=2.0.0

# Local Reranking (FREE)
flashrank>=0.2.0

# Document Processing
pypdf>=3.17.0
ffmpeg-python>=0.2.0
pymupdf>=1.23.0  # PDF image extraction

# Database (SQLite - FREE)
sqlalchemy>=2.0.0
alembic>=1.13.0
aiosqlite>=0.19.0

# Auth & Security
python-jose>=3.3.0
cryptography>=42.0.0
httpx>=0.26.0
```

### **Frontend (package.json)**
```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "next-auth": "^4.24.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0",
    "react-pdf": "^7.7.0",
    "video.js": "^8.10.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
```

---

## 🏗️ Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Groq-only LLM | Free tier (30 RPM), fast inference, user-provided keys |
| Local BGE embeddings | Free, high quality, runs on CPU |
| FlashRank reranking | Free local alternative to Cohere |
| User-provided API keys | Zero server costs, no rate limiting needed |
| SQLite + Chroma | Free local storage, easy deployment |
| Semantic-first embedding | Unified search across all modalities |
| LangGraph workflows | Checkpoint-based recovery for long jobs |
| Citation extraction | Trust through verifiable sources |

---

## 🤖 Free Embedding Model Alternatives

Choose based on your hardware and quality requirements:

| Model | Dimensions | Size | Quality | Speed | Best For |
|-------|------------|------|---------|-------|----------|
| **BAAI/bge-base-en-v1.5** ⭐ | 768 | 438MB | High | Fast | Default choice |
| BAAI/bge-small-en-v1.5 | 384 | 133MB | Good | Fastest | Low memory systems |
| BAAI/bge-large-en-v1.5 | 1024 | 1.3GB | Highest | Slower | Best accuracy |
| all-MiniLM-L6-v2 | 384 | 91MB | Good | Fastest | Minimal resources |
| BAAI/bge-m3 | 1024 | 2.3GB | Highest | Slow | Multilingual |

---

## 🧠 Groq LLM Models (All Free Tier)

| Model | Use Case | Speed |
|-------|----------|-------|
| llama-3.3-70b-versatile | Main RAG answers | 300 tok/s |
| llama-3.1-8b-instant | Query expansion | 750 tok/s |
| llava-v1.5-7b-4096-preview | Vision/diagram analysis | 330 tok/s |
| whisper-large-v3 | Audio transcription | Real-time |

---

## 📝 Next Steps After Approval

1. Create directory structure and base files
2. Implement Phase 1 (Core Infrastructure)
3. Iterate through phases with testing at each stage
4. Deploy to staging for user testing

**Ready to begin implementation upon your approval! 🚀**