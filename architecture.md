아키텍처 (FSD)
이 프로젝트는 Feature-Sliced Design (FSD) 방법론을 채택하여 유지보수성과 확장성을 극대화했습니다.
1. 계층 (Layers) 구조
   소스 코드는 역할에 따라 5개의 계층으로 나뉩니다. 위쪽 계층은 아래쪽 계층만 의존할 수 있습니다.
   graph TD;
   app[App Layer] --> widgets[Widgets Layer];
   app --> features[Features Layer];
   app --> entities[Entities Layer];
   app --> shared[Shared Layer];

   widgets --> features;
   widgets --> entities;
   widgets --> shared;

   features --> entities;
   features --> shared;

   entities --> shared;

   shared;

📂 app (최상위)
역할: 앱의 진입점. 전역 설정, 라우팅, 페이지 컴포넌트가 위치합니다.
포함 내용: layout.tsx, page.tsx, global.css, providers.tsx
특징: 여기서만 다른 모든 계층(widgets, features 등)을 불러와서 조립합니다. 비즈니스 로직을 직접 포함하지 않습니다.
📂 widgets (복합 기능)
역할: 독립적인 기능을 수행하는 완성된 UI 덩어리입니다. 페이지를 구성하는 큰 블록이라고 보면 됩니다.
예시: Header, Sidebar, PostList (게시물 목록 + 필터 + 페이지네이션이 결합된 형태)
특징: 여러 feature와 entity를 조합하여 만듭니다.
📂 features (단일 기능)
역할: 사용자 시나리오(User Story)에 대응하는 구체적인 기능입니다. "무엇을 한다"에 초점이 맞춰져 있습니다.
예시: LoginButton (로그인한다), ArticleRating (별점을 매긴다), SearchForm (검색한다)
특징: 특정 entity를 조작하거나 비즈니스 로직을 수행합니다.
📂 entities (비즈니스 개체)
역할: 비즈니스 로직의 핵심 데이터 모델입니다. "서비스가 다루는 데이터 그 자체"입니다.
예시: User (사용자 정보), Article (게시글 데이터), Order (주문 내역)
구성:
model/: 데이터 스키마(Zod), 타입 정의
api/: 백엔드 통신 로직
ui/: 해당 데이터만을 보여주는 순수 UI (e.g. UserCard)
📂 shared (공유 자원)
역할: 프로젝트 전반에서 재사용되는 범용 코드입니다. 비즈니스 로직이 전혀 없어야 합니다.
예시: Button, Input (UI 라이브러리), axios 설정, 날짜 포맷팅 함수
규칙: 이 계층은 다른 어떤 계층도 의존해선 안 됩니다. (No Dependency)

2. 의존성 규칙 (Dependency Rule)
   FSD의 핵심은 **"단방향 의존성"**입니다.
   상위 계층은 하위 계층을 import 할 수 있습니다.
   (O) features/auth/login-form.tsx가 shared/ui/button.tsx를 import
   하위 계층은 상위 계층을 import 할 수 없습니다.
   (X) entities/user/user-card.tsx가 features/auth/login-form.tsx를 import
   같은 계층의 다른 슬라이스(Slice)는 서로 import 할 수 없습니다.
   (X) features/cart가 features/checkout을 import
   해결책: 두 기능이 소통해야 한다면 widgets 계층으로 올려서 조립하거나, 공통 로직을 shared로 내려야 합니다.

3. 폴더 구조 예시
   src/
   ├── app/
   │   ├── (home)/page.tsx      # 홈 페이지
   │   └── layout.tsx           # 루트 레이아웃
   ├── widgets/
   │   └── gnb/                 # 상단 네비게이션 바
   │       ├── index.ts         # 외부 공개용 (Public API)
   │       └── ui/header.tsx    # 내부 구현
   ├── features/
   │   └── auth/                # 로그인/회원가입 기능
   │       ├── api/login.ts     # 로그인 API
   │       └── ui/login-form.tsx
   ├── entities/
   │   └── user/                # 사용자 모델
   │       ├── model/types.ts   # User 타입
   │       └── ui/avatar.tsx    # 프로필 이미지 컴포넌트
   └── shared/
   ├── ui/                  # Shadcn UI (Button, Input...)
   └── lib/                 # 유틸리티 (date, format...)

이 규칙을 지키면 스파게티 코드를 방지하고, 특정 기능을 수정했을 때 영향 범위를 명확히 파악할 수 있습니다.