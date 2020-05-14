from conf.settings.base import ENV

from conf.settings.initializers.database import *
from conf.settings.initializers.webpack import *

PROJECT_NAME = 'Hello World'
SECRET_KEY = ENV('SECRET_KEY')

EXTERNAL_APPS = [
    'webpack_loader',
]

PROJECT_APPS = [
    'apps.web'
]
