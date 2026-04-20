# FairLens — AI Bias Detection & Mitigation Platform

<p align="center">
  <strong>No-code, conversation-first AI fairness auditing for the Global South</strong>
</p>

<p align="center">
  Google Solution Challenge 2026 · Team MINDBOT
</p>

---

## 🎯 What is FairLens?

FairLens is a no-code AI bias detection and mitigation platform designed for non-technical users — HR managers, compliance officers, hospital admins, and government analysts. Upload your CSV dataset or ML model, and FairLens will:

- **Detect** hidden discrimination using 8 fairness metrics
- **Explain** findings in plain language via a Gemini-powered AI agent
- **Simulate** adversarial scenarios to stress-test your model
- **Fix** bias with one-click mitigation techniques
- **Certify** compliance with EU AI Act and India DPDP Act

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- Redis (or use Docker)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend (Docker)
```bash
cp .env.example .env
docker-compose up
```

### Backend (Local)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🏗️ Architecture

```
Frontend (React + Vite) → FastAPI → Celery + Redis
                                  → Gemini 1.5 Pro (Vertex AI)
                                  → AIF360 Bias Engine
                                  → Firestore / GCS / BigQuery
```

## 📊 8 Fairness Metrics

| Metric | Threshold | Description |
|--------|-----------|-------------|
| Disparate Impact Ratio | < 0.8 or > 1.25 | Selection rate ratio between groups |
| Demographic Parity | > 0.1 | Difference in positive outcome rates |
| Equalized Odds | > 0.1 | TPR/FPR difference across groups |
| Individual Fairness | < 0.85 | Similar treatment for similar individuals |
| Proxy Detection | > 0.7 | Feature correlation with protected attributes |
| Calibration Difference | > 5% | Prediction confidence gap per group |
| Counterfactual Fairness | Any change | Outcome change on attribute flip |
| Representation Score | < 5% | Minimum group representation |

## 🇮🇳 Global South Context

Built-in support for Indian demographics:
- **Caste**: SC / ST / OBC / General / EWS
- **States**: All 28 states + 8 UTs
- **Languages**: 22 scheduled languages
- **Locality**: Urban / peri-urban / rural
- **Name Database**: 500+ South Asian names with demographic probability distributions

## 📜 Dual Compliance

- **EU AI Act**: Articles 9, 10, 13, 15
- **India DPDP Act 2023**: Sections 4, 5, 8
- **NYC LL144**: Local Law 144
- **India AI Policy 2024**

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, TypeScript, TailwindCSS, Framer Motion, D3.js, Recharts |
| Backend | Python 3.11, FastAPI, Celery, Redis |
| AI/ML | Gemini 1.5 Pro (Vertex AI), LangChain, AIF360, LIME, SHAP, SDV |
| Database | Firestore, Cloud Storage, BigQuery |
| Infra | Cloud Run, Vercel, Docker, GitHub Actions |

## 📄 License

Built for Google Solution Challenge 2026. MIT License.

---

<p align="center">Made with ❤️ by Team MINDBOT</p>
