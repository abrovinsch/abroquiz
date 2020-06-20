import json

def get_questions(quiz_id, topic):
    results = []
    results.append({'q': 'peke', 'a': 'klyvarbom'})
    results.append({'q': 'kompass', 'a': 'nord'})

    return json.dumps(results)
