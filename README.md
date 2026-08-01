Medical Report Analyzer — AI-Powered Clinical Intelligence Platform
Team ID: CX012 Team Name: Iveri

Team Members
Nishant Datta – Full Stack & Clinical Intelligence Engineer
Ishwari Bhoyar – Frontend & UI/UX Developer
Gunjan Nandeshwar – Backend & Database Engineer
Nazish Khan – AI & RAG Pipeline Engineer

Problem Statement
Medical diagnostic lab reports contain complex, unstructured laboratory data with technical jargon, inconsistent reference ranges, and varying units that are difficult for patients and healthcare providers to interpret quickly. HealthLens AI solves this by providing automated multi-page OCR document extraction, hardened multi-layer physiological validation, deterministic clinical intelligence scoring across 5 organ systems, and a report-scoped GPT-5 Nano RAG assistant for transparent, evidence-based medical report interpretation.

Tech Stack
Frontend: React (Vite)
Backend: FastAPI (Python)
Database: SQLite
Other: OpenAI GPT-5 Nano, PyMuPDF / Tesseract OCR, Pytest, Tailwind CSS

Features
Automated Multi-Format OCR & Phase 4 Deterministic Medical Parsing (CBC, Lipid, Renal, Liver, Thyroid, HbA1c, Metabolic panels)
Phase 5 Hardened Validation Engine & Phase 6 Clinical Intelligence (Organ Scores, Risk Assessment, Interactive Knowledge Graph, Historical Trends)
Phase 7 GPT-5 Nano Medical Assistant & 5-Layer Guardrails with Report-Scoped Chat Sessions and SHA-256 Audit Hashing

Installation
Frontend
cd frontend
npm install
Backend
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

How to Run
Frontend
cd frontend
npm run dev
Backend
cd backend
uvicorn src.app.main:app --reload

This README is a shared template for all CODEX Hackfest 2026 teams. Fill in the bracketed placeholders above with your project's real details.
