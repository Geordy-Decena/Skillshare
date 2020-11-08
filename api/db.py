class user:
    learn = []
    teach = []
    skillLearnCount = 0
    skillTeachCount = 0

    def __init__(self, email, password):
        self.email = email
        self.password = password


activeIndex = 0
userCount = 0
userList = []
