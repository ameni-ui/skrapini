class Product:
    def __init__(self, id ,imgUrl, name, desc, category, price):
        self.id = id
        self.imgUrl = imgUrl
        self.name = name
        self.desc = desc
        self.category = category
        self.price = price
        # methode de type d'objet

    def __str__(self):
        return "id: {0}, category: {1},name: {2}, desc: {3}, imgUrl: {4}".format(self.id, self.name, self.desc,
                                                                                 self.desc, self.imgUrl)

