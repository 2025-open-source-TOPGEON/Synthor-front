
<img width="200" alt="Synthor Logo" src="https://github.com/user-attachments/assets/2564b321-0bf8-44a8-b53e-d3e599c64497" />

# Synthor — 자연어 기반 더미 데이터 생성 플랫폼

> 한 문장의 프롬프트로 스키마 없이 더미 데이터를 생성·미리보기·다운로드까지 끝내는 통합 시스템.  
> Frontend(React) – Backend(Spring Boot) – AI(FastAPI)가 **단일 데이터 계약**으로 느슨하게 결합됩니다.


---

## 1. 프로젝트 개요
**Synthor**는 개발자를 위한 **AI 기반 더미 데이터 생성 플랫폼**입니다.  
복잡한 조건이나 다양한 데이터 타입을 손쉽게 생성하고, 원하는 포맷(JSON, CSV, SQL 등)으로 변환해  
테스트 및 개발 효율성을 극대화합니다.  

본 프로젝트는 **2025 오픈소스 공모전 출품작**으로,  
Frontend · Backend · AI 모듈이 유기적으로 협력하는 통합 시스템입니다.


---

## 2. 프로젝트 소개
- **프로젝트 명**: Synthor  
- **출품 분야**: 2025 오픈소스 공모전  
- **구성**: Frontend · Backend · AI 모듈 통합  
- **슬로건**: *“테스트 데이터를 가장 스마트하게 생성하는 방법”*  

📸 **주요 화면**

- 자연어 프롬프트 인식 (한국어/영어)**: 문장에서 필드 타입과 제약 조건 자동 추출
  - **다중 포맷 지원**: JSON / CSV / SQL / HTML / XML / LDIF  
  - **50+ 데이터 타입 & 핵심 15종 정밀 파싱**: 비밀번호·이메일·전화번호·날짜·시간 등  
  - **단일 게이트웨이 아키텍처**: FE(React) → BE(Spring Boot) 호출, BE가 내부적으로 AI(FastAPI) 연동(WebFlux)  
  - **프리뷰 최적화**: 100행 제한으로 성능 확보, 실제 다운로드는 요청 수만큼 전량 제공  
<img width="100%" alt="image" src="https://github.com/user-attachments/assets/415bfe88-730e-4d7c-9346-29fde5bf7d5f" />

- 데이터 타입 선택 모달 (51종 데이터 타입 지원)  
  <img src="https://github.com/user-attachments/assets/ed48a2fa-1c3d-48fa-8c19-0bdb07cb2256" width="100%" alt="데이터 타입 선택 모달" />

- 데이터 타입 옵션 설정 (예: 비밀번호 조건)  
  <img src="https://github.com/user-attachments/assets/dd2a603d-14f4-47b7-9be9-d15465731c11" width="100%" alt="데이터 타입 옵션" />

---

## 3. 프로젝트 목표
- **자연어 기반 데이터 생성** → “비밀번호는 최소 10자 이상” 같은 문장으로 조건 인식  
- **다국어 지원** → 한국어 + 영어 모두 사용 가능  
- **테스트 효율성 극대화** → JSON, CSV, SQL 등 6가지 포맷으로 바로 다운로드  
- **누구나 쉽게 활용 가능한 오픈소스 플랫폼 제공**  

---

## 4. 주요 기능
- **데이터 타입 다양성**  
  9개 카테고리, 총 **51종 데이터 타입 지원**  
- **AI 조건 생성**  
  자연어 프롬프트로 조건 기반 데이터 생성 (*예: 김씨 성만, 네이버 메일만*)  
- **포맷 변환 (6종)**  
  JSON · CSV · SQL · HTML · XML · LDIF  
- **웹 UI 제공**  
  React 기반 직관적 인터페이스  
- **REST API 제공**  
  Swagger 기반 문서화 & 외부 연동  

---

### 🎯 개별 프롬프트 설정
> 이메일, 비밀번호, 나이, 날짜 등 **필드별 제약 조건을 자연어로 지정**  

