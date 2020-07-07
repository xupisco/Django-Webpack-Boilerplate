import os
from conf.settings.base import ENV

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': ENV.db()
}
