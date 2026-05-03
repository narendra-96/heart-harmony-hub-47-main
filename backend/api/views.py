from .models import Message, TypingStatus  # make sure TypingStatus is imported


@api_view(['POST'])
def set_typing(request):
    user_id = request.data.get('user_id')
    typing = request.data.get('typing')

    if not user_id:
        return Response({"error": "user_id required"}, status=400)

    obj, _ = TypingStatus.objects.get_or_create(user_id=str(user_id))
    obj.typing = bool(typing)
    obj.save()

    return Response({"status": "ok"})


@api_view(['GET'])
def get_typing(request):
    user_id = request.GET.get('user')

    if not user_id:
        return Response({"typing": False})

    try:
        obj = TypingStatus.objects.get(user_id=str(user_id))
        return Response({"typing": obj.typing})
    except TypingStatus.DoesNotExist:
        return Response({"typing": False})