📌 **조건 입력 화면**  
<img src="https://github.com/user-attachments/assets/e6e0ad9c-e4a3-4f11-9e39-1e6699ff5715" width="100%" alt="필드별 조건 입력" />

📌 **자동 생성된 데이터 (Preview)**  
<img src="https://github.com/user-attachments/assets/39ff73b8-1975-4ca9-8c2d-d25ce3e3c2d7" width="100%" alt="프리뷰 결과" />

📌 **동작 데모 (GIF)**  
<img src="https://github.com/user-attachments/assets/ef7d3be0-2f7b-493c-b2f9-95a3599098f4" width="100%" alt="개별 프롬프트 GIF" />

---

### 🎯 전체 프롬프트 시연
> 한 번의 입력으로 전체 데이터 조건을 자동 매핑  

📌 **입력 화면**  
<img src="https://github.com/user-attachments/assets/8037e043-093c-479b-a9ff-fd3162bfa972" width="100%" alt="전체 프롬프트 입력" />

📌 **자동 매핑 결과**  
<img src="https://github.com/user-attachments/assets/57477948-cba3-4e7d-9536-387fb1a71b44" width="100%" alt="자동 매핑된 필드" />


📌 **동작 데모 (GIF)**  
<img src="https://github.com/user-attachments/assets/b310379c-e117-4ff9-be89-f3b0c1887bb8" width="100%" alt="전체 프롬프트 GIF" />

---

### 🎯 실제 데이터 다운로드
> 생성된 데이터를 CSV, SQL 등 다양한 포맷으로 저장  

📌 **다운로드 결과 (예시)**  
<img src="https://github.com/user-attachments/assets/0519bb35-a42c-414c-a245-35cfe1dd5a70" width="100%" alt="데이터 다운로드" />

---

## 6. 기술 스택
- **Frontend**: React, Vite, TailwindCSS  
- **Backend**: Spring Boot, Swagger, MySQL  
- **AI**: Python (FastAPI, Pydantic, Langdetect)  
- **Infra**: Docker, Render, GitHub Actions, Cloudflare Pages  

📸 **시스템 아키텍처**  
<img  width="100%" alt="arch.image" src="https://github.com/user-attachments/assets/5a6f9896-b727-424a-84d2-eb0fc94327d4" />

- **Frontend**: React SPA, Cloudflare Pages에 배포  
- **Backend**: Spring Boot Gateway, 포맷별 스트리밍 응답, AI 서버 호출(WebFlux)  
- **AI**: FastAPI 기반 추출기 레지스트리, 한국어/영어 모두 지원  
- **Infra**: Docker 기반 컨테이너, Render + Cloudflare Pages 자동 배포

---

## 기술 스택

- **Frontend**: Vite + React, React Router, Tailwind CSS, @dnd-kit, Axios  
- **Backend**: Spring Boot 3, Gradle, Spring Web, Validation, Spring Data JPA, DataFaker, springdoc-openapi(Swagger UI)  
- **AI**: Python 3.11, FastAPI, Uvicorn, Pydantic, langdetect, Swagger(OpenAPI)  
- **Infra/DevOps**: Docker, Render, Cloudflare Pages  

---

## 데이터 계약 (Data Contract)

### 1) 요청 구조

```json
DataGenerationRequest {
  count: number,          // 생성할 데이터 개수
  fields: FieldRequest[]  // 생성할 필드들의 정의
}

FieldRequest {
  name: string,             // 필드명 (예: userEmail)
  type: string,             // 데이터 타입 (예: email_address, phone_number, password 등)
  value: object,            // 기본값 또는 예시 값
  prompt: string,           // 프런트엔드에서 입력한 개별 프롬프트
  parsedConstraints: { },   // AI가 prompt를 해석해 파싱한 제약 조건
  constraints: { },         // 사용자가 직접 지정하거나 수정한 제약 조건
  nullablePercent: number   // null 허용 비율 (0~100%)
}
```

