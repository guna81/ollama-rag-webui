import json
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_models import ChatOllama
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma

# Singleton pattern for embeddings and vector_db
class Singleton:
    _instances = {}

    @staticmethod
    def get_instance(class_, *args, **kwargs):
        if class_ not in Singleton._instances:
            Singleton._instances[class_] = class_(*args, **kwargs)
        return Singleton._instances[class_]

# Initialize LLM and embedding once
local_model = "llama3:latest"
llm = ChatOllama(model=local_model)

embeddings = Singleton.get_instance(OllamaEmbeddings, model="nomic-embed-text", show_progress=True)
vector_db = Singleton.get_instance(Chroma, collection_name="local-rag", embedding_function=embeddings)

QUERY_PROMPT = PromptTemplate(
    input_variables=["question"],
    template="""You are an AI language model assistant. Your task is to generate five
    different versions of the given user question to retrieve relevant documents from
    a vector database. By generating multiple perspectives on the user question, your
    goal is to help the user overcome some of the limitations of the distance-based
    similarity search. Provide these alternative questions separated by newlines.
    Original question: {question}""",
)

def inference(question):
    # RAG retriever
    retriever = MultiQueryRetriever.from_llm(
        vector_db.as_retriever(),
        llm,
        prompt=QUERY_PROMPT
    )

    # RAG prompt
    template = """Answer the question based ONLY on the following context:
    {context}
    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)

    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    def stream_response(question):
        for chunk in chain.stream(question):
            chunk = {
                "content": chunk
            }
            yield json.dumps(chunk) + "\n"

    return stream_response(question)
