from bs4 import BeautifulSoup
from selenium import webdriver
import re
from Models.product import Product
from mongoDB import mongoDb


# Format sku and return string
def SkuFormatter(sku):
    sku = sku.replace("-", "")
    sku = sku.replace("/", "")

    return sku


# Format name and return string
def NameFormatter(name):
    name = re.sub('\(.*', '', name)
    return name


# Format price and return float
def PriceFormatter(price):
    price = price.replace("TND", "").replace(",", ".").replace(" ", "").replace(" ", "")
    price = float(price)
    return price


def MytekScrapper():
    # Open web browser
    driver = webdriver.Chrome('./chromedriver')
    # Open the link in the browser
    driver.get(
        'https://www.mytek.tn/telephonie-tunisie/smartphone-mobile-tunisie/iphone.html?product_list_dir=desc&product_list_limit=all')
    # Getting web page HTML code
    content = driver.page_source
    # Parse String to HTML
    soup = BeautifulSoup(content, "html.parser")
    # Fetching Elements from Parsed HTML with Filter

    # Array of element [{nom: iphone, prix: 1},{nom: iphone2, prix: 2}]
    productSkuArray = soup.findAll(attrs={'itemprop': 'sku'})
    productNameArray = soup.findAll(attrs={'class': 'product-item-link'})
    productDescArray = soup.findAll(attrs={'class': 'product description'})
    productImgArray = soup.findAll(attrs={'class': 'product-image-photo'})
    productPriceArray = soup.findAll(attrs={'data-price-type': 'finalPrice'})
    # Creating an  empty array
    results = []

    # Loop in 3 arrays
    for elementSku, elementName, elementDesc, elementImg, elementPrice in zip(productSkuArray, productNameArray,
                                                                              productDescArray, productImgArray,
                                                                              productPriceArray):
        sku = SkuFormatter(elementSku.text)
        name = NameFormatter(elementName.text)
        desc = elementDesc.text
        img = elementImg['src']
        priceMytek = PriceFormatter(elementPrice.text)

        product = Product(sku, name, desc, img, priceMytek, '', priceMytek - 100)

        results.append(product)

    return results


def SpacenetScrapper():
    # Open web browser
    driver = webdriver.Chrome('./chromedriver')
    # Open the link in the browser
    driver.get('https://spacenet.tn/categorie/13-smartphone-mobile-tunisie?cat%C3%A9gories=iphone&page=2')
    # Getting web page HTML code
    content = driver.page_source
    # Parse String to HTML
    soup = BeautifulSoup(content, "html.parser")
    # Fetching Elements from Parsed HTML with Filter
    # Array d'object [{nom: iphone, prix: 1},{nom: iphone2, prix: 2}]
    productSkuArray = soup.findAll(attrs={'class': 'product-reference'})
    productPriceArray = soup.findAll(name={'span'}, attrs={'class': 'price'})
    # Creating an  empty Dictionaries

    results = {}
    # Loop in  elements
    for elementSku, elementPrice in zip(productSkuArray, productPriceArray):
        sku = SkuFormatter(elementSku.span.text)
        priceSpacenet = PriceFormatter(elementPrice.text)
        results[sku] = priceSpacenet
    return results


def FinalProducts(SpacenetPrices, MytekProducts):
    for sku in SpacenetPrices:
        for product in MytekProducts:
            if product.sku == sku:
                product.priceSpacenet = SpacenetPrices[sku]

    ProductsFinal = []
    for product in MytekProducts:
        if (product.priceSpacenet):
            ProductsFinal.append(product.__dict__)

    return ProductsFinal


def startScrapper():
    # Return array of Object Proudct
    MytekProducts = MytekScrapper()

    # Return Dictionaires {sku,priceSpacenet}
    SpacenetPrices = SpacenetScrapper()

    # Add Spacenet prices to Mytek products and  deleting products without prices
    ProductsFinal = FinalProducts(SpacenetPrices, MytekProducts)

    # print("Number of products Scraped: " + str(len(ProductsFinal)) + " products")

    collection = mongoDb('product')

    collection.insert_many(ProductsFinal)
