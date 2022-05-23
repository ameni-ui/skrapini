from bs4 import BeautifulSoup
from selenium import webdriver
import re
from Models.product import Product
from datetime import date

class ScrapedProduct:
    def __init__(self, id, name ,url, imgUrl, shop, price, date):
        self.id = id
        self.name = name
        self.url = url
        self.imgUrl = imgUrl
        self.shop = shop
        self.price = price
        self.date = date
        # methode de type d'objet

from mongoDB import mongoDb


# Format price and return float
def PriceFormatter(price):
    price = price.replace("TND", "").replace(",", ".").replace(" ", "").replace(" ", "")
    price = float(price)
    return price


def MytekScrapper(id, name):
    print("myTek")
    # Open web browser
    driver = webdriver.Chrome('./chromedriver')
    # Open the link in the browser
    driver.get('https://www.mytek.tn/telephonie-tunisie/smartphone-mobile-tunisie/iphone.html?product_list_dir=desc&product_list_limit=all')
    # Getting web page HTML code
    content = driver.page_source
    # Parse String to HTML
    soup = BeautifulSoup(content, "html.parser")
    # Fetching Elements from Parsed HTML with Filter

    # Array of element [{nom: iphone, prix: 1},{nom: iphone2, prix: 2}]
    productNameArray = soup.findAll(attrs={'class': 'product-item-link'})
    productPriceArray = soup.findAll(attrs={'data-price-type': 'finalPrice'})
    productUrlArray = soup.findAll(attrs={'class': 'product photo product-item-photo'})
    productImgArray = soup.findAll(attrs={'class': 'product-image-photo'})

    print(len(productNameArray))
    print(len(productPriceArray))
    print(len(productUrlArray))
    print(len(productImgArray))

    # Creating an  empty array
    results = []

    # Loop in 3 arrays
    for elementName, elementUrl, elementImg, elementPrice in zip(productNameArray, productUrlArray, productImgArray, productPriceArray):
        scrapedName = elementName.text
        scrapedUrl = elementUrl['href']
        scrapedImg = elementImg['src']
        scrapedprice = PriceFormatter(elementPrice.text)
        print("Scraping : "+name + "  Name found : " + scrapedName)
        if (re.search(name.lower(), scrapedName.lower()) != None):
            print ("MATCHED")
            scrapedProduct = ScrapedProduct(id, scrapedName, scrapedUrl, scrapedImg, 'Mytek', scrapedprice, str(date.today()))
            results.append(scrapedProduct.__dict__)

    return results

def SpacenetScrapper(id, name):
  # Creating an  empty array
  results = []

  for page in range(1, 3, 1):
    print("spacenet page : " + str(page))
    # Open web browser
    driver = webdriver.Chrome('./chromedriver')
    # Open the link in the browser
    if (page == 1):
      driver.get('https://spacenet.tn/categorie/13-smartphone-mobile-tunisie?cat%C3%A9gories=iphone')
    else :
      driver.get('https://spacenet.tn/categorie/13-smartphone-mobile-tunisie?cat%C3%A9gories=iphone&page='+ str(page))
    # Getting web page HTML code
    content = driver.page_source
    # Parse String to HTML
    soup = BeautifulSoup(content, "html.parser")
    # Fetching Elements from Parsed HTML with Filter

    # Array of element [{nom: iphone, prix: 1},{nom: iphone2, prix: 2}]
    productNameArray = soup.findAll(attrs={'class': 'product_name'})
    productPriceArray = soup.findAll(name={'span'}, attrs={'class': 'price'})
    productUrlArray = soup.findAll(attrs={'class': 'thumbnail product-thumbnail'})
    productImgArray = soup.findAll(attrs={'class': 'cover_image'})

      #print(len(productNameArray))
      #print(len(productPriceArray))
      #print(len(productUrlArray))
      #print(len(productImgArray))

    # Loop in 3 arrays
    for elementName, elementUrl, elementImg, elementPrice in zip(productNameArray, productUrlArray, productImgArray,productPriceArray):
      scrapedName = elementName.text
      scrapedUrl = elementUrl['href']
      scrapedImg = elementImg.img['src']
      scrapedprice = PriceFormatter(elementPrice.text)
      print("Scraping : "+name + "  Name found : " + scrapedName)
      if (re.search(name.lower(), scrapedName.lower()) != None):
        scrapedProduct = ScrapedProduct(id, scrapedName, scrapedUrl, scrapedImg, 'Spacenet', scrapedprice,str(date.today()))
        print("MATCHED")
        results.append(scrapedProduct.__dict__)

  return results



