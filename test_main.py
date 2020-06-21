# Main test for Python
# For flask testing, see
# https://realpython.com/python-testing/#testing-for-web-frameworks-like-django-and-flask

import unittest
import flask_app


class TestAPI(unittest.TestCase):

    def setUp(self):
        flask_app.app.testing = True
        self.app = flask_app.app.test_client()

    def test_gq(self):
        result = self.app.get("/questions/0/marin")
        self.assertEqual(result._status_code, 200)


def run_all():
    unittest.main()


if __name__ == "__main__":
    run_all()
