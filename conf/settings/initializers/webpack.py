import os
from conf.settings.base import ENV, BASE_DIR

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not ENV('DEBUG'),
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(BASE_DIR, '../webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map']
    }
}