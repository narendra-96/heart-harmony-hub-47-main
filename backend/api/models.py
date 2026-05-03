from django.db import models

class Message(models.Model):
    sender_id = models.CharField(max_length=100)
    receiver_id = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)  # ✅ ADD THIS
    
    
class TypingStatus(models.Model):
    user_id = models.CharField(max_length=100, unique=True)
    typing = models.BooleanField(default=False)