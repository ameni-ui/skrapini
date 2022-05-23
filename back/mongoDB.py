from pymongo import MongoClient

# fct db connect
def mongoDb(collection):

    client = MongoClient()  #open mongosh
    db = client['Ecommerce']    #use ecommerce
    return db[collection]   #use.collection.product

