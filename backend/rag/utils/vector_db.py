import os

from langchain_community.document_loaders import UnstructuredPDFLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

from .files import allowed_file, get_temp_file_path


CHROMA_PATH = os.getenv('CHROMA_PATH', 'chroma')
COLLECTION_NAME = os.getenv('COLLECTION_NAME', 'local-rag')
TEXT_EMBEDDING_MODEL = os.getenv('TEXT_EMBEDDING_MODEL', 'nomic-embed-text')

# Initialize the embedding model and text splitter
embedding = OllamaEmbeddings(model=TEXT_EMBEDDING_MODEL,show_progress=True)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=7500, chunk_overlap=100)

def get_vector_db():

    db = Chroma(
        collection_name=COLLECTION_NAME,
        persist_directory=CHROMA_PATH,
        embedding_function=embedding
    )

    return db

# Function to load and split the data from the PDF file
def load_and_split_data(file_path):
    # Load the PDF file and split the data into chunks
    loader = UnstructuredPDFLoader(file_path=file_path)
    data = loader.load()
    chunks = text_splitter.split_documents(data)

    return chunks

# Main function to handle the embedding process
def embed_doc(file):
    # Check if the file is valid, save it, load and split the data, add to the database, and remove the temporary file
    if file.name != '' and file and allowed_file(file.name):
        file_path = get_temp_file_path(file)
        chunks = load_and_split_data(file_path)
        db = get_vector_db()
        db.add_documents(chunks)
        db.persist()

        return True

    return False


def delete_collection():
    db = get_vector_db()
    db.delete_collection()
