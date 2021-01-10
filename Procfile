web: gunicorn covid.wsgi --log-file -
web: python manage.py collectstatic --no-input; gunicorn covid.wsgi --log-file - --log-level debug