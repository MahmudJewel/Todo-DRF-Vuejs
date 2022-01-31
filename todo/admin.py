from django.contrib import admin
from todo import models
# Register your models here.

lst = [models.Task]
admin.site.register(lst)