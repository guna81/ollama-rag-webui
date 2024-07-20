# from huggingface.inference import inference
from llm_rag.vector_db import save_data_to_db
from llm_rag.inference import inference

from utils.file_hanlders import get_temp_file_path

def load_documents(files):
    files = get_temp_file_path(files)
    print(files, 'files')
    save_data_to_db(files)


def chat(question):
    print('quection', question)
    responses = inference(question)
    print('response', responses)
    return responses
