from flask import Flask
from flask import jsonify, request, Response
from mongoDB import mongoDb
from bson.json_util import dumps
from scraper import MytekScrapper, SpacenetScrapper


webservice = Flask(__name__)

@webservice.route("/", methods=['GET'])
def starting():
    return("Webservice is running")


@webservice.route("/api/product", methods=['GET'])

def getAll():
    collection = mongoDb('product')
    products = collection.find()
    print(type(products))
    list_products = list(products)
    print(type(list_products))
    return Response(dumps(list_products),  mimetype='application/json')


@webservice.route('/api/product/<string:id>', methods=['GET'])
def getproductsById(id):
    collection = mongoDb('product')
    product = collection.find({
        "id": id
    })
    product = list(product)[0]
    return Response(dumps(product),  mimetype='application/json')


@webservice.route("/api/product", methods=['POST'])
def insertProduct():
    product_data = request.get_json()
    collection = mongoDb('product')
    collection.insert_one(product_data)
    return jsonify("ok")


@webservice.route("/api/product/<string:id>", methods=['PUT'])
def updateProductsByID(id):
    product_data = request.get_json()
    collection = mongoDb('product')
    collection.update_one({"id": id}, {"$set": product_data})
    return jsonify("ok")


@webservice.route("/api/product/<string:id>", methods=['DELETE'])
def deleteProductsByID(id):
    collection = mongoDb('product')
    collection.delete_one({"id": id})
    return jsonify("ok")


@webservice.route("/api/product/scrap", methods=['POST'])
def scrapProducts():
    product_data = request.get_json()
    scrappedProductsArray = MytekScrapper(product_data['id'], product_data['name'])
    collection = mongoDb('scrapedProduct')
    try:
      collection.insert_many(scrappedProductsArray)
    except:
      print("No product Found!!!!!!!!!!!!!!!!!!!")

    scrappedProductsArray = SpacenetScrapper(product_data['id'], product_data['name'])
    try:
      collection.insert_many(scrappedProductsArray)
    except:
      print("No product Found!!!!!!!!!!!!!!!!!!!")


    return jsonify("ok")

@webservice.route('/api/product/scrap/<string:id>', methods=['GET'])
def getScrappedProductsById(id):
    collection = mongoDb('scrapedProduct')
    scrappedProducts = collection.find({
        "id": id
    })
    scrappedProducts = list(scrappedProducts)
    return Response(dumps(scrappedProducts),  mimetype='application/json')


def startWebService():
    webservice.run()
