# Homecademy Front

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16.2.0-black?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/npm-compatible-CB3837?logo=npm&logoColor=white" alt="npm" />
</p>

홈카데미 프론트엔드 프로젝트입니다.  
이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 기반으로 구성되어 있으며,  
일관된 구조와 유지보수성을 위해 커밋 규약과 디렉토리 규칙을 함께 관리합니다.

---

## 프로젝트 개요

- **Framework**: Next.js 16
- **UI**: React 19
- **Language**: TypeScript
- **Package Manager**: npm
- **Architecture**: Feature-Sliced Design (FSD)

---

## 커밋 규약

커밋 메시지는 아래 타입을 사용합니다.

| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `build` | 빌드 관련 파일 수정, 모듈 설치/삭제 |
| `chore` | 기타 자잘한 작업 |
| `ci` | CI 설정 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 스타일/포맷 수정 |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 코드 수정 |
| `perf` | 성능 개선 |

### 예시

#13 feat: 회원가입 폼 추가 <br> #15 fix: 로그인 버튼 오류 수정 <br> #16 docs: README 문서 정리 <br> #18 refactor: 공통 유틸 구조 개선

---

## 아키텍처

이 프로젝트는 **Feature-Sliced Design (FSD)** 원칙을 따릅니다.  
계층별 책임을 분리해 기능 확장과 유지보수를 쉽게 만드는 것을 목표로 합니다.

### 계층 구조

의존성은 항상 **상위 계층 → 하위 계층** 방향으로만 허용됩니다.

- `app` → `widgets`, `features`, `entities`, `shared`
- `widgets` → `features`, `entities`, `shared`
- `features` → `entities`, `shared`
- `entities` → `shared`
- `shared` → 다른 계층에 의존하지 않음

### 의존성 원칙

- 상위 계층은 하위 계층을 import 할 수 있습니다.
- 하위 계층은 상위 계층을 import 할 수 없습니다.
- 같은 계층의 다른 슬라이스를 직접 import 하지 않습니다.
- 여러 기능의 조합이 필요하면 `widgets`에서 조립합니다.
- 공통 로직은 `shared`로 이동합니다.

---

## 디렉토리 구조

text src/ ├── app/ ├── widgets/ ├── features/ ├── entities/ └── shared/

---

## 디렉토리 설명

### `app`
애플리케이션의 진입점입니다.  
전역 설정, 라우팅, 페이지 구성, 프로바이더 연결 등을 담당합니다.

### `widgets`
여러 기능과 엔티티를 조합한 화면 단위 블록입니다.  
헤더, 푸터, 메인 섹션처럼 페이지를 구성하는 큰 단위에 사용합니다.

### `features`
사용자 행동 단위의 기능을 담습니다.  
예: 로그인, 검색, 필터, 좋아요 등

### `entities`
비즈니스 도메인의 핵심 데이터와 로직을 관리합니다.  
예: 사용자, 게시글, 주문 등

### `shared`
프로젝트 전반에서 재사용되는 공통 자원입니다.  
UI 컴포넌트, 유틸리티, 설정, 상수 등이 포함됩니다.

---
