from akron import Akron
from akron.models import ModelMixin
from pydantic import BaseModel

class User(BaseModel, ModelMixin):
    id: int
    name: str
    age: int

db = Akron('sqlite:///:memory:')
User.create_table(db)
print('Basic functionality test passed!')
