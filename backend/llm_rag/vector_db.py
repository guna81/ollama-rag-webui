from langchain_community.document_loaders import UnstructuredPDFLoader

from langchain_community.embeddings import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

embeddings = OllamaEmbeddings(model="nomic-embed-text",show_progress=True)

def save_data_to_db(files):
  # print(files, 'files')
  # files = "docs/WEF_The_Global_Cooperation_Barometer_2024.pdf"
  # Local PDF file uploads
  loader = UnstructuredPDFLoader(files)
  data = loader.load()

  # Preview first page
  # print(data[0].page_content)
  
  # Split and chunk 
  text_splitter = RecursiveCharacterTextSplitter(chunk_size=7500, chunk_overlap=100)
  chunks = text_splitter.split_documents(data)

  # Add to vector database
  vector_db = Chroma.from_documents(
      documents=chunks, 
      embedding=embeddings,
      collection_name="local-rag"
  )

  vector_db.persist()


def load_vector_db():
  vector_db = Chroma(collection_name="local-rag", embedding_function=embeddings)
  print('vector_db', vector_db.get())
  return vector_db


def delete_collection(vector_db):
  # Delete all collections in the db
  vector_db.delete_collection()