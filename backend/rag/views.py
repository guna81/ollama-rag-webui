# from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from .utils.vector_db import embed_doc
from .utils.inference import chat

class EmbedDocs(views.APIView):

    def post(self, request, format=None):

        try:
            file = request.FILES['file']
            embed_doc(file)

            return Response({
                'success': True
            })
        except Exception as e:
            print(e)
            return Response({
                'success': False
            }, status=HTTP_400_BAD_REQUEST)
        
    
class Chat(views.APIView):

    def post(self, request, format=None):
        try:
            messages = request.data['messages']
            model = request.data['model']
            stream = request.data['stream']
            query = messages[0]['content']
            
            response = chat(query, model, stream)
            return Response({
                'response': response,
                'success': True
            })
        except Exception as e:
            print(e)
            return Response({
                'success': False
            }, status=HTTP_400_BAD_REQUEST)