**요청 예시**
```json
{
  "count": 100,
  "fields": [
    {
      "name": "userPassword",
      "type": "password",
      "prompt": "비밀번호는 10자 이상",
      "parsedConstraints": { "minLength": 10 },
      "constraints": { "minLength": 12, "upper": 1, "lower": 1, "numbers": 1, "symbols": 1 },
      "nullablePercent": 0
    },
    {
      "name": "userEmail",
      "type": "email_address",
      "prompt": "이메일 형식",
      "parsedConstraints": {},
      "constraints": {},
      "nullablePercent": 0
    }
  ]
}
```

**응답**  
요청 포맷(JSON/CSV/SQL/HTML/XML/LDIF)에 따라 **스트리밍 응답**으로 전송됩니다.

---

## API (Usage)

### 📌 공개 API (Backend)

- `POST /api/data/manual-generate`  
  → **수동 데이터 생성**  
  사용자가 `fields[]`를 직접 정의하여 데이터 생성  

- `POST /api/data/ai-generate`  
  → **AI 기반 자동 생성**  
  자연어 프롬프트를 전달하면 백엔드가 내부적으로 AI(FastAPI)를 호출하여  
  자동으로 `fields[]`를 생성하고 데이터를 반환  

---

### 📌 내부 AI API (Backend → AI, 비공개)

- `POST /api/fields/ai-suggest`  
  → 개별 필드 프롬프트에서 타입/제약 자동 추출  

- `POST /api/fields/auto-generate`  
  → 한 문단 프롬프트에서 전체 스키마(`fields[]`) 자동 생성  

> ⚠️ **내부 API는 프론트엔드에서 직접 호출하지 않음**.  
> 흐름: **Frontend → Backend(Spring Boot) → AI(FastAPI)**  

---

### 요청/응답 구조 요약

```json
DataGenerationRequest {
  count: number,
  fields: FieldRequest[]
}

FieldRequest {
  name: string,
  type: string,
  value: object,
  prompt: string,
  parsedConstraints: { },
  constraints: { },
  nullablePercent: number
}
```

---

### 1) 웹에서 사용하기
1. **프롬프트 입력**  
   - `기업 회원가입: 회사명, 직책, 이름, 이메일, 비밀번호, 전화번호`  
   - `비밀번호는 최소 10자, 대문자/소문자/숫자/특수문자 각 1개 이상`
2. **필드 자동 인식**: 타입/제약 자동 추출 (필요 시 직접 수정 가능)  
3. **행 수 지정**: 기본 50행, 프리뷰는 최대 100행 표시  
4. **포맷 선택**: `JSON / CSV / SQL / HTML / XML / LDIF`  
5. **생성 → 미리보기 → 다운로드**

---

### 2) 로컬 개발 환경 실행

#### Frontend
```bash
cd frontend
pnpm i
pnpm dev
# .env: VITE_API_BASE_URL=http://localhost:8080
```

#### Backend
```bash
cd backend
./gradlew bootRun
# ENV: SPRING_PROFILES_ACTIVE=local
```

#### AI (FastAPI)
```bash
cd ai
pip install -r requirements.txt
uvicorn app.main:app --reload --port 9000
```

---

### 3) Swagger 테스트
- **Backend Swagger UI**: `/swagger-ui` 에서 `POST /api/data/manual-generate`, `POST /api/data/ai-generate` 실행 가능  
- **AI Swagger UI**: 내부 확인용 (`/api/fields/ai-suggest`, `/api/fields/auto-generate`)  

---

## 기대 효과
- **개발자 생산성 향상**: 프롬프트 → 스키마 자동화로 데이터 설계 시간을 수초~수분 단축  
- **비개발자 접근성 확대**: 코드/엑셀 수작업 없이 데이터 세트 생성 가능  
- **활용 분야**: QA, 강의, 데모, 프로젝트 초기 데이터 준비  

---

## 로드맵
- `data/ai-generate` 고도화 (문맥 기반 보정, 중복 제거, 추천 템플릿)  
- 사용자 계정·히스토리, 팀 프리셋 공유  
- 대용량 스트리밍/시드 고정, 타입 라이브러리 확대  

---

## 라이선스
본 프로젝트는 [MIT License](../LICENSE) 하에 공개됩니다.

---

https://github.com/user-attachments/assets/0395d34d-2672-4fa8-a15e-fa4ecd992e8a
