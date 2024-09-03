# from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response

from .utils.vector_db import embed_doc
from .utils.inference import chat

class EmbedDocs(views.APIView):

    def post(self, request, format=None):

        try:
            file = request.FILES['file']
            print(type(file))
            embed_doc(file)

            return Response({
                'success': True
            })
        except Exception as e:
            print(e)
            return Response({
                'success': False
            })
        
    
class Chat(views.APIView):

    def post(self, request, format=None):
        try:
            messages = request.data['messages']
            model = request.data['model']
            stream = request.data['stream']
            print(messages)
            query = messages[0]['content']
            print(query)
            response = chat(query, model, stream)
            return Response({
                'response': response,
                'success': True
            })
        except Exception as e:
            print(e)
            return Response({
                'success': False
            })