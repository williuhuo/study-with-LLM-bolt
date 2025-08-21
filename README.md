# Study With LLM
这个项目主要是使用LLM辅助学习的项目。实现学习,复习,备考全链路服务

## Project Structure
```
study-with-llm/
├── backend/                          # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI application entry point
│   │   ├── config.py                 # Configuration settings
│   │   ├── database.py               # Database connection and setup
│   │   ├── dependencies.py           # FastAPI dependencies
│   │   ├── models/                   # SQLAlchemy models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── document.py
│   │   │   ├── knowledge_point.py
│   │   │   ├── flashcard.py
│   │   │   └── exercise.py
│   │   ├── schemas/                  # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── document.py
│   │   │   ├── knowledge_point.py
│   │   │   ├── flashcard.py
│   │   │   └── exercise.py
│   │   ├── api/                      # API routes
│   │   │   ├── __init__.py
│   │   │   ├── deps.py               # Route dependencies
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       ├── auth.py
│   │   │       ├── documents.py
│   │   │       ├── knowledge_points.py
│   │   │       ├── flashcards.py
│   │   │       ├── exercises.py
│   │   │       └── users.py
│   │   ├── services/                 # Business logic
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── document_service.py
│   │   │   ├── llm_service.py
│   │   │   ├── translation_service.py
│   │   │   └── flashcard_service.py
│   │   ├── utils/                    # Utility functions
│   │   │   ├── __init__.py
│   │   │   ├── security.py
│   │   │   ├── file_parser.py
│   │   │   └── helpers.py
│   │   └── tests/                    # Backend tests
│   │       ├── __init__.py
│   │       ├── conftest.py
│   │       ├── test_auth.py
│   │       ├── test_documents.py
│   │       └── test_services.py
│   ├── alembic/                      # Database migrations
│   │   ├── versions/
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── alembic.ini
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   ├── Dockerfile
│   ├── .env.example
│   └── pytest.ini
├── frontend/                         # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   ├── documents/
│   │   │   │   ├── DocumentUpload.jsx
│   │   │   │   ├── DocumentViewer.jsx
│   │   │   │   └── DocumentList.jsx
│   │   │   ├── flashcards/
│   │   │   │   ├── FlashcardViewer.jsx
│   │   │   │   ├── FlashcardEditor.jsx
│   │   │   │   └── FlashcardDeck.jsx
│   │   │   ├── knowledge/
│   │   │   │   ├── KnowledgeTree.jsx
│   │   │   │   ├── KnowledgePoint.jsx
│   │   │   │   └── KnowledgeExplainer.jsx
│   │   │   └── exercises/
│   │   │       ├── ExerciseViewer.jsx
│   │   │       ├── ExerciseSolver.jsx
│   │   │       └── ExerciseList.jsx
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Documents.jsx
│   │   │   ├── Flashcards.jsx
│   │   │   ├── Knowledge.jsx
│   │   │   ├── Exercises.jsx
│   │   │   └── Profile.jsx
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useApi.js
│   │   │   ├── useLocalStorage.js
│   │   │   └── useDebounce.js
│   │   ├── services/                 # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── documentService.js
│   │   │   ├── flashcardService.js
│   │   │   └── knowledgeService.js
│   │   ├── context/                  # React context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── AppContext.jsx
│   │   ├── utils/                    # Utility functions
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validators.js
│   │   ├── styles/                   # CSS/SCSS files
│   │   │   ├── globals.css
│   │   │   ├── components.css
│   │   │   └── variables.css
│   │   ├── tests/                    # Frontend tests
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── setupTests.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   ├── .env.example
│   └── .gitignore
├── docker-compose.yml                # Docker compose for development
├── docker-compose.prod.yml           # Docker compose for production
├── .gitignore
└── README.md
```

## 主要功能
### 文档解析
根据用户提供的PPT，PDF等资料。生成课程笔记,课程知识点,cheatsheet,记忆闪卡等资料
将资料中的示范解题思路,知识点等信息存储到用户数据中

### 文档翻译
将文档内容翻译为用户母语
- 尝试保留文档的格式/位置信息等内容
- 可作为划词追问的内容

### 知识点讲解
用户可选择一个知识点,LLM结合用户学习资料,后台知识库等数据生成适合用户的讲解

### 划词追问/讲解
用户可以在文档解析出的资料。以及AI的对话中。任意选取一段文字。作为想要追问的内容。并对AI进行追问。AI可以结合。上下文以及rag/联网搜索/知识库中的资料进行回答

### 习题讲解
根据用户提供的题目,结合用户数据使LLM生成匹配用户风格的个性化讲解

### 知识点复习
根据用户知识点的掌握情况,生成练习题,闪卡等内容帮助用户掌握,机翼知识点

### 闪卡生成
根据用户需求,按知识点/文件 生成anki格式的闪卡,以供背诵,闪卡内容为markdown格式
提供反转,填空,背单词,背解题思路等多种经过优化的格式

### 闪卡复习
提供反转闪卡背诵,记忆曲线智能复习等功能
提供反转,填空,背单词,背解题思路等多种经过优化的背诵体验

### 生成知识树
对单个知识点以树状形式进行延伸,列出其相关的前置/后置知识点
- 根据用户提供的资料进行针对化生成

### cheatsheet生成
根据用户数据中的知识点掌握情况,past exam等数据,针对性的生成cheatsheet,熟悉的知识点简化或者不涉及,不熟悉的详细写
- 提供特殊排版支持: 更多纸张格式,更小字体,字体重叠,更小行间距,更小页边距
- 提供特殊导出支持: 超清图像, 图像嵌入pdf, 无页边距导出

## Development Setup

### Prerequisites
- Python 3.9+
- Node.js 16+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements-dev.txt
cp .env.example .env
# Edit .env with your configuration
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Docker Development
```bash
docker-compose up -d
```

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## Production Deployment
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## API Documentation
Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Technology Stack
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, Alembic, Pytest
- **Frontend**: React, React Router, Axios, Jest, React Testing Library
- **DevOps**: Docker, Docker Compose
- **AI/ML**: OpenAI API, LangChain (for LLM integration)