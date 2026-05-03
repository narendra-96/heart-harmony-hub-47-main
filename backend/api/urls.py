from .views import get_messages, send_message, get_conversations, set_typing, get_typing

urlpatterns = [
    path('messages/', get_messages),
    path('send/', send_message),
    path('conversations/', get_conversations),

    # 🔥 typing
    path('typing/set/', set_typing),
    path('typing/get/', get_typing),
]