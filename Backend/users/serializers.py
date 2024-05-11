from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
User = get_user_model()


class LoginSerialiazer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # mục đích của việc này là không cho password bị phơi ra
        ret.pop('password', None)
        return ret


class RegisterSerialiazer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        # mục đích của việc này là không cho password bị phơi ra
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
