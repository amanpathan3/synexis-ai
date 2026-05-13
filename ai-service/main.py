from fastapi import FastAPI
from pydantic import BaseModel
from PyPDF2 import PdfReader
import spacy

app = FastAPI()
nlp = spacy.load("en_core_web_sm")

class ResumeRequest(BaseModel):
    file_path: str

@app.post("/parse-resume")
def parse_resume(data: ResumeRequest):
    try:
        reader = PdfReader(data.file_path)
        text = ""

        for page in reader.pages:
            text += page.extract_text()

        doc = nlp(text)

        skills_db = [
            "python", "java", "javascript",
            "react", "node", "mongodb", "sql"
        ]

        extracted_skills = []

        for token in doc:
            if token.text.lower() in skills_db:
                extracted_skills.append(token.text.lower())

        return {
            "skills": list(set(extracted_skills)),
            "text_length": len(text)
        }

    except Exception as e:
        return {"error": str(e